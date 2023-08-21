import { CardExtend } from "@/shared/types";
import CardComponent from "./Cards";
import styles from './grid.module.css'

interface IProps {
    myCards:CardExtend[];
  }
  
  export default function CardsGrid({myCards}:IProps){

      // const toggleFavorite = async (id : string) => {
      //   console.log(id)
      // }

      const createCard = (card: CardExtend) => {
          return (
          <div key={card.id} >
          <CardComponent 
            id={card.id}
            description={card.description}
            image={card.image}
            rating={card.rating}
            price={card.price}
            unit={card.unit}
            localisation={card.localisation}
            city={card.city}
            link={""} 
            time={card.time}
            favorite={false}
            // onClickFavorite={() => toggleFavorite(card.id)}        
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
  
    