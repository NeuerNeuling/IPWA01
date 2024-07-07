import { Injectable} from '@angular/core';
import { Company } from '../../company/shared/company.model';
import { TableService } from './table.service';



@Injectable({
  /*
  *Deklaration, dass dieser Service vom root application injector erzeugt 
  *werden soll, um diesen Service in der gesamten Applikation nutzen zu können
  */
  providedIn: 'root'
})

export class CompanyService extends TableService{

  //Array um die Firmen zu speichern
  private companies: Company[] = [];

  /*
  *Befüllt den Array companies mit Firmen-Instanzen. 
  *Diese werden mit den Daten von companyData instanziert.
  */
  setCompanies(companyData:any):void{
      for(let dataCompany of companyData){
        let company = new Company(dataCompany.name, dataCompany.description, dataCompany.logoLink, dataCompany.totalEm, 0, 0, dataCompany.numberOfEmployees, dataCompany.continent); 
        this.companies.push(company);
      }
  }

  getCompanies():Company[]{
      return this.companies;
  }

  //Sortiert den Array companies nach einem von zwei möglichen Kriterien
  sortByValue(companies: Company[], value:string):void{
    if(value === "Anzahl Mitarbeiter*Innen"){
        companies = companies.sort((a,b) => b.numberOfEmployees -a.numberOfEmployees);
        this.setPerEmployeesRanking(companies);
    }else if(value === "Totale Emissionen"){
        companies = companies.sort((a,b) => b.totalEm -a.totalEm);
    }
  }
    
    /*
    *Ermittelt den Platz/Rang innerhalb der Tabelle nach Anzahl der 
    *Mitarbeiter*Innen, 
    *niedrigerer Platz = mehr Mitarbeiter*Innen, bei Gleichstand selber Platz
    */
    setPerEmployeesRanking(companies: Company[]):void{
      for(let i:number = 0; i < companies.length; i++ ){
        //Um nicht auf index -1 zuzugreifen 
        if(i>0){
          if(companies[i-1].numberOfEmployees === companies[i].numberOfEmployees){
            companies[i].rankNumberOfEmployees = companies[i-1].rankNumberOfEmployees;
          }else{
            companies[i].rankNumberOfEmployees= i+1;
          }
        }else{
          companies[i].rankNumberOfEmployees= i+1;
        }
      }
    
    }

    /*
    *Methode um eine bestimmte Firmeninstanz als Rückgabewert zu
    *bekommen; die Methode wird für die Detailansicht benötigt
    */
    getCompanyByName(name:string):Company{
      let company = new Company(
        'Nicht in Datenbank',
         'Diese Firma ist leider nicht in unserer Datenbank',
        'assets/logoPlatzhalter.png',
         0, 
         0,
         0,
         0,
         "keine Angabe"
       )
      for(let i=0; i < this.companies.length;  i++){
        if(this.companies[i].name === name){
          company = this.companies[i];
        }
      }
      return company;
    }
}
