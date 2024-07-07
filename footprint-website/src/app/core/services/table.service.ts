import { Injectable, PipeTransform } from "@angular/core";
import { TableObject } from "../../shared/model/tableObject.model";
import { Country } from "../../country/shared/country.model";
import { Company } from "../../company/shared/company.model";


/*
*Dieser Service beinhaltet die Methoden zum Sortieren, Suchen, Filtern und zum
*Zuweisen der Platzierungen
*/


@Injectable({
    /*
    *Deklaration, dass dieser Service vom root application injector erzeugt 
    *werden soll, um diesen Service in der gesamten Applikation nutzen zu können
    */
    providedIn: 'root'
})

export class TableService {

    /*Sortiert die Objekte (innerhalb einer Kopie von tableObjects) nach der 
    *Menge an produzierter Emissionen (totalEm) und weist ihnen ihren Platz zu 
    *wobei gilt: höhere Emission = niedrigerer Platz
    */
    getSorted(tableObjects: TableObject[]):TableObject[]{
        let obTotalEM:TableObject[] = tableObjects.slice().sort((a,b) => b.totalEm -a.totalEm);
        this.setGlobalRanking(obTotalEM);
        return obTotalEM;
      }
    

      /*
      * Methode, die für die Filterfunktion der Tabelle in der Komponente 
      * Overview-Start benötigt wird
      * Die Methode besitzt 2 Eingabeparameter, tableObjects und bool.
      * tableObjects enthält alle TableObjects, bool enthält die Information
      * welcher Subtyp gefiltert werden soll. Bei bool[0] = false werden
      * Firmen (Subtyp Company) ausgefiltert, bei bool[1] = false werden
      * Länder (Subtyp Country) ausgefiltert
      * Der Rückgabewert ist ein Array mit den nicht ausgefilterten
      * tableObjects  
      */
      filterObjectType(tableObjects: TableObject[], bool:boolean[]):TableObject[]{
        let filteredObjects : TableObject[] =[];
        for(let i:number = 0; i < tableObjects.length; i++ ){
            if(!bool[0] && tableObjects[i] instanceof Company){
                
            }else if (!bool[1] && tableObjects[i] instanceof Country){

            }else{
                filteredObjects.push(tableObjects[i]);
            }
        }
        return filteredObjects;
      }
      

      /*
      *Diese Methode gibt einen Array mit den Top 10 der CO2-Produzenten 
      *(nach dem Kriterium "totale Emmission") zurück
      */
    getTopTenTotalEm(tableObjects: TableObject[]):TableObject[]{
        let obTopTenTotalEM:TableObject[] = tableObjects.slice().sort((a,b) => b.totalEm -a.totalEm);
        this.setGlobalRanking(obTopTenTotalEM);
        const am = obTopTenTotalEM.length;
        //Falls es weniger als 10 Objekte gibt, für Testzwecke
        if(am <10){
            for(let i:number = 0; i <= 10-am; i++ ){
                obTopTenTotalEM.push(new TableObject(
                    'Dummy',
                    'DummyDescription',
                    'assets/logoPlatzhalter.png',
                     0, 
                     10,
                     "tableObject"
                   ),);
                
                }
            }
        return obTopTenTotalEM.slice(0,10);
        }
    
    /*
    *Diese Methode dient dem Sortieren der tableObject-Instanzen eines Array 
    *tableObjects nach ihrem Subtyp (Company (Firma) oder Country (Land)) oder
    *nach der gesamten Menge an produzierten CO2 (totalEm)
    */
    sortByType(tableObjects: TableObject[],type:string):void{
        if(type === "Firmen"){
            tableObjects = tableObjects.sort((a, b) => {
            if (a instanceof Company && !(b instanceof Company)) {
                     return -1;
            }else if (!(a instanceof Company) && b instanceof Company) {
                     return 1;
            }else{
                    return 0;
                }
            });
        }else if(type === "Länder"){
            tableObjects = tableObjects.sort((a, b) => {
            if (a instanceof Country && !(b instanceof Country)) {
                    return -1;
            }else if (!(a instanceof Country) && b instanceof Country) {
                        return 1;
            }else{
                        return 0;
                }
            });
        }else if(type ==="Totale Emissionen"){
            tableObjects= tableObjects.sort((a,b) => b.totalEm -a.totalEm);
            }
        }


    /*
    *Setzt den Wert für das Attribut rankTotalEm
    *Sie dient also dem Ranking nach der gesamten Menge an emittierten CO2
    */
    setGlobalRanking(tableObjects: TableObject[]):void{
        for(let i:number = 0; i < tableObjects.length; i++ ){
            if(i>0){
                if(tableObjects[i-1].totalEm === tableObjects[i].totalEm){
                  tableObjects[i].rankTotalEm = tableObjects[i-1].rankTotalEm;
                }else{
                  tableObjects[i].rankTotalEm= i+1;
                }
              }else{
                tableObjects[i].rankTotalEm= i+1;
              }
        }
    }

    /*
    *Die Variable overview gibt an ob die Suchfunktion im Overview-Modul *verwendet wird oder in einem anderen Modul
    */
    search(text: string, pipe: PipeTransform, object: TableObject[], overview: boolean): Country[]|Company[]|TableObject[] {
        /*
        *Die beiden If-Anweisungen überprüfen in welchem Kontext/Komponente die 
        *Suche benötigt wird, dies ist notwendig weil nicht alle Eigenschaften
        *von Ländern und Firmen geteilt werden und die Suchfunktion diese 
        *Eigenschaften sonst nicht miteinbeziehen würde
        */
        if(!overview){
            if(object[0] instanceof Country){
                return (object.filter((tableObject) => {
                    const term = text.toLowerCase();
                        return (
                            tableObject.name.toLowerCase().includes(term) ||(tableObject as Country).continent.toLowerCase().includes(term) || pipe.transform((tableObject as Country).totalEm).includes(term) || pipe.transform((tableObject as Country).perHeadEm).includes(term)
                    );
                }) as Country[]);
            }else{
                return (object.filter((tableObject) => {
                    const term = text.toLowerCase();
                        return (
                            tableObject.name.toLowerCase().includes(term) ||(tableObject as Company).country.toLowerCase().includes(term) || pipe.transform((tableObject as Company).totalEm).includes(term) || pipe.transform((tableObject as Company).numberOfEmployees).includes(term) 
                        );
                }) as Company[]);
            }
        }else{
            return (object.filter((tableObject) => {
                const term = text.toLowerCase();
                    return (
                        (tableObject.name.toLowerCase().includes(term) ||
                        pipe.transform((tableObject).totalEm).includes(term))
                    );
                }) as TableObject[]);
        }
    
    }

}