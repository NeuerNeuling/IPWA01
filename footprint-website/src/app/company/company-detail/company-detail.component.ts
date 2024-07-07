import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Company } from '../shared/company.model';
import { CompanyService } from '../../core/services/company.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})

export class CompanyDetailComponent implements OnInit {
    name:string = '';
    //Falls die Firma nicht in der Datenbank vorkommt
    company: Company = new Company(
      'Nicht in Datenbank', 
       'Diese Firma ist leider nicht in unserer Datenbank',
      'assets/logoPlatzhalter.png',
       0, 
       0,
       0,
       0,
       "keine Angabe"
     );

    constructor(private companyService: CompanyService,
      private activedRoute: ActivatedRoute) {}

    /*
    *Aus der aktiven Route wird der Name der Firma über die Map paramMap 
    *ausgelesen. ParamMap erlaubt Routenparameter mit einer get-Methode aus der 
    *aktiven Route zu holen. Anschließend wird das passende Objekt mit dem 
    *entsprechenden Namen mit der getCompanyByName()-Methode gesucht
    *Sollte die Firma nicht in der "Datenbank" sein, wird ein 
    *Placeholderobjekt erzeugt und angezeigt
    */
   ngOnInit(){
    this.name= String(this.activedRoute.snapshot.paramMap.get("name"));
    this.company = this.companyService.getCompanyByName(this.name);
          }
        
}
