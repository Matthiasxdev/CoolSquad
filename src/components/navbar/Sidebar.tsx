'use client'

import { useSession } from "next-auth/react"
import styles from "./siderbar.module.css"
import HomeIcon from "../svg/home"
import AgendaIcon from "../svg/agenda"
import BoxIcon from "../svg/box"
import GraphsIcon from "../svg/graphs"
import SendIcon from "../svg/send"
import PersonIcon from "../svg/person"
import Link from "next/link"


export const Sidebar = () => {

  const {data: session} = useSession()
  if (!session || !session.user){return <div className={styles.sidebar_container}></div>}

  return (
    <>
        { session.user.role === "provider" ? 
        <div className={styles.sidebar_container} >
            <button>
                <Link href="/">
                    <HomeIcon className={`${styles.icon_home} ${styles.resize_40}`}/>
                </Link>
            </button>
            <button><AgendaIcon className={styles.icon}/></button>
            <button>
                <Link href="/activities">
                    <BoxIcon className={styles.icon}/>
                </Link>
            </button>
            <button><GraphsIcon className={styles.icon} /></button>
            <button><SendIcon className={styles.icon} /></button>
            <button><PersonIcon className={`${styles.icon} ${styles.resize_30}`}/></button>
        </div>
        :
        <div>
            <p>user</p>    
        </div>
        }
    </>

  )
}
