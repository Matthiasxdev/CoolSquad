import {  CardExtend, CardPresentation } from "@/shared/types";
import styles from './gridcardsNew.module.css'
import cardsNew from "./cardsNew";
import CardsNewComponent from "./cardsNew";


interface IProps {
    myCards:CardExtend[];
  }
  

export default function CardsNewGrid({myCards}:IProps){
    const createCard = (card: CardExtend) => {
        return (
        <CardsNewComponent 
            id={card.id}
            description={card.description}
            image={card.image}
            rating={card.rating}
            price={card.price} 
            link={card.link} 
            key={card.id}  
            unit={card.unit}
            localisation={card.localisation}
            city={card.city} 
            time={card.time}
            details={card.details}            
        /> 
        );
    }
    const createCards = (cards: CardExtend[]) => {
    return cards?.map(createCard);
    }

return (
    <div className={styles.container}>
        {createCards(myCards)} 
    </div>
    );
} 
  
    