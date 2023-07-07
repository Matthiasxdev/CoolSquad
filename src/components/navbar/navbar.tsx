import MenuItemComponent from './menuitem'
import data from '../../assets/navbar.json';
import { useState , useEffect, useRef} from 'react';
import { NavbarMenu } from '@/shared/types';
import styles from './navbar.module.css'
import UniteamLogo from '../svg/uniteamlogo';
import UniteamIcon from '../svg/uniteamicon';
import Link from 'next/link';
import Burger from '../svg/burger';
import useMediaQuery from '@/api/mediaQuery'
import { CSSTransition } from 'react-transition-group';
import { useSession } from 'next-auth/react';
import { LoginButton, UserComponent } from '../auth/AuthButtons';

const datajson: NavbarMenu[] = JSON.parse(JSON.stringify(data));

export default function NavbarComponent(){
    const isBreakpoint1100 = useMediaQuery(1100)
    const isBreakpoint1400 = useMediaQuery(1400)
    const [currentMenu, setCurrentMenu] = useState(0);
    const [menuOpen, setmenuOpen] = useState(false)
    const nodeRef = useRef(null);
    
    const { data: session } = useSession()

    useEffect(()=>{
        if(!isBreakpoint1400){setmenuOpen(false)}
    }, [isBreakpoint1400])

    useEffect(()=>{
        if(!isBreakpoint1100){setmenuOpen(false)}
    }, [isBreakpoint1100])

    const handleClick = (id: number) => {
        setCurrentMenu(id);
    }

    const createMenu = (menuItem: NavbarMenu) => {
        return (
            <MenuItemComponent 
            currentID={currentMenu}
            myID={menuItem.id}
            myTitle={menuItem.title} 
            mySections={menuItem.submenus}
            onClickMenu={(handleClick)}
            sidemode={menuOpen}
            key={menuItem.id}
            /> 
        );
     }
    const createMenus = (menuItems: NavbarMenu[]) => {
      return menuItems?.map(createMenu);
    }

    return (
        <div className={`${styles.navbar}`.concat(menuOpen ? ` ${styles.menu_open}` : '')}>
            <Link href="/">
                <div className={styles.uniteam}>
                    <UniteamIcon className={styles.icon} />
                    <UniteamLogo className={styles.logo} />
                </div>
            </Link>
                {isBreakpoint1100?
                    <div className={styles.navright_s}>
                        {session?.user ? (
                            <UserComponent />
                        ) : (
                            <LoginButton mode={"small"} /> 
                        )}
        
                        <div className={styles.burger}>
                            <button type="button" onClick={() => setmenuOpen(!menuOpen)}><Burger /></button>
                        </div>
                        <CSSTransition
                        in ={menuOpen}
                        timeout={{
                            appear: 0,
                            enter: 0,
                            exit: 500,
                        }}
                        classNames={{
                            enterActive: styles.sidemenuEnterActive,
                            enterDone: styles.sidemenuEnter,
                            exitActive: styles.sidemenuExitActive,
                            exitDone: styles.sidemenuExit
                        }}
                        unmountOnExit
                        nodeRef={nodeRef}
                        >
                            <div className={styles.sidebar} ref={nodeRef}>
                                <div className={styles.burger}>
                                    <button type="button" onClick={() => setmenuOpen(!menuOpen)}><Burger /></button>
                                </div>
                                <div className={styles.itemcontainer_side} >
                                    {createMenus(datajson)} 
                                </div>
                            </div>
                        </CSSTransition>
                    </div>
                :
                <>
                    <div className={styles.itemcontainer} >
                        {createMenus(datajson)} 
                    </div>
                    <div className={styles.navright}>
                        <a href='' className={styles.contact}>Contact</a>
                        {session?.user ? (
                            <UserComponent />
                        ) : (
                            isBreakpoint1400? <LoginButton mode={"small"} /> : <LoginButton mode={"full"} />
                        )}
                    </div>
                </>
                }
        </div>
    )
}

