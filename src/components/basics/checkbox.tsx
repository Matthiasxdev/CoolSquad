import { useState } from 'react';
import styles from './checkbox.module.css'

interface IPROPS{
    myID: number;
    myTarget:string;
    myValue:string | number;
    myArray?:number[];
    myLabel:string;
    onCheck: (myTarget:string, myID:number,myValue:string | number) => void;
}

export default function CheckboxComponent({myID,myTarget,myValue,myLabel,onCheck}:IPROPS){
    // const [checked, setChecked] = useState(false);

    const handleClick = () => {
        onCheck(myTarget, myID,myValue) //When clicked, return infos of CB to parent
        // myArray?.find(item => item === myID)?
        // setChecked(true)
        // :
        // setChecked(false)
        // if (show !== undefined){setChecked(show)}
    }
    return (
        <div  >
            {/* <input className="checkbox_input" type="checkbox" name={myTarget + '-' + myID} onClick={handleClick}/>
            <label className="checkbox_label" htmlFor="checkbox_1">{myLabel}</label> */}
            
            <label className={styles.checkbox} >
                <input 
                type="checkbox" 
                onClick={handleClick}/>
                <svg className={styles.check} width="35" 
                height="35">
                    <polyline points="7,16 12,23 25,8"></polyline>
                </svg>
                {myLabel}
            </label>
        </div>
    )
}