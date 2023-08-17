
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
              id,
              quantity,
              timeEvent,
            } = req.body.myData;
            
            // Retrieve the current authenticated user
            const user = await prisma.user.findUnique({
              where: { 
                email: session.user.email? session.user.email : undefined
                },
              include : {
                cart: true,
              }
            });


            if (!user){ 
                return res.status(401).json({ message: 'Unauthorized.' });
            }
            
            // si il n'existe pas de panier pour utilisateur
            if (!user.cart){
                const cart = await prisma.cart.create({
                    data:{
                        user: { connect: { id: user.id } },
                    },
                    include :{items : true}
                })
                // Update the user object with the newly created cart
                user.cart = cart;
            }

            const cartItemsLength = await prisma.cartItem.count({
              where: {
                cartId: user.cart.id, 
              },
            });

            if(cartItemsLength > 10){
              return res.status(409).json({ message: 'Le panier est plein (10 items max)' });
            }

            // on créé l'item à ajouter au panier
            const item = await prisma.cartItem.create({
              data: {
                cart: { connect: { id: user.cart.id } },
                activity: { connect: { id: id } }, 
                quantity    : quantity,
                dateEvent : timeEvent,
              },

            


            });
            res.status(200).json(item);
          } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Something went wrong' });
          }
  
      },
    },
  });
  