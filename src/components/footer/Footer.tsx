import Link from 'next/link'
import React from 'react'
import FacebookIcon from '../svg/facebook'
import InstagramIcon from '../svg/instagram'
import TwitterIcon from '../svg/twitter'
import styles from './footer.module.css'

export const Footer = () => {
  return (
    
    <footer className={styles.footer}>
    <div className={styles.firstpart}>
      <div>
        <h3>Uniteam</h3>
        <ul>
          <li><Link href="/">A propos de nous</Link></li>
          <li><Link href="/">Notre équipe</Link></li>
          <li><Link href="/">Blog</Link></li>
          <li><Link href="/">Nous contacter</Link></li>
        </ul>
      </div>
      <div>
        <h3>Nos services</h3>
        <ul>
          <li><Link href="/">Team building</Link></li>
          <li><Link href="/">Cadeeaux & Goodies</Link></li>
          <li><Link href="/">Séminaires</Link></li>
        </ul>
      </div>
      <div>
        <h3>Nos clients</h3>
        <ul>
          <li><Link href="/">Témoignages</Link></li>
          <li><Link href="/">Interview</Link></li>
          <li><Link href="/">Retours en chiffres</Link></li>
        </ul>
      </div>
      <div>
        <h3>Prestataires</h3>
        <ul>
          <li><Link href="/">Devenir prestataire</Link></li>
          <li><Link href="/">Obtenir la certification</Link></li>
          <li><Link href="/">Besoin d'aide ?</Link></li>
        </ul>
      </div>
      <div>
        <h3>S'abonner à la newsletter</h3>
        <ul>
          <li><Link href="/">Restez au courant de nos dernières offres et actualités</Link></li>
          <li><input className={styles.email} type="email" placeholder="Email" required></input></li>
          <li><button  className={styles.button} type="submit">S'inscrire</button></li>
        </ul>
      </div>
    </div>
    <div className={styles.secondpart}>
      <div className={styles.socials}>
        <ul>
          <li><TwitterIcon /></li>
          <li><InstagramIcon /></li>
          <li><FacebookIcon /></li>
        </ul>
      </div>
      <div className={styles.infos}>
        <ul>
          <li>Nous contacter</li>
          <li>CGV</li>
          <li>Mentions légales</li>
          <li>Politiques de confidentialité</li>
          <li>Sitemap</li>
        </ul>
      </div>
    </div>
  </footer>
  )
}
