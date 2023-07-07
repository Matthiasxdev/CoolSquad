import NavbarComponent from "@/components/navbar/navbar";
import Head from "next/head";
import { useState } from "react";
import data from '@/assets/maketplace.json';
import FilterComponent from "@/components/filter/filter";
import { CardExtend } from "@/shared/types";
import CardsGrid from "@/components/cards/grid";
import styles from '@/styles/Marketplace.module.css'
import Searchbar from "@/components/searchbar/searchbar";
import SelectLocation from "@/components/location/location";

const datajson: CardExtend[] = JSON.parse(JSON.stringify(data));


export default function Marketplace() {
    
    const [marketCards,setCards] = useState([...datajson])

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
            defaultCards={[...datajson]}
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
            </div>
        </div>
        </>
    );
  }