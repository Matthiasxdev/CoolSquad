import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import SearchForm from '@/components/forms/searchform'
import { Card, CardPresentation } from '@/shared/types'
import CheckIcon from '@/components/svg/check'
import NavbarComponent from '@/components/navbar/navbar'
import EmblaCarousel from '@/components/caroussel/EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel-react'
import UniteamArrow from '@/components/svg/arrowuniteam'
import HomeCardsGrid from '@/components/cards/gridhome'
import ConstructionIcon from '@/components/svg/construction'

const cardsIdeas:CardPresentation[] = [
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
    details:'Pariez sur une activité festive pour une occasion réussie'
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
    details:'Participez à une expérience unique en son genre'
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
    details:'Boostez votre créativité avec cet atelier insolite'
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
    details:"Favorisez l'intégration de nouveaux collaborateurs"
  }
]
const cardsCollection:Card[] = [
  {
    id:'1',
    image:{
      path:'/images/office-tb.jpg',
      alt:'caroussel Test'
    },
    description:'Depuis vos bureaux',
    link:''
  },
  {
    id:'2',
    image:{
      path:'/images/workshop-leaf.jpg',
      alt:'caroussel Test'
    },
    description:'Dans un lieu',
    link:''
  },
  {
    id:'3',
    image:{
      path:'/images/online-activities.jpg',
      alt:'caroussel Test'
    },
    description:'Activités en ligne',
    link:''
  },
  {
    id:'4',
    image:{
      path:'/images/office-tb.jpg',
      alt:'caroussel Test'
    },
    description:'Depuis vos bureaux',
    link:''
  },
  {
    id:'5',
    image:{
      path:'/images/workshop-leaf.jpg',
      alt:'caroussel Test'
    },
    description:'Dans un lieu',
    link:''
  }
]

const OPTIONS: EmblaOptionsType = {align:'start', speed:5}
const SLIDE_COUNT = cardsCollection.length
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())


export default function Home() {
  return (
    <>
      <Head>
        <title>CoolSquad</title>
        <meta name="description" content="La plateforme pour assurer le bien-être et la cohésion de vos collaborateurs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <NavbarComponent />
      <main className={styles.main}>
        <section className={styles.firstpanel}>
          <div className={styles.disclaimer}><ConstructionIcon /><h2>Site en construction</h2><ConstructionIcon /></div>
          <div className={styles.description}>
            <h1>La plateforme pour <em>assurer le bien-être et la cohésion</em> de vos collaborateurs</h1>
            <p>Découvrez notre catalogue de prestations de team building, d'animations et de séminaires</p>
            <SearchForm />
          </div>
          <Image
            src='/images/workshop-leaf.jpg'
            alt="Uniteam photos"
            width={250}
            height={325}
            placeholder="blur"
            blurDataURL='/images/workshop-leaf.jpg'
            className={styles.image}
          />
        </section>
        <section className={styles.secondpanel}>
          <div className={styles.firstpart}>
            <h2>Des activités adaptées à vos besoins</h2>
            <p>Trouvez la catégorie qui vous correspond</p>
            <EmblaCarousel slides={SLIDES} myCards={cardsCollection} options={OPTIONS} />
          </div>
          <div className={styles.secondpart}>
            <div className={styles.left}>
              <Image 
                src='/images/office-meeting.jpg'
                alt="Uniteam photos"
                width={550}
                height={346}
                className={styles.img}
                priority
              />
            </div>
            <div className={styles.right}>
              <h2>Organisez un séminaire personnalisé pour vos équipes</h2>
              <ul>
                <li><UniteamArrow />Renforcer la coopération et l'esprit d'équipe</li>
                <li><UniteamArrow />Améliorer la performance et la créativité</li>
                <li><UniteamArrow />Développer l'image de marque de votre entreprise</li>
              </ul>
              <button>Faites une demande</button>
            </div>
          </div>
        </section>
        <section className={styles.thirdpanel}>
          <div className={styles.firstpart}>
            <div className={styles.left}>
              <h2>Créez une culture d'entreprise</h2>
              <ul>
                <li><CheckIcon className={styles.icon}/>Entretenez et développez votre marque employeur</li>
                <li><CheckIcon className={styles.icon}/>Récompensez vos équipes avec des cadeaux originaux à l'image de votre entreprise</li>
                <li><CheckIcon className={styles.icon}/>Renforcez le sentiment d'appartenance et la cohésion de vos collaborateurs</li>
              </ul>
              <a><button>Voir nos articles</button></a>
            </div>
            <div className={styles.right}>
              <Image 
                src='/images/mug.png'
                alt="Mug branding"
                width={969}
                height={587}
                className={styles.img}
                priority
              />
            </div>
          </div>
          <div className={styles.secondpart}>
            <div className={styles.description}>
              <h2>Besoin d'idées pour votre prochain team building</h2>
              <button>Découvrez notre sélection</button>
            </div>
            <div className={styles.cards}>
              <HomeCardsGrid myCards={cardsIdeas}/>
            </div>
          </div>
        </section>
        {/* <section className={styles.fourthpanel}>
        </section> */}
      </main>
    </>
  )
}
