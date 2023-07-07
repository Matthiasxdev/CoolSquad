// pages/403.tsx
import styles from "@/components/Layout/layout.module.css"
import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function Page403 ()  {
  return (
    <div className={styles.page_layout}>
      <h1 >403 - Unauthorized</h1>
      <p >Veuillez vous connecter en tant que <b>Prestataire</b> </p>
      <button onClick={() => signIn()}>Login</button>
    </div>
  );
};



