import {  CardPresentation } from "@/shared/types";
import styles from './gridhome.module.css'
import HomeCard from "./homecards";


interface IProps {
    myCards:CardPresentation[];
  }
  

export default function HomeCardsGrid({myCards}:IProps){
    const createCard = (card: CardPresentation) => {
        return (
        <HomeCard 
            id={card.id}
            description={card.description}
            image={card.image}
            rating={card.rating}
            details={card.details} 
            link={card.link} 
            key={card.id}                  
        /> 
        );
    }
    const createCards = (cards: CardPresentation[]) => {
    return cards?.map(createCard);
    }

return (
    <div className={styles.container}>
        {createCards(myCards)} 
    </div>
    );
} 
  
    