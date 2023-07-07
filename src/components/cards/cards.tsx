import { CardExtend } from "@/shared/types";
import Image from "next/image";
import styles from "./cards.module.css"

const euroSymbol: string = '€';
const space: string = ' ';

 const CardComponent = ({image, description, rating, price,unit}: CardExtend) => {
    return (
      <div className={styles.container}>
        <a href="">
          <div className={styles.frame}>
            <Image 
              width={320}
              height={225}
              src={image.path} 
              alt={image.alt} 
              className={styles.image}
            />
          </div>
        </a>
        <div className={styles.text}>
          <div className={styles.description}>{description}</div>
          <a className={styles.rating} href={rating.link}>
            <div className={styles.score}>{rating.score}</div>
            <div className={styles.comments}>{rating.comments}</div>
          </a>
          <div className={styles.price}>{price + euroSymbol + space +  unit}</div>
        </div>
      </div>
    );
  }
  
  export default CardComponent;