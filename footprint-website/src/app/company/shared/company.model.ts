import { TableObject } from "../../shared/model/tableObject.model";

export class Company extends TableObject {
    //Firmensitz
    country: string;
    //Für Ranking nach Mitarbeiteranzahl
    rankNumberOfEmployees:number;
    //Anzahl der Mitarbeiter*Innen
    numberOfEmployees: number;

    constructor(
        name: string,
        description: string, 
        logoLink: string,  
        totalEm: number, 
        rankTotalEm: number,
        rankNumberOfEmployees:number,
        numberOfEmployees:number,
        country:string) {
            //Aufruf des Konstruktors der Elternklasse
            super(name, description, logoLink, totalEm, rankTotalEm,  'company'); 
            this.rankNumberOfEmployees = rankNumberOfEmployees;
            this.numberOfEmployees = numberOfEmployees;
            this.country = country;
         }
  }