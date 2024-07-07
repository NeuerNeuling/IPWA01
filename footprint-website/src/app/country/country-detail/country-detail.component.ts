import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Country } from '../shared/country.model';
import { CountryService } from '../../core/services/country.service';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css']
})


export class CountryDetailComponent implements OnInit {
    name:string = '';
    country: Country = new Country(
      'Nicht in Datenbank',
       'Dieses Land ist leider nicht in unserer Datenbank',
      'assets/logoPlatzhalter.png',
       0, 
       0,
       0,
       0,
       "keine Angabe"
     );

    constructor(private countryService: CountryService,
      private activedRoute: ActivatedRoute) {}

   /*
   *Aus der aktiven Route wird der Name des Lands über die Map paramMap 
   *ausgelesen. ParamMap erlaubt Routenparameter mit einer get-Methode aus der 
   *aktiven Route zu holen. Anschließend wird das passende Objekt mit dem 
   *entsprechenden Namen mit der getCountryByName()-Methode gesucht
   *Sollte das Land nicht in der "Datenbank" sein, wird ein 
   *Placeholderobjekt angezeigt
   */
   ngOnInit(){
      this.name= String(this.activedRoute.snapshot.paramMap.get("name"));
      this.country = this.countryService.getCountryByName(this.name);
            }
          
      
}