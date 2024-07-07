export class TableObject {
    constructor(
        //Name des Landes/Firma
        public name: string, 
        //Beschreibung, für Detailansicht
        public description:string, 
        //Logo der Firma/ Flagge des Landes
        public logoLink: string, 
        //Menge an produzierten CO2 Emissionen pro Jahr
        public totalEm: number, 
        //Verwendet für das Ranking nach der gesamten Menge an produzierten CO2 Emissionen 
        public rankTotalEm:number,
        //Diskriminator, kann Land oder Firma sein, wird für Umleitung zur Detailansicht von der Komponente Overview genutzt 
        public type:string
         ) {}
  }
  
  