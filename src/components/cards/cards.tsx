import { CardExtend } from "@/shared/types";
import Image from "next/image";
import styles from "./cards.module.css"
import Link from "next/link";
<<<<<<< HEAD
=======
import HeartIcon from "../svg/heart";
import { useState } from "react";
import { LikeButton } from "./LikeButton";
>>>>>>> fix/filters_responsive

const euroSymbol: string = '€';
const space: string = ' ';

 const CardComponent = ({id,image, description, rating, price,unit}: CardExtend) => {
  const [favorite, setFavorite] = useState(false)

  const onClickFavorite = () => {
    setFavorite(!favorite)
  }


  return (
      <div className={styles.container}>
          <div className={styles.frame}>
            <div className={styles.positionning}>
              <Link href={`/activity/${id}`}>
                <Image 
                  width={320}
                  height={225}
                  src={image.path} 
                  alt={image.alt} 
                  className={styles.image}
                />
              </Link>
              <LikeButton 
                liked={favorite} 
                onClick={onClickFavorite} 
              />
              {/* <button
              type="button"
              onClick={e => {
                e.preventDefault();
                onClickFavorite(id);
              }}
              className={styles.button_like}
              >
              <HeartIcon
                className={`${styles.like} ${favorite ? styles.red : styles.white}`}
              />
              </button> */}
            </div>
        </div>
        <div className={styles.text}>
          <div className={styles.description}>{description}</div>
          <Link className={styles.rating} href={rating.link}>
            <div className={styles.score}>{rating.score}</div>
            <div className={styles.comments}>{rating.comments}</div>
          </Link>
          <div className={styles.price}>{price + euroSymbol + space +  unit}</div>
        </div>
      </div>
    );
  }
  
  export default CardComponent;