// import { getSession } from 'next-auth/react';
// import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth/next"
import { authOptions } from './auth/[...nextauth]';
import { apiHandler } from '@/db/handler';
import { prisma } from '@/lib/prisma';

export default apiHandler(
  {
    endpoints: {
      POST: async (req, res) => {
        const session = await getServerSession(req, res, authOptions)
        if (!session?.user) {
          return res.status(401).json({ message: 'Unauthorized.' });
        }
        try {
            const {
              imageURL,
              title,
              description,
              price,
              unit,
              location,
              city
            } = req.body.myData;
            
            // Retrieve the current authenticated user
            const user = await prisma.user.findUnique({
              where: { email: session.user.email? session.user.email : undefined},
            });


            if (!user){ 
                return res.status(401).json({ message: 'Unauthorized.' });
            }

            const activity = await prisma.activity.create({
              data: {
                image: imageURL,
                title: title,
                description: description,
                price: parseInt(price),
                unit: unit,
                location: location,
                city: city,
                ownerId: user.id,
              },
            });
            res.status(200).json(activity);
          } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Something went wrong' });
          }
  
      },
    },
  });
  