import styles from './activities.module.css';
import Image from 'next/image'
import { Card } from '@/shared/types';
import UniteamArrow from '../svg/arrowuniteam';

export default function CardComponentActivity (MyCard:Card) {
 return(
    <div className={styles.container} id={MyCard.id}>
        <a href={MyCard.link}>
        <div className={styles.vignette}>
            <Image
                src={MyCard.image.path}
                alt={MyCard.image.alt}
                width={484}
                height={400}
                style={{objectFit:"cover"}}
                className={styles.image}
            />
        </div>
        <div className={styles.text}>{MyCard.description}<UniteamArrow className={styles.arrow} /></div>
        </a>
    </div>
 )
}