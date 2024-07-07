import { Component, OnInit, PipeTransform } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TableService } from 'src/app/core/services/table.service';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { TableObject } from 'src/app/shared/model/tableObject.model';
import { CompanyService } from 'src/app/core/services/company.service';
import { CountryService } from 'src/app/core/services/country.service';
import {of} from 'rxjs';


@Component({
  selector: 'app-overview-start',
  templateUrl: './overview-start.component.html',
  styleUrls: ['./overview-start.component.css']
})
export class OverviewStartComponent implements OnInit{
  //Beinhaltet alle Länder und Firmen
  tableObjects: TableObject[] = [];
  //Zwischenspeicher für die sortierten und gefilterten Länder und Firmen
  tableObjectsFiltered:TableObject[]=[];
  //Beinhaltet die 10 Länder/Firmen mit der höchsten Emmission 
  topTableObjecttotalEM: TableObject[] =[];
  //Ob Länder und/oder Firmen angezeigt werden sollen
  filterStats: boolean[];
  //Kriterien zum Anordnen der Instanzen in der Tabelle
  arrangeTypes:string[] = ["Firmen", "Länder", "Totale Emissionen"];
  //Das Standardkriterium zum Anordnen der Instanzen in der Tabelle
  selectedArrangeType:string="Totale Emissionen";

  tableObjects$: Observable<TableObject[]>;
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




  constructor(private tableService: TableService,
              private router: Router,
              private companyService: CompanyService,
              private countryService: CountryService,
              private pipe: DecimalPipe) {
                this.filterStats = [true, true];
                this.pageSize =12;
                this.pageSizeSelected='12';
                for (let i = 0; i < Math.ceil((this.tableObjectsFiltered.length)/this.pageSize); i++){
                  this.pageNumber.push(String(i+1));
                };
                this.tableObjects$ = this.filter.valueChanges.pipe(
                  startWith(''),
                  map((text) => this.searchTableObjects(text, pipe, this.tableObjects)),
                );
                
  }

  //"Füllt" tableObjects mit den Firmen und Länderinstanzen
  getItems(tableObjects: TableObject[]):void{
    for (let i = 0; i <this.companyService.getCompanies().length; i++ ){
      tableObjects.push(this.companyService.getCompanies()[i]);
    }
    for (let i = 0; i <this.countryService.getCountries().length; i++ ){
      tableObjects.push(this.countryService.getCountries()[i]);
    }
  }

 ngOnInit() {
    this.getItems(this.tableObjects);
    this.tableObjects = this.tableService.getSorted(this.tableObjects);
    this.topTableObjecttotalEM = this.tableService.getTopTenTotalEm(this.tableObjects); 
    this.tableObjectsFiltered = this.tableService.search(this.filter.value, this.pipe, this.tableObjects, false) as TableObject[];
    this.onSubmit();
  }

  

  searchTableObjects(text: string, pipe: PipeTransform, tableObject: TableObject[]): TableObject[] {
    tableObject = this.tableService.filterObjectType(tableObject, this.filterStats);
    return (this.tableService.search(text, pipe, tableObject, true) as TableObject[]);
  }

  private onSubmitPrivate():void{
    this.tableService.sortByType(this.tableObjects,this.selectedArrangeType);
    //damit die Suche beim Sortieren nicht resettet wird
    this.tableObjectsFiltered = this.searchTableObjects(this.filter.value, this.pipe, this.tableObjects) as TableObject[];
    this.calculateIndex();
    this.refreshTableObjects();
  }

 
  onSubmit():void{
    this.pageChangePrivate(1);
    this.onSubmitPrivate();
    /*
    *Wenn die Filter-, Such- oder Sortierfunktion genutzt wird, wird 
    *wieder die erste Tabellenseite angezeigt
    */
  }

  //Damit die Links zu den richtigen Detailkomponenten führen
  onClickRedirect(name:string, type:string):void{
    if(type ==="country"){
      this.router.navigate(['country/details/'+name]);
    }else if(type ==="company"){
      this.router.navigate(['company/details/'+name]);
    }
  }


  //Alle folgenden Methoden sind für die Pagination

  /*
  *Firmen und Länder der ausgewählten Page anzeigen; 
  *Mit slice() wird eine Kopie des Arrays mit den sortierten und gefilterten 
  *Firmen-/Länderinstanzen erzeugt, der nur die für die aktuelle Seite der
  *Tabelle benötigten Objekte enthält. Dieser Array wird mit dem of()-Operator
  *zu einem Observable umgewandelt.
  */
  refreshTableObjects():void{
		this.tableObjects$ = of(this.tableObjectsFiltered.slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		));
	}

  /*
  *Berechnet wie viele Pages es geben muss und befüllt pageNumber mit den *richtigen Werten um eine Darstellung von zu vielen Seitenzahlen zu vermeiden
  */
  calculateIndex():void{
      this.pageNumber=[];
      let amount:number = Math.ceil((this.tableObjectsFiltered.length)/this.pageSize);
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

  //Setzt den Wert von page auf einen bestimmten Wert
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
      if(parseInt(page)>Math.ceil((this.tableObjectsFiltered.length)/this.pageSize) || parseInt(page)<1){

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
      this.page--;
    }
    this.onSubmitPrivate();
  }
  //Um die nächste Seite zu wählen
  nextPage():void{
    if(this.page < Math.ceil((this.tableObjectsFiltered.length)/this.pageSize)){
      this.page++;
    }
    this.onSubmitPrivate();
  }
}


