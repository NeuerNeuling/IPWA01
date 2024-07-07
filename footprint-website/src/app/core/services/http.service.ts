import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CompanyService } from "./company.service";



@Injectable({ 
    /*
    *Deklaration, dass dieser Service vom root application injector erzeugt 
    *werden soll, um diesen Service in der gesamten Applikation nutzen zu können
    */
    providedIn:'root'
})
export class HttpService{

    private companyUrl: string = 'assets/company.json';
    private countryUrl: string = 'assets/country.json';

    constructor(private http:HttpClient, private companyService:CompanyService){}

    /*
    *Diese Methoden fragen die Daten der JSON-Dateien im asset Ordner an und
    *stellen diese als Observable zur Verfügung, welches die Daten bei Erhalt 
    *der Antwort emittiert
    */

    getCompany():any{
        return this.http.get(this.companyUrl);
    }

    getCountry():any{
        return this.http.get(this.countryUrl);
    }

}
