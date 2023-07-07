'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import PersonIcon from '../svg/person';
import styles from '../navbar/navbar.module.css'
import Image from "next/image";
import { createRef, useState } from 'react';
import Link from 'next/link';
import { ClickOutsideDetector } from '../hooks/oustideClick';

type ButtonProps = {
  mode: String
}

export const LoginButton = ({mode} : ButtonProps) => {
  return (
    mode === "full"?
    <button onClick={() => signIn()} className={styles.connect_f}>
      {/* <PersonIcon className={styles.icon} /> */}
      Se connecter
    </button>
    :
    <button onClick={() => signIn()} className={styles.connect_s}>
      <PersonIcon className={styles.icon} />
    </button>
  );
};

export const LogoutButton = () => {
  return <button onClick={() => signOut()}>Se déconnecter</button>;
};

export const UserComponent = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const containerRef = createRef<HTMLDivElement>()
  const session = useSession()
  if(!session.data?.user) {return null}
  const user = session.data?.user
  let image = user.image
  if (!image){image = ""}

  return (
    <ClickOutsideDetector
      ref={containerRef}
      wrapperId={"userComponent"}
      listen={menuOpen}
      onClickOutside={() => setMenuOpen(!menuOpen)}
    >
      <div className={styles.user_button_container}>
      <button className={styles.user_button} onClick={() => setMenuOpen(!menuOpen)}>
        <div className={styles.user_name}>{user.name}</div>
        <Image 
          width={24}
          height={24}
          src={image} 
          alt={"user's profile picture"}
          className={styles.user_image}
        />
      </button>
      {menuOpen ?
          <div className={styles.user_menu}>
            <Link href="/activities">Mes prestations</Link>
            <p>Tableau de bord</p>
            <LogoutButton />
          </div>
            : 
          false
        }
        </div>
      </ClickOutsideDetector >
  );
}