
import { Injectable } from '@angular/core';


@Injectable({
    /*
    *Deklaration, dass dieser Service vom root application injector erzeugt 
    *werden soll, um diesen Service in der gesamten Applikation nutzen zu können
    */
    providedIn: 'root',
  })

/*
*Service für den simulierten Umgang mit Cookies. Der Service enthält 2 
*boole'sche Variablen für die De-/Aktivierung des Videos auf der mainpage und 
*die dazugehörigen getter- und setter-Methoden
*/

export class CookieService {
 
    private notAccepted:boolean =false;
    private allCookiesAccepted:boolean =false;

    setNotAccepted():void{
        this.notAccepted =!this.notAccepted;
    }

    setAllCookiesAccepted():void{
        this.allCookiesAccepted =!this.allCookiesAccepted;
    }

    getNotAccepted():boolean{
        return this.notAccepted;
    }

    getAllCookiesAccepted():boolean{
        return this.allCookiesAccepted;
    }
}


 