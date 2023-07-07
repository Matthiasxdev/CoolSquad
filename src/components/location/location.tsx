import LocalisationIcon from '../svg/localisation';
import styles from './location.module.css';

export default function SelectLocation () {
   return(
     <div className={styles.container}>
        <LocalisationIcon className={styles.icon}/>
        Montpellier
    </div>
   ) 
}