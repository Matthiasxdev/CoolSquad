import { string } from "zod";

export interface Card {
    id:string; // number
    image:{
        path:string,
        alt:string
    }
    description:string; //title
    link:string;
}

export interface CardExtend extends Card{
  rating:{
    score: number;
    comments: number;
    link: string;
  };
  price: number;
  unit:string;
  localisation: "onsite" | "virtual";
  time: string;
  city:string;
  favorite: boolean;
  details?: string
}


export interface CardPresentation extends Card {
  price: number;
  rating:{
    score: number;
    comments: number;
    link: string;
  };
  details:string;
}


export interface NavbarMenu {
    id:number;
    title: string;
    submenus: NavbarSection[];
  }
  
  export interface NavbarSection {
    id: number;
    title: string;
    href: string;
  }
  
