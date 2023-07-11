import { CardExtend } from "@/shared/types";
import Image from "next/image";
import styles from "./cardsNew.module.css"
import LocalisationIcon from "../svg/localisation";

const euroSymbol: string = '€';
const space: string = ' ';

 const CardsNewComponent = ({image, description, rating, price, unit, time, city}: CardExtend) => {
    return (
      <div className={styles.container}>
        <a href="">
          <div className={styles.frame}>
            <Image 
              width={230}
              height={180}
              src={image.path} 
              alt={image.alt} 
              className={styles.image}
            />
          </div>
        </a>
        <div className={styles.description}>{description}</div>
        <div className={styles.text_container}>
        <div className={styles.price}>{price + euroSymbol + space +  unit}</div>
          <a className={styles.rating} href={rating.link}>
            <div className={styles.score}>{rating.score}</div>
            <div className={styles.comments}>{rating.comments}</div>
          </a>
          
        </div>
        <div className={styles.text_container_time_city}>
          <div className={styles.time}>{time} </div>
          <div className={styles.city}>
            <LocalisationIcon className={styles.local_icon} />
            <div className={styles.city_text}>{city}</div>
          </div>
        </div>
      </div>
    );
  }
  
  export default CardsNewComponent;