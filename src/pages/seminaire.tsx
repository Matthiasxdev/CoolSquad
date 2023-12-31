import React from 'react';
import InputForms from '@/components/forms/input/InputForms';
import style from '@/styles/seminaire.module.css';
import Image from 'next/image';
import Head from "next/head";
import UniteamArrow from '@/components/svg/arrowuniteam';
import { CardExtend } from "@/shared/types";
import CardsGrid from '@/components/cards/grid';

export default function TestPage() {
  return (
    <><Head>
      <title>CoolSquad | Séminaire</title>
      <meta name="description" content="CoolSquad | Séminaire" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/logo.svg" />
    </Head>
    
    <div className={style.title}>
          <h1>Séminaire</h1>
        </div>


    <div className={style.container}>

       
        <div className={style.leftContainer}>
          <Image
            src='/images/seminaire.jpg'
            alt="Uniteam photos"
            width={529}
            height={926}
            className={style.image}
            priority />
          <UniteamArrow className={style.arrow} />
          <div className={style.imageText}>
            <p>Nous mettons à votre disposition notre expertise et notre savoir-faire pour vous garantir un séminaire professionnel de qualité, qui correspond à vos objectifs et à votre image.</p>
            <h2>Comment ça marche ?</h2>
            <p>Effectuez une demande via notre formulaire, nous vérifierons ensuite la faisabilité du projet. Suite à quoi nous vous contacterons pour fixer un rdv.</p>
          </div>
        </div>
        <div className={style.formContainer}>
          <div className={style.row}>
            <div className={style.inputContainer}>
              <InputForms title="Prénom*" placeholder=''/>
            </div>
            <div className={style.inputContainer}>
              <InputForms title="Nom*" placeholder='' />
            </div>
          </div>
          <div className={style.row}>
            <div className={style.inputContainer}>
              <InputForms title="Entreprise*" placeholder=''/>
            </div>
          </div>
          <div className={style.row}>
            <div className={style.inputContainer}>
              <InputForms title="Email*" type='email' placeholder='adresse@mail.fr'/>
            </div>
          </div>
          <div className={style.row}>
            <div className={style.inputContainer}>
              <InputForms title="Téléphone*" placeholder='00 00 00 00 00' />
            </div>
          </div>
          <div className={style.row}>
            <div className={style.inputContainer}>
              <InputForms title="Date souhaitée*" placeholder='jj/mm/aaaa'/>
            </div>
            <div className={style.inputContainer}>
              <InputForms title="Ville*" placeholder='' />
            </div>
          </div>
          <div className={style.inputContainer}>
            <InputForms title="Informations complémentaires" placeholder='' isSpecial textareaRows={4}/>
          </div>
          <div><button  className={style.button}>Faire une demande</button></div>
      </div>
    </div>
     
    <div className={style.title2}>
          <h2>Vous aimerez peut-être</h2>
        </div>
    <div className={style.containerGrid}></div>
        <CardsGrid 
                myCards={cardsIdeas}
                />
    <div/>
    </>
  );
}

const cardsIdeas:CardExtend[] = [
  {
    id:'1',
    image:{
      path:'/images/casino.jpg',
      alt:'Animation casino'
    },
    description:'Animation casino',
    link:'',
    rating:{
      score: 4.5,
      comments: 11,
      link: ''
      },
    details:'Pariez sur une activité festive pour une occasion réussie',
    price: 45,
    unit: '/ personne',
    time:'2h',
    localisation: "onsite",
    city: 'Montpellier',
    favorite:false
  },
  {
    id:'2',
    image:{
      path:'/images/casino.jpg',
      alt:'Laser Game VR'
    },
    description:'Laser Game VR',
    link:'',
    rating:{
      score: 4.5,
      comments: 11,
      link: ''
      },
    details:'Participez à une expérience unique en son genre',
    price: 45,
    unit: '/ personne',
    time:'2h',
    localisation: "onsite",
    city: 'Montpellier',
    favorite:false
  },
  {
    id:'3',
    image:{
      path:'/images/casino.jpg',
      alt:'Atelier peinture'
    },
    description:'Atelier peinture',
    link:'',
    rating:{
      score: 4.5,
      comments: 11,
      link: ''
      },
    details:'Boostez votre créativité avec cet atelier insolite',
    price: 45,
    unit: '/ personne',
    time:'2h',
    localisation: "onsite",
    city: 'Montpellier',
    favorite:false
  },
  {
    id:'4',
    image:{
      path:'/images/casino.jpg',
      alt:'Activités Icebreaker'
    },
    description:'Activités Icebreaker',
    link:'',
    rating:{
      score: 4.5,
      comments: 11,
      link: ''
      },
    details:"Favorisez l'intégration de nouveaux collaborateurs",
    price:45,
    unit: '/ personne',
    time:'2h',
    localisation: "onsite",
    city: 'Montpellier',
    favorite:false
  },

  {
    id:'4',
    image:{
      path:'/images/casino.jpg',
      alt:'Activités Icebreaker'
    },
    description:'Activités Icebreaker',
    link:'',
    rating:{
      score: 4.5,
      comments: 11,
      link: ''
      },
    details:"Favorisez l'intégration de nouveaux collaborateurs",
    price:45,
    unit: '/ personne',
    time:'2h',
    localisation: "onsite",
    city: 'Montpellier',
    favorite:false
  }

]
