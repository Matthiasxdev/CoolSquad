import { NavbarSection } from "@/shared/types";
import Link from "next/link";
import { useRef, useState } from "react";
import { CSSTransition } from 'react-transition-group';
import ArrowDown from "../svg/arrowdown";
import ArrowUp from "../svg/arrowup";
import styles from './menuitem.module.css'


interface IPROPS{
    currentID: number;
    myID: number;
    myTitle:string;
    mySections:NavbarSection[];
    sidemode:boolean;
    onClickMenu: (id:number) => void;
}

export default function MenuItemComponent({currentID, myID, myTitle, mySections, sidemode, onClickMenu}: IPROPS){
    const [show, setShow] = useState(false)
    const nodeRef = useRef(null);

    const handleClick = () => {
        if (myID === currentID) {
            setShow(!show)
        }else{
            onClickMenu(myID)
            setShow(true)
        }
    } 

    const createSection = (section: NavbarSection) => {
        return (
            <div key={section.id} className={`${styles.section}`.concat(sidemode ? ` ${styles.section_side}` : '')}>
                <Link href={section.href}>
                    <span>{section.title}</span>
                </Link>
            </div>

        );
     }
    const createSections = (sections: NavbarSection[]) => {
      return sections?.map(createSection);
    }
    return (
        <>
        {sidemode?
        
        <div className={styles.container_side} >
            <div className={styles.menuitem_side}><span>{myTitle}</span></div>
            {createSections(mySections)}
        </div>

        :
        
        <div className={styles.container} onClick={handleClick}>
            <div className={styles.menuitem}>
                {myTitle}
                {show && (currentID === myID) ?
                <ArrowUp />
                :
                <ArrowDown />
                }
            </div>
            <CSSTransition
                in ={show && (currentID === myID)}
                timeout={200}
                classNames={{
                    enterActive: styles.dropdownEnterActive,
                    enterDone: styles.dropdownEnter,
                    exitActive: styles.dropdownExitActive,
                    exitDone: styles.dropdownExit
                  }}
                unmountOnExit
                nodeRef={nodeRef}
                >
                <div className={styles.hiddensections} ref={nodeRef}>{createSections(mySections)}</div>
            </CSSTransition>
        </div>
        }
        </>
    )
}
