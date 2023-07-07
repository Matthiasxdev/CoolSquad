import { CardPresentation } from "@/shared/types";
import Image from "next/image";
import UniteamArrow from "../svg/arrowuniteam";
import styles from "./homecards.module.css"


 export default function HomeCard ({image, description, rating, details}: CardPresentation){
    return (
      <div className={styles.container}>
        <a href="">
          <div className={styles.frame}>
            <div className={styles.vignette}>
              <Image 
                width={296}
                height={455}
                src={image.path} 
                alt={image.alt} 
                className={styles.image}
              />
            </div>
            <UniteamArrow className={styles.arrow} />
          </div>
        </a>
        <div className={styles.text}>
          <div className={styles.description}>{description}</div>
          <a className={styles.rating} href={rating.link}>
            <div className={styles.score}>{rating.score}</div>
            <div className={styles.comments}>{rating.comments}</div>
          </a>
          <div className={styles.details}>{details}</div>
        </div>
      </div>
    );
  }

  