import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../core/services/country.service';
import { CompanyService } from '../core/services/company.service';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit{

countriesData:any = []
companiesData:any=[]

constructor(private activatedRoute:ActivatedRoute, private countryService:CountryService, private companyService:CompanyService){
  
}


/*Wenn das Array mit den Ländern/Firmen noch nicht mit den Länder-/
*Firmeninstanzen beladen wurde, dann werden zuerst die notwendigen Daten, 
*welche die Attributwerte der Instanzen enthalten, in countriesData/
*companiesData gespeichert und anschließend die Länder-/Firmeninstanzen mit 
*diesen Daten erzeugt und in einem Array gespeichert (über die Methode 
*setCountries(), bzw.setCompanies())
*/

ngOnInit() {
  if(this.countryService.getCountries().length === 0){
    this.countriesData= this.activatedRoute.snapshot.data['overviewRouteResolver'][1];
    this.countryService.setCountries(this.countriesData);
      }
  
  if(this.companyService.getCompanies().length === 0){
    this.companiesData= this.activatedRoute.snapshot.data['overviewRouteResolver'][0];
    this.companyService.setCompanies(this.companiesData);
    }
}
}