import React, { useState } from 'react';
import styles from '@/components/buy/CardBuying.module.css'
import BankCard from '../svg/bankcard';


function CardBuying() {
  const [isCardOn, setCardOn] = useState(true);

  function handleClick() {
    setCardOn(!isCardOn);
    console.log("Card On", !isCardOn);
  }

  const cardClassName = isCardOn ? styles.bankCardOn : styles.bankCardOff;



  return (
    <div className={`${styles.bankCard} ${isCardOn ? styles.bankCardOn : styles.bankCardOff}`} onClick={handleClick}>
        <BankCard className={styles.bankCardIcon}/> 
        <div className={styles.text}>Carte bancaire</div>
    </div>
  );
}

export default CardBuying;