import React from 'react';
import InputForms from '@/components/forms/input/InputForms';
import styles from '@/styles/resume_reservation.module.css';
import Image from 'next/image';
import Head from "next/head";
import { CardExtend } from "@/shared/types";
import CardsNewGrid from '@/components/cards/gridcardsNew';
import { ST } from 'next/dist/shared/lib/utils';


export default function ReservationPage() {

    return (
        <><Head>
            <title>CoolSquad | Réservation</title>
            <meta name="description" content="CoolSquad | Réservation" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/logo.svg" />
            </Head>
            
            
            /* Mettre un bouton retour ici */

            <div className={styles.title}>
                <h1>Votre réservation</h1>
                </div>


            <div className={styles.container}></div>
        </>
    )
}
