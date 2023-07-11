import { CardExtend } from "@/shared/types";
import CardComponent from "./cards";
import styles from './grid.module.css'

interface IProps {
    myCards:CardExtend[];
  }
  
  export default function CardsGrid({myCards}:IProps){
      const createCard = (card: CardExtend) => {
          return (
          <div>
          <CardComponent 
            id={card.id}
            description={card.description}
            image={card.image}
            rating={card.rating}
            price={card.price}
            unit={card.unit}
            localisation={card.localisation}
            city={card.city}
            key={card.id} link={""}  
            time={card.time}
            details={card.details}       
            /> 
          </div>
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
  
    