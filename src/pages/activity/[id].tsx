
import { prisma } from "@/lib/prisma";
import { Activity } from "@prisma/client";
import style from "./style.module.css"
import Image from "next/image";
import LocalisationIcon from "@/components/svg/localisation";
import PersonIcon from "@/components/svg/person";
import ClockIcon from "@/components/svg/clock";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { date } from "zod";
import { client } from "@/lib/client/client";

type ActivityProps = {
  activity: Activity;
}

type ActivityItem = {
  id : string,
  quantity : number,
  timeEvent : number,
}

const opinions = ["nice", "cool" ]

export default function ActivityPage({activity}: ActivityProps) {
  const [disabled, setDisabled] = useState(false)
  
  const quantityRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);

  
  const addItemToCart = (myData : ActivityItem) => 
    client('/api/item-to-cart', { method:'POST', data:{myData}}); // TODO

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const quantity = quantityRef.current?.value
    const dateEvent = dateRef.current?.value
    const timeEvent = timeRef.current?.value 
    if (!quantity || !dateEvent || !timeEvent ){return}

    let dateTimeString = dateEvent + " " + timeEvent;

    // Create a new Date object using the combined date and time string
    let dateTime = new Date(dateTimeString);
    
    // Get the Unix timestamp by calling getTime() on the Date object
    let unixTimestamp = Math.floor(dateTime.getTime() / 1000);

    const newItem: ActivityItem = {
      id : activity.id,
      quantity: parseInt(quantity), 
      timeEvent : unixTimestamp
    }
    
    let toastId;

    try {
      setDisabled(true);
      toastId = toast.loading('Submitting...');
      // Submit data
      await addItemToCart (newItem) // TODO
      toast.success('Ajouté au panier', { id: toastId });
      setDisabled(false);
    }catch(e : any){  
      toast.error(e.message || "Une erreur s'est produite", { id: toastId });
      setDisabled(false);
    }
  };


    return (
      <div className={style.container}>
        <div className={style.column}>
          <div className={style.visual}>
            {activity?.image ?
            
            <Image 
            src={activity.image} 
            width={612}
            height={416}
            alt={activity.title} 
            className={style.image}
            />
            :
            <p>Image not found</p>
            }
            <div className={style.infographs}>
              <div><LocalisationIcon/>Avignon</div>
              <div><PersonIcon/>2 à 6 personnes</div>
              <div><ClockIcon />1h30</div>
            </div>
          </div>
          <div className={style.objectifs}>
            <h1>Objectifs</h1>
            <ul>
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sapien.</li>
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sapien.</li>
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sapien.</li>
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sapien.</li>
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sapien.</li>
            </ul>
          </div>
          
          <div className={style.infos}>
            <h1>Infos</h1>
            <ul>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
            </ul>
          </div>
        </div>
        <div className={style.column}>
          <div className={style.resume}>
            <h1 className={style.titre}>{activity?.title}</h1>
            <h1 className={style.prix}>{activity?.price} € {activity?.unit.toLowerCase()}</h1>
            <p>{activity?.description}</p>
          </div>
          <form onSubmit={handleSubmit} autoComplete="off" className={style.form}>
            <div className={style.input_container}>
              <label htmlFor="quantity">Nombre de personnes :</label>
              <input 
              type="number" 
              id="quantity"
              name="quantity"
              ref={quantityRef}
              min={1}
              max={10}
              placeholder='1'
              required
              />
            </div>
            <div className={style.date_time}>
              <div className={style.input_container}>
                <label htmlFor="dateEvent">Date :</label>
                <input 
                type="date" 
                id="dateEvent"
                name="dateEvent"
                ref={dateRef}
                required
                // placeholder='1'
                />
              </div>
              <div className={style.input_container}>
                <label htmlFor="timeEvent">Heure :</label>
                <input 
                type="time" 
                id="timeEvent"
                name="timeEvent"
                ref={timeRef}
                defaultValue="15:00"
                required
                />
              </div>
            </div>
            <button 
            type="submit" 
            disabled={disabled}
            >
              Ajouter au panier
            </button>
          </form>
          <div className={style.avis}>
            <h1>Avis</h1>
            {
            opinions.map((opinion, index) => {
              return (
                <div key={index}>
                  <div>☆☆☆</div>
                  <p>{opinion}</p>
                </div>
              )
            })
            }
          </div>
        </div>
      </div>
    )
}


    type StaticProps = {
      params:{id : string}
    }

  export async function getStaticPaths() {
    // Get all the homes IDs from the database
    const activities = await prisma.activity.findMany({
      select: { id: true },
    });
    return {
      paths: activities.map(activity => ({
        params: { id: activity.id },
      })),
      fallback: true,
    };
  }        

  export async function getStaticProps ({params}: StaticProps) {
    // Get the current home from the database
    // console.log(params.id)

    const activity = await prisma.activity.findUnique({
      where: { id: params.id },
    });
    if (activity) {
      return {
        props: {
          activity : JSON.parse(JSON.stringify(activity))
        },
      };
    }
    
  
    return {
      notFound: true
    };
  }