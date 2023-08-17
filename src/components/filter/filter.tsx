import { CardExtend } from "@/shared/types";
import { useState } from "react";
import CheckboxComponent from "../basics/checkbox";
import styles from './filter.module.css'

const textUnit="A l'unité" //avoid ES LInt error for "'" => '&apos' // research todo
interface IPROPS {
    defaultCards:CardExtend[];
    myCards:CardExtend[];
    onFilter:(newArray:CardExtend[]) => void;
}
interface Filters {
    localisation:Filter[];
    price:{
        person:Filter[];
        unit:Filter[];
    };
}
interface Filter {
    id:number;
    value: string | number;
}

const myFilters:Filters = {
    localisation: [
    {
        id:1,
        value:'onsite'
    },
    {
        id:2,
        value:'virtual'
    }],
    price:{
        person:[
        {
            id:1,
            value:25
        },
        {
            id:2,
            value:50
        },
        {
            id:3,
            value:75
        }],
        unit:[
        {
            id:1,
            value:1000
        },
        {
            id:2,
            value:2500    
        },
        {
            id:3,
            value:5000
        },
        ]
    }
}

export default function FilterComponent({defaultCards,myCards,onFilter}:IPROPS){
    // const [filters,setFilters] = useState<Filters>(myFilters)
    const [filters,setFilters] = useState<Filters>({
        localisation:[],
        price:{
            person:[],
            unit:[]
        }
    })

    const applyFilter = (Cards:CardExtend[], filters:Filters) => {
        let newCards: CardExtend[] = [...Cards];
        if (filters.localisation.length > 0){
            newCards = [...Cards].filter(card => filters.localisation.find(item=> item.value === card.localisation))
        }
        newCards = [...newCards].filter(data => {
            if(data.unit === 'par personne'){
                if (filters.price['person'].length === 0){ return true}
                else{
                    const maxPrice = filters.price['person'].reduce((searched,tested) => searched.value > tested.value ? searched :tested);
                    const priceNum = maxPrice.value as number
                    return data.price <= priceNum
                }
            } 
            else{
                if (filters.price['unit'].length === 0){ return true}
                else{
                    const maxPrice = filters.price['unit'].reduce((searched,tested) => searched.value > tested.value ? searched :tested);
                    const priceNum = maxPrice.value as number
                    return data.price <= priceNum
                }
            } 
        })
       onFilter(newCards);
    }

    const handleCheck = (checkedTarget:string, checkId:number, checkedValue:string | number) => {
        let newFilters = Object.assign({}, filters);
        let newArray:Filter[];
        switch (checkedTarget) {
            case'localisation':
                filters?.localisation.find(item => item.id === checkId)?
                newArray = filters['localisation'].filter(item => item.id !== checkId)
                :
                newArray = [...filters['localisation'], {id:checkId,value:checkedValue}]
                newFilters['localisation'] = newArray;
                break;
            case'person':
            case'unit':
                filters?.price[checkedTarget].find(item => item.value === checkedValue)?
                newArray = filters.price[checkedTarget].filter(item => item.value !== checkedValue)
                :
                newArray = [...filters.price[checkedTarget], {id:checkId,value:checkedValue}]
                newFilters.price[checkedTarget] = newArray;
                break;
        }
            console.log("filters:",newFilters)
            setFilters(newFilters)
            applyFilter(defaultCards,newFilters)
    }

    const getLabelFilter = (target:string, value:string | number) => {
        switch (target){
            case 'localisation':
                if (value === 'onsite'){return "Sur place"}
                else {return "Virtuel"}
            case 'person':
            case 'unit':
                return(value + '€ max')
        }
        return ''
    }

    const createFilter = (filter:Filter,arrayID:string) => {
        // console.log('myKey',arrayID + filter.id.toString())
        return (
            <li key={arrayID + filter.id.toString()}>
                <CheckboxComponent 
                myTarget={arrayID}
                myID={filter.id}
                myValue={filter.value}
                myLabel={getLabelFilter(arrayID, filter.value)}
                onCheck={handleCheck}
                key={'checkbox' + arrayID + filter.id.toString()}
                />
                
            </li>
        )
    }
    const createFilters = (filters:Filter[],arrayID:string) => {
        return filters?.map(item => createFilter(item,arrayID));
    }

    return (
        <div className={styles.container}>
            <h1>Filtres</h1>
            <h2>Localisation</h2>
            <ul>
                {createFilters(myFilters.localisation, 'localisation')}
            </ul>
            <h2>Prix</h2>
            <h3>Par personne</h3>
            <ul>
                {createFilters(myFilters.price.person, 'person')}
            </ul>
            <h3>{textUnit}</h3>
            <ul>
                {createFilters(myFilters.price.unit, 'unit')}
            </ul>
        </div>
    )
}
