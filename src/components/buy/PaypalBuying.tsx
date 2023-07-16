import React, { useState } from 'react';
import styles from '@/components/buy/PaypalBuying.module.css'
import Paypal from '../svg/paypal';


function PaypalBuying() {
  const [isCardOn, setCardOn] = useState(true);

  function handleClick() {
    setCardOn(!isCardOn);
    console.log("Paypal On", !isCardOn);
  }

  const cardClassName = isCardOn ? styles.bankCardOn : styles.bankCardOff;



  return (
    <div className={`${styles.bankCard} ${isCardOn ? styles.bankCardOn : styles.bankCardOff}`} onClick={handleClick}>
        <Paypal className={styles.bankCardIcon}/> 
        <div className={styles.text}>Carte bancaire</div>
    </div>
  );
}

export default PaypalBuying;