
import Head from "next/head";
import { useState } from "react";
import data from '@/assets/maketplace.json';
import FilterComponent from "@/components/filter/filter";
import { CardExtend } from "@/shared/types";
import CardsGrid from "@/components/cards/grid";
import styles from '@/styles/Marketplace.module.css'
import Searchbar from "@/components/searchbar/searchbar";
import SelectLocation from "@/components/location/location";
import { client } from "@/lib/client/client";
import { ActivitiesScheme, TlActivitiesPage } from "@/lib/scheme/activities";
import { useInfiniteQuery } from '@tanstack/react-query';
import { activityKeys } from "@/lib/activities/query.activities";
import { useSession } from "next-auth/react";

const dataJson: CardExtend[] = JSON.parse(JSON.stringify(data));


export default function Marketplace() {
    const { data: session } = useSession()
    const userId = session?.user?.id ? session?.user?.id : ""
    
    const [marketCards,setCards] = useState([...dataJson])

    const handleFilter = (newMarket:CardExtend[]) => {
        setCards(newMarket);
        // console.log(marketCards)
    }

    return (
        <>
        <Head>
            <title>Marketplace</title>
            <meta name="description" content="Uniteam | Marketplace" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/logo.svg" />
        </Head>
        <div className={styles.container}>
            <FilterComponent
            defaultCards={[...dataJson]}
            myCards={[...marketCards]}
            onFilter={handleFilter}
            />
            <div id='container-team-building'>
                <div className={styles.paths}><h1><a href=''>Team Building</a> {'>'} <a href=''>Esprit d'equipe</a></h1></div>
                <div className={styles.searchbar_layout}>
                    <SelectLocation />
                    <Searchbar />
                </div>
                <CardsGrid 
                myCards={[...marketCards]}
                />
                {/* <p>TEST</p>
                <ActivitiesTL userId={userId} defaultActivities={{ activities : [...marketCards], nextPage: 1 }}/> */}
            </div>
        </div>
        </>
    );
  }




  export const ActivitiesTL = ({userId, defaultActivities}: {userId:string, defaultActivities: TlActivitiesPage}) => {

    const { data, isFetchingNextPage, hasNextPage, fetchNextPage } =
      useInfiniteActivities(userId, defaultActivities);

    const activities = data?.pages.flatMap((page) => page.activities) ?? [];
  return (
    <div>
        {/* <CardsGrid 
        myCards={[...activities]}
        /> */}
        {activities.map((activity) => (
          <div key={activity.id}>{activity.id}</div>
            // <TweetWithLikes tweet={activity} userId={userId}/>
        ))}
        {/* <TweetsNextButton isFetchingNextPage={isFetchingNextPage} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} /> */}
    </div>
  )
}

const getUserActivities = async (userId?: string, signal?: AbortSignal, page = 0) => {
  if(userId) {
    return  client(`/api/users/${userId}/activities?page=${page}`, {
      signal,
      zodSchema: ActivitiesScheme,
    });
  }else {
    return  client(`/api/activities?page=${page}`, {
      signal,
      zodSchema: ActivitiesScheme,
    });

  }
}
 

export const useInfiniteActivities = (
  userId: string,
  defaultActivities: TlActivitiesPage
) =>
  useInfiniteQuery({
    queryKey: activityKeys.getByUser(userId),
    queryFn: ({ signal, pageParam }) =>
    getUserActivities(userId, signal, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialData: {
      pages: [defaultActivities],
      pageParams: [0],
    },
  });
