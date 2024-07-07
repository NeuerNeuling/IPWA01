import { TableObject } from "../../shared/model/tableObject.model";

export class Country extends TableObject {
    //pro Kopf Emission
    public perHeadEm :number;
    //Für Ranking nach pro Kopf Emission
    public countryRankHeadEm: number;
    //Kontinent auf welchem das Land liegt
    public continent: string; 

    constructor(
        name: string,
        description: string, 
        flagLink: string,  
        totalEm: number, 
        perHeadEm:number,
        rankTotalEm:number,
        countryRankHeadEm: number,
        continent:string) {
            //Aufruf des Konstruktors der Elternklasse
            super(name, description, flagLink, totalEm, rankTotalEm,'country');
            this.perHeadEm = perHeadEm;
            this.countryRankHeadEm = countryRankHeadEm;
            this.continent = continent;
        }
  }