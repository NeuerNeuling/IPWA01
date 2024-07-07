import { Component, OnInit, PipeTransform } from '@angular/core';
import { Company } from '../shared/company.model';
import { CompanyService } from '../../core/services/company.service';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { TableService } from 'src/app/core/services/table.service';
import {of} from 'rxjs';



@Component({
  selector: 'app-company-start',
  templateUrl: './company-start.component.html',
  styleUrls: ['./company-start.component.css']
})
export class CompanyStartComponent implements OnInit{
  companies: Company[] = this.companyService.getCompanies();
  companiesFiltered:Company[]=[];
  topCompaniestotalEM: Company[] =[];
  //Mögliche Werte für die Sortierung
  arrangeTypes:string[] = ["Anzahl Mitarbeiter*Innen", "Totale Emissionen"];
  //Defaultwert der Sortierung
  selectedArrangeType:string="Totale Emissionen";
  //Für die Suchfunktion
  companies$: Observable<Company[]>;
	filter = new FormControl('', { nonNullable: true });

  //Für die Pagination
  goTo = new FormControl('', { nonNullable: true });
  //aktuelle Unterseite der Tabelle
  page:number=1;
  //Anzahl an Zeilen pro Unterseite
  pageSize:number;
  //Zur Auswahl der Anzahl an Zeilen pro Unterseite
  pageSizeSelected:string;
  //Die Auswahlmöglichkeiten für  pageSizeSelected
  pageSizeChoice:string[] = ['4', '8', '12', '16'];
  //Zur Darstellung der auswählbaren Unterseiten
  pageNumber:string[]=[];


  constructor(private companyService: CompanyService, 
    private tableService:TableService,
    private pipe: DecimalPipe) {
        this.pageSize =12;
        this.pageSizeSelected='12';
        for (let i = 0; i < Math.ceil((this.companies.length)/this.pageSize); i++){
              this.pageNumber.push(String(i+1));
            };
        this.companies$ = this.filter.valueChanges.pipe(
              startWith(''),
              map((text) => this.searchCompanies(text, pipe, this.companies)),
          );   
  }

  ngOnInit() {
    this.companies = (this.companyService.getSorted(this.companies) as Company[]);
    //Setzt den Wert für das Ranking nach Anzahl der Mitarbeiter*Innen  
    this.companyService.setPerEmployeesRanking(this.companies);
    this.topCompaniestotalEM = (this.companyService.getTopTenTotalEm(this.companies) as Company[]);
    this.onSubmit();   
  }

  //Für die Suchfunktion
  searchCompanies(text: string, pipe: PipeTransform, company: Company[]): Company[] {
     return (this.tableService.search(text, pipe, company, false) as Company[]);
  }

  //Für die Pagination
  private onSubmitPrivate():void{
    this.companyService.sortByValue(this.companies,this.selectedArrangeType);
    //damit die Suche beim Sortieren nicht resettet wird
    this.companiesFiltered = this.tableService.search(this.filter.value, this.pipe, this.companies, false) as Company[];
    this.calculateIndex();
    this.refreshCompanies();
  }

  //Für die Sortierfunktion und Suchfunktion
  onSubmit():void{
    this.onSubmitPrivate();
    this.pageChangePrivate(1);
  }

  //Alle folgenden Methoden sind für die Pagination

  /*
  *Um die Firmen der ausgewählten Tabellenseite anzuzeigen.
  *Mit slice() wird eine Kopie des Arrays mit den sortierten und gefilterten 
  *Firmeninstanzen erzeugt, der nur die für die aktuelle Seite der
  *Tabelle benötigten Objekte enthält. Dieser Array wird mit dem of()-Operator
  *zu einem Observable umgewandelt.
  */
  refreshCompanies():void{
		this.companies$ = of(this.companiesFiltered.slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		));
	}

  /*
  *Berechnet wie viele Pages es geben muss und befüllt pageNumber mit den *richtigen Werten, um eine Darstellung von zu vielen Seitenzahlen zu vermeiden
  */
  calculateIndex():void{
    this.pageNumber=[];
    let amount:number = Math.ceil((this.companiesFiltered.length)/this.pageSize);
    if(amount <11){
      for (let i = 0; i < amount; i++){
        this.pageNumber.push(String(i+1));
      }
    }else{
      this.pageNumber.push(String(1));
      this.pageNumber.push(String(2));
      this.pageNumber.push(String(3));
      if(this.page>5){
          this.pageNumber.push('...');
      }
      for (let i = this.page-1; i < this.page+2; i++){
        if(i>1 && i<amount-1 && !this.pageNumber.includes(String(i))){
            this.pageNumber.push(String(i));
        }
      }
      if(this.page<amount-4){
          this.pageNumber.push('...');
      }
      if(!this.pageNumber.includes(String(amount-2))){
        this.pageNumber.push(String(amount-2));
      }
      if(!this.pageNumber.includes(String(amount-1))){
        this.pageNumber.push(String(amount-1));
      }
      this.pageNumber.push(String(amount));
    }
}

  //Setzt den Wert von page auf bestimmten Wert
  private pageChangePrivate(page:number):void{
    this.page = page;
  }

  /*
  *Setzt den Wert von page auf den im template gewählten/eingegebenen Wert und 
  *wendet alle Filter an. Es sind nur Zahlen zwischen 1 und der maximalen
  *Seitenanzahl erlaubt.
  */
  pageChange(page:string):void{
    if(isNaN(parseInt(page))){
    }else{
      if(parseInt(page)>Math.ceil((this.companiesFiltered.length)/this.pageSize) || parseInt(page)<1){
      }else{
        this.pageChangePrivate(parseInt(page));
        this.onSubmitPrivate();
      }
    }
  }
  
 /*
  *Um die Anzahl an dargestellten Zeilen in den Unterseiten der Tabelle *einzustellen
  */
  setPageSize(){
    this.pageSize = parseInt(this.pageSizeSelected);
    this.onSubmit();
  }
  //Um die vorherige Seite zu wählen
  previousPage():void{
    if(this.page>1){
      this.page = this.page-1;
    }
    this.onSubmitPrivate();
  }
  //Um die nächste Seite zu wählen
  nextPage():void{
    if(this.page<Math.ceil((this.companiesFiltered.length)/this.pageSize)){
      this.page = this.page+1;
    }
    this.onSubmitPrivate();
  }
}
