import { apiHandler } from '@/db/handler';
import { nanoid } from 'nanoid';
import { supabase } from '@/lib/supabase';
import { decode } from 'base64-arraybuffer';

export default apiHandler({
  endpoints: {
    POST: async (req, res) => {
      let image = req.body;
      if (!image) {
        return res.status(500).json({ message: 'No image provided' });
      }
    
      try {
        const contentType = image.match(/data:(.*);base64/)?.[1];
        const base64FileData = image.split('base64,')?.[1];
    
        if (!contentType || !base64FileData) {
          return res.status(500).json({ message: 'Image data not valid' });
        }

        // Upload image
        const fileName = nanoid();
        const ext = contentType.split('/')[1];
        const path = `${fileName}.${ext}`;

        const { data, error: uploadError } = await supabase.storage
          .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET)
          .upload(path, decode(base64FileData), {
            contentType,
            upsert: true,
          });
        

        if (uploadError) {
          console.log(uploadError);
          throw new Error('Unable to upload image to storage');
        }
    
        // Construct public URL
        const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/uniteam/${data.path}`;

        return res.status(200).json({ url });
      } catch (e) {
        res.status(500).json({ message: 'Something went wrong' });
      }


    },
  },
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};