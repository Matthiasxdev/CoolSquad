import { useState, useRef } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import styles from './imageupload.module.css';
import UploadIcon from '../svg/upload';
// import classNames from 'classnames';
// import { ArrowUpIcon } from '@heroicons/react/outline';


type ImageUploadProps = {
    label?: String,
    initialImage: {
        src: string,
        alt: string
    } | null,
    accept?: string,
    sizeLimit?: number,
    onChangePicture: (image: any) => Promise<void>
}



export default function ImageUpload ({
  label= "Image",
  accept = '.png, .jpg, .jpeg, .gif',
  sizeLimit = 10 * 1024 * 1024, // 10MB,
  initialImage={src:"", alt:""},
  onChangePicture
}: ImageUploadProps) {
  const pictureRef = useRef<HTMLInputElement>(null);
  const [updatingPicture, setUpdatingPicture] = useState(false);
  const [image, setImage] = useState(initialImage);  
  const [pictureError, setPictureError] = useState("");

  

  const handleOnChangePicture = async (event: React.ChangeEvent<HTMLInputElement> ) => { 
    
    if(!event.target.files){return}
    const file = event.target.files[0];
    const reader = new FileReader();

    const fileName = file?.name?.split('.')?.[0] ?? 'New file';

    reader.addEventListener(
      'load',
      async function () {
        try {
          setImage({ src: reader.result as string, alt: fileName });
          if (typeof onChangePicture === 'function') {
            await onChangePicture(reader.result);
          }
        } catch (err) {
          toast.error('Unable to update image');
        } finally {
          setUpdatingPicture(false);
        }
      },
      false
    );

    if (file) {
      if (file.size <= sizeLimit) {
        setUpdatingPicture(true);
        setPictureError('');
        reader.readAsDataURL(file);
      } else {
        setPictureError('File size is exceeding 10MB.');
      }
  };
}

  const handleOnClickPicture = () => {
    if (pictureRef.current) {
      pictureRef.current.click();
    }
  };

  return (
    <div className={styles.image_container}>
      <label>{label}</label>

      <button
        disabled={updatingPicture}
        onClick={handleOnClickPicture}
        className={styles.image_button}
          // classNames(
          // 'relative aspect-w-16 aspect-h-9 overflow-hidden rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition group focus:outline-none',
          // image?.src
          //   ? 'hover:opacity-50 disabled:hover:opacity-100'
          //   : 'border-2 border-dashed hover:border-gray-400 focus:border-gray-400 disabled:hover:border-gray-200'
        // )}
      >
        {image?.src ? (
          <Image
            src={image.src}
            alt={image?.alt ?? ''}
            width={500}
            height={300}
            className={styles.image}
          />
        ) : null}

        <div className="flex items-center justify-center">
          {!image?.src ? (
            <div className="flex flex-col items-center space-y-2">
              <div className="shrink-0 rounded-full p-2 bg-gray-200 group-hover:scale-110 group-focus:scale-110 transition">
                <UploadIcon className={styles.upload_svg}/>
                {/* <ArrowUpIcon className="w-4 h-4 text-gray-500 transition" /> */}
              </div>
              <span className="text-xs font-semibold text-gray-500 transition">
                {updatingPicture ? 'Uploading...' : 'Upload'}
              </span>
            </div>
          ) : null}
          <input
            ref={pictureRef}
            type="file"
            accept={accept}
            onChange={handleOnChangePicture}
            className={styles.image_input}
          />
        </div>
      </button>

      {pictureError ? (
        <span className="text-red-600 text-sm">{pictureError}</span>
      ) : null}
    </div>
  );
};

