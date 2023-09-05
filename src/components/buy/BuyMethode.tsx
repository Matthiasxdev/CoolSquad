import React, { useState } from 'react';
import styles from '@/components/buy/BuyMethode.module.css'
import BankCard from '../svg/bankcard';
import Paypal from '../svg/paypal';


function BuyMethode() {
  const [isCardOn, setCardOn] = useState(true);
  const isPaypalOn = !isCardOn;

  function handleClick() {
    setCardOn(!isCardOn);
    console.log("Card On", !isCardOn);

  }

  const cardClassName = isCardOn ? styles.bankCardOn : styles.bankCardOff;



  return (
    <div className={styles.buyingMethod}>
    <div className={`${styles.bankCard} ${isCardOn ? styles.bankCardOn : styles.bankCardOff}`} onClick={handleClick}>
        <BankCard className={styles.bankCardIcon}/> 
        <div className={styles.text}>Carte bancaire</div>
    </div>
    <div className={`${styles.bankCard} ${isPaypalOn ? styles.bankCardOn : styles.bankCardOff}`} onClick={handleClick}>
        <Paypal className={styles.bankCardIcon}/> 
        <div className={styles.text}>Paypal</div>
    </div>
    </div>
  );
}

export default BuyMethode;