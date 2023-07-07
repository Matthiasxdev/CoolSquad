
import type { GetServerSidePropsContext } from "next"
import {  getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]";
import { prisma } from "@/lib/prisma";
import { CardPresentation } from "@/shared/types";
import styles from "@/components/Layout/layout.module.css"
import { Sidebar } from "@/components/navbar/Sidebar";
import BoxIcon from "@/components/svg/box";
import Link from "next/link";
import HomeCardsGrid from "@/components/cards/gridhome";

// Export the `session` prop to use sessions with Server Side Rendering
export async function getServerSideProps(context: GetServerSidePropsContext) {

  const session = await getServerSession(context.req, context.res, authOptions)
  if (!session || session.user?.role === "user" || !session?.user ){
    return {
      redirect: {
        permanent: false,
        destination: "/403"
      }
    }
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email? session.user.email : undefined},
  });

  const activities = await prisma.activity.findMany({
    where : { ownerId : user?.id}
  });
  

  return {
    props: {
        activities: JSON.parse(JSON.stringify(activities)),
    },
  }
}

export default function ProductsPage ( {activities}: any  ) {
    // As this page uses Server Side Rendering, the `session` will be already
    // populated on render without needing to go through a loading stage.
   
    
    const cards = Array.isArray(activities) ? activities.map(activity => 
    {
       return {
            id: activity.id,
            image:{
                path: activity.image,
                alt:activity.description
            },
            description: activity.title,
            link:"",
            rating: {
                score: activity.rating,
                comments:0,
                link: "/",
            },
            details: activity.description
        } as CardPresentation //CardExtend
    }) 
    :
    []

    return (        
        <div className={styles.page_layout}>
          <Sidebar />
          <div className={styles.content_container}>
            <h1><BoxIcon />Prestation</h1>
            <HomeCardsGrid myCards={cards}/>
            {/* <CardsGrid myCards={cards}/> */}
            <button className={styles.blue_button}>
              <Link href="/create">
                Ajouter une prestation
              </Link>
            </button>
          </div>
        </div >
    )
  }
  