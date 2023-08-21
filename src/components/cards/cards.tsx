import { CardExtend } from "@/shared/types";
import Image from "next/image";
import styles from "./cards.module.css"
import { useState } from "react";
import Link from "next/link";
import { LikeButton } from "./LikeButton";

const euroSymbol: string = '€';
const space: string = ' ';


  const CardComponent = ({id,image, description, rating, price,unit, city, time}: CardExtend) => {
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
                    width={230}
                    height={180}
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
          
          <div className={styles.infos}>
            <div className={styles.time}>{time} </div>
            <div className={styles.city}>{city} </div>
          </div>
        </div>
      );
    }
    
    export default CardComponent;

    
//  const CardComponent = ({image, description, rating, price, unit, time, city}: CardExtend) => {
//     return (
//       <div className={styles.container}>
//         <a href="">
//           <div className={styles.frame}>
//             <Image 
//               width={230}
//               height={180}
//               src={image.path} 
//               alt={image.alt} 
//               className={styles.image}
//             />
//           </div>
//         </a>
//         <div className={styles.description}>{description}</div>
//         <div className={styles.text}>
//         <div className={styles.price}>{price + euroSymbol + space +  unit}</div>
//           <a className={styles.rating} href={rating.link}>
//             <div className={styles.score}>{rating.score}</div>
//             <div className={styles.comments}>{rating.comments}</div>
//           </a>
          
//         </div>
//         <div className={styles.infos}>
//           <div className={styles.time}>{time} </div>
//           <div className={styles.city}>{city} </div>
//         </div>
//       </div>
//     );
//   }
  
//   export default CardComponent;