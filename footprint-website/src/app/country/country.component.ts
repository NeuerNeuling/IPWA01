import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../core/services/country.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit{

    countryData:any = []

    constructor(private activatedRoute:ActivatedRoute, private countryService:CountryService){
    }


    /*
    *Wenn das Array country (siehe CountryService) noch nicht mit den 
    *Länderinstanzen beladen wurde, dann werden zuerst die notwendigen Daten, 
    *welche die Attributwerte der Instanzen enthalten, in countryData 
    *gespeichert und anschließend die Länderinstanzen mit diesen Daten erzeugt 
    *und im Array country gespeichert (über die Methode setCountries())
    */
    ngOnInit() {
      if(this.countryService.getCountries().length === 0){
        this.countryData= this.activatedRoute.snapshot.data['countryRouteResolver'];
        this.countryService.setCountries(this.countryData);
      }
    }

}
