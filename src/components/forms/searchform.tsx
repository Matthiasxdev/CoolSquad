import styles from './searchform.module.css';
import Searchbar from '@/components/searchbar/searchbar'
import SelectLocation from '@/components/location/location'

export default function SearchForm() {

    return(
        <div className={styles.formcontainer}>
            <SelectLocation />
            <Searchbar />
        </div>
    )

}