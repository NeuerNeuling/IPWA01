import { Component, PipeTransform } from '@angular/core';
import { Country } from '../shared/country.model';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { CountryService } from '../../core/services/country.service';
import { TableService } from 'src/app/core/services/table.service';
import {of} from 'rxjs';

@Component({
  selector: 'app-country-start',
  templateUrl: './country-start.component.html',
  styleUrls: ['./country-start.component.css']
})

export class CountryStartComponent{
  countries: Country[] = this.countryService.getCountries();
  countriesFiltered:Country[]= [];
  topCountriesTotalEm: Country[] =[];
  topCountriesPerHeadEm: Country[] =[];

  arrangeTypes:string[] = ["Emissionen pro Kopf", "Totale Emissionen"];
  selectedArrangeType:string="Totale Emissionen";
  //Für die Suchfunktion
  countries$: Observable<Country[]>;
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

  constructor(private countryService: CountryService,
    private pipe: DecimalPipe,
    private tableService: TableService) {
      this.pageSize =12;
      this.pageSizeSelected='12';
      for (let i = 0; i < Math.ceil((this.countries.length)/this.pageSize); i++){
        this.pageNumber.push(String(i+1));
      };
      this.countries$ = this.filter.valueChanges.pipe(
        startWith(''),
        map((text) => this.searchCountries(text, pipe, this.countries)) ,
      );
  } 

  ngOnInit(){
    this.countries = (this.countryService.getSorted(this.countries) as Country[]);
    this.countryService.setPerHeadRanking(this.countries);
    this.topCountriesTotalEm = (this.countryService.getTopTenTotalEm(this.countries) as Country[]);
    this.onSubmit();
  }

  //Für die Suchfunktion
  searchCountries(text: string, pipe: PipeTransform, country: Country[]): Country[] {
    return (this.tableService.search(text, pipe, country, false) as Country[]);
  }

  //Für die Pagination
  private onSubmitPrivate():void{
    this.countryService.sortByValue(this.countries,this.selectedArrangeType);
    //damit die Suche beim Sortieren nicht resettet wird
    this.countriesFiltered = this.tableService.search(this.filter.value, this.pipe, this.countries, false) as Country[];
    this.calculateIndex();
    this.refreshCountries();
  }

  //Für die Such- und Sortierfunktion
  onSubmit():void{
    this.onSubmitPrivate();
    this.pageChangePrivate(1);
  }
  

  //Alle folgenden Methoden sind für die Pagination

  /*
  *Länder der ausgewählten Page anzeigen; 
  *Mit slice() wird eine Kopie des Arrays mit den sortierten und gefilterten 
  *Länderinstanzen erzeugt, der nur die für die aktuelle Seite der
  *Tabelle benötigten Objekte enthält. Dieser Array wird mit dem of()-Operator
  *zu einem Observable umgewandelt.
  */
  refreshCountries():void{
		this.countries$ = of(this.countriesFiltered.slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		));
	}

  /*
  *Berechnet wie viele Pages es geben muss und befüllt pageNumber mit den *richtigen Werten um eine Darstellung von zu vielen Seitenzahlen zu vermeiden
  */
  calculateIndex():void{
    this.pageNumber=[];
    let amount:number = Math.ceil((this.countriesFiltered.length)/this.pageSize);
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
  *wendet alle Filter an. Es sind nur Zahlen zwischen 1 und maximaler
  *Seitenanzahl erlaubt
  */
  pageChange(page:string):void{
    if(isNaN(parseInt(page))){
    }else{
      if(parseInt(page)>Math.ceil((this.countriesFiltered.length)/this.pageSize) || parseInt(page)<1){

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
    if(this.page<Math.ceil((this.countriesFiltered.length)/this.pageSize)){
      this.page = this.page+1;
    }
    this.onSubmitPrivate();
  }

}
