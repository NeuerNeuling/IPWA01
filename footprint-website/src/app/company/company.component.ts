import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../core/services/company.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit{

  companyData:any = []

    constructor(private activatedRoute:ActivatedRoute, private companyService:CompanyService){
      
    }
    /*
    *Wenn das Array mit den Firmen noch nicht mit den Firmeninstanzen beladen 
    *wurde, dann werden zuerst die notwendigen Daten, welche die Attributwerte 
    *der Instanzen enthalten, in companyData gespeichert und anschließend die 
    *Firmeninstanzen mit diesen Daten erzeugt und in einem Array gespeichert 
    *(über die Methode setCompanies())
    */
    ngOnInit(): void {
      if (this.companyService.getCompanies().length === 0) {
        this.companyData = this.activatedRoute.snapshot.data['companyRouteResolver'];
        this.companyService.setCompanies(this.companyData);
      }
    }
}
