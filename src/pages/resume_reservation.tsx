import React from 'react';
import InputForms from '@/components/forms/input/InputForms';
import styles from '@/styles/resume_reservation.module.css';
import Image from 'next/image';
import Head from "next/head";
import VerifiedUserIcon from '@/components/svg/verifieduser';
import BankCard from '@/components/svg/bankcard';
import CardBuying from '@/components/buy/CardBuying';
import PaypalBuying from '@/components/buy/PaypalBuying';

const euroSymbol: string = '€';
const attendees: string = '*12*';
const price: number = 420;
const activity: string = 'Team Building Cooking Challenge';
const seller: string = 'Eat Sentive'


export default function ReservationPage() {


    return (
        <><Head>
            <title>CoolSquad | Réservation</title>
            <meta name="description" content="CoolSquad | Réservation" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/logo.svg" />
            </Head>
            

            /* Mettre un bouton retour ici */

            <div className={styles.title}>
                <h1>Votre réservation</h1>
                </div>


            <div className={styles.container}>
                <div className={styles.containerLeft}>
                    <div className={styles.containerImage}>
                        <Image
                            src='/images/seminaire.jpg'
                            alt="Uniteam photos"
                            width={100}
                            height={100}
                            className={styles.image}
                            priority />
                        <div className={styles.titleActivity}>
                            <h3>{activity}</h3>
                            <p>{seller}</p>
                        </div>
                    </div> 
                    <h2>Détails de la réservation</h2>
                    <div className={styles.inputBooking}>
                        <div className={styles.inputBookingtop}>
                            <InputForms title="Date*" type='date'/>
                            <InputForms title="Heure*" type='time'/>
                            <InputForms title="Participants*" type='number'/>
                        </div>
                    <InputForms title='Commentaire' type='text' isSpecial textareaRows={5}/>
                    </div>
                    <h2>Où souhaitez vous organisez le team building ?</h2>
                    <div className={styles.containerLocalisation}>
                        <div className={styles.containerLocalisationInput}>
                            <InputForms title="Adresse*" type='string'/>
                            <div className={styles.thickbox}>
                                <input type='checkbox' className={styles.localIcon} /*A remplacer par le composant Checkbox*//>
                                <span>Je préfère me rendre dans les locaux du prestataire</span>
                            </div>
                        </div>
                        <div className={styles.containerLocalisationMap}/> 
                    </div>
                    <div className={styles.contactTitleButton}>
                       <h2>Coordonnées</h2>
                        <div className={styles.contactButton}>Réserver entant qu'invité |<a className={styles.link} href='Event se connecter'>J'ai un compte</a></div>
                    </div>
                    <div className={styles.contactForm}>
                        <InputForms title="Prénom*" type='text'/>
                        <InputForms title="Nom*" type='text'/>
                        <InputForms title="Email*" type='email' placeholder='mail@mail.fr'/>
                        <InputForms title="Téléphone*" type='string' placeholder='00 00 00 00 00'/>
                    </div>
                    <h2>Paiement</h2>
                    <p>Vous serez prélevez une fois que le prestataire valide la réservation </p>
                    <div className={styles.buyingMethod}>
                        <CardBuying/>
                        <PaypalBuying/>
                    </div>
                    <div className={styles.cardInfos}>
                        <InputForms title="Numéro de carte" type='text' placeholder='0000 0000 0000 0000'/>
                        <InputForms title="Expiration" type='text' placeholder='MM/AA'/>
                        <InputForms title="CVC" type='text'placeholder='000'/>
                    </div>
                    <InputForms title='Pays' type='text' placeholder='France'/>
                    <div className={styles.disclaimerPrivacy}>Nos conditions d'utilisation s'appliquent. Pour plus d'informations, consultez nos <a className={styles.link} href='Link Politiques confidentialité'>Politiques de confidentialité</a></div>


                    
                </div>
                <div className={styles.containerRight}>
                        <h2>Résumé</h2>
                        <div className={styles.attendees_price}>
                            <div className={styles.attendees}> 
                                <div className={styles.attendeesNumber}>{attendees}</div>
                                <p>Participants</p>
                            </div>
                            <div className={styles.price}>{price + euroSymbol}</div>
                        </div>
                        <div className={styles.totalprice}> 
                            <div className={styles.total}>Total</div>
                            <div className={styles.price}>{price + euroSymbol}</div>
                        </div>
                        <button className={styles.button} onClick={() => console.log('Booking Done')}>Réserver</button>
                        <div className={styles.infosProtect}>
                           <VerifiedUserIcon className={styles.localIcon}/>
                           <p> <span className={styles.textProtect}>Protection CoolSquad :</span> Vous serez remboursé en cas d'annulation ou tout autre problème</p>
                        </div>
                </div>
                
            </div>
        </>
    )
}
