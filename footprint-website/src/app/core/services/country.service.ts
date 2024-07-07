import { Injectable, OnInit } from '@angular/core';
import { Country } from '../../country/shared/country.model';
import { TableService } from './table.service';


@Injectable({
  /*
  *Deklaration, dass dieser Service vom root application injector erzeugt 
  *werden soll, um diesen Service in der gesamten Applikation nutzen zu können
  */
  providedIn: 'root'
})
export class CountryService extends TableService  {
  //Array um die Firmen zu speichern
  private countries: Country[] = [];

  /*
  *Befüllt den Array country mit Länder-Instanzen. 
  *Diese werden mit den Daten von countryData instanziert.
  */
  setCountries(countryData:any):void{
    for(let dataCountry of countryData){
      let country = new Country(dataCountry.name, dataCountry.description, dataCountry.flagLink, dataCountry.totalEm, dataCountry.perHeadEm, 0,0, dataCountry.continent); 
      this.countries.push(country);
    }
   }

  //Gibt den Array mit den Länderinstanzen zurück
  getCountries():Country[]{
    return this.countries;
  }
  
    /*
    *Ermittelt den Platz/Rang innerhalb der Tabelle nach Anzahl der 
    *pro Kopf Emission, 
    *niedrigerer Platz = mehr pro Kopf Emission, bei Gleichstand selber Platz
    */
  setPerHeadRanking(countries: Country[]):void{
    for(let i:number = 0; i < countries.length; i++ ){
      if(i>0){
        if(countries[i-1].perHeadEm === countries[i].perHeadEm){
          countries[i].countryRankHeadEm = countries[i-1].countryRankHeadEm;
        }else{
          countries[i].countryRankHeadEm= i+1;
        }
      }else{
        countries[i].countryRankHeadEm= i+1;
      }
    }
  }

  //Sortiert den Array countries nach einem von zwei möglichen Kriterien
  sortByValue(countries: Country[], value:string):void{
    if(value === "Emissionen pro Kopf"){
        countries = countries.sort((a,b) => b.perHeadEm -a.perHeadEm);
        this.setPerHeadRanking(countries);
    }else if(value === "Totale Emissionen"){
        countries = countries.sort((a,b) => b.totalEm -a.totalEm);
    }
  }

  /*
  *Methode um eine bestimmte Länderinstanz als Rückgabewert zu
  *bekommen; die Methode wird für die Detailansicht benötigt
  */
  getCountryByName(name:string):Country{
    
    let country = new Country(
      'Nicht in Datenbank',
       'Dieses Land ist leider nicht in unserer Datenbank',
      'assets/logoPlatzhalter.png',
       0, 
       0,
       0,
       0,
       "keine Angabe"
     )
    for(let i=0; i < this.countries.length;  i++){
      if(this.countries[i].name === name){
        country = this.countries[i];
      }
    }
    return country;
  }
 
}