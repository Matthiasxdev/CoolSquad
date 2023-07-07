import styles from './searchbar.module.css';
import { useState } from 'react';
import SearchIcon from '../svg/search';

export default function Searchbar(){
    const [text, setText] = useState('')
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
      }
    return (
        <div className={styles.inputsearch}>
            <div className={styles.textfield}>
                <SearchIcon className={styles.icon}/>
                <input type="text" 
                placeholder='Type de Team Building' 
                name="search_input"
                value={text}
                onChange={handleChange}/>
            </div>
            <button className={styles.search_button}>
                <span>Rechercher</span>
            </button>
        </div>
    )
}