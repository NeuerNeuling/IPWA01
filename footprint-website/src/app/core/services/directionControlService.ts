import { Injectable } from '@angular/core';


@Injectable({
  /*
  *Deklaration, dass dieser Service vom root application injector erzeugt 
  *werden soll, um diesen Service in der gesamten Applikation nutzen zu können
  */
  providedIn: 'root',
})

export class DirectionControlService {
    textDirection :string = "ltr";

    constructor(){
      this.checkDirection();
    }
  

    /*
    *Diese Methode ermittelt die Spracheinstellungen des Browers, überprüft *dann ob diese Sprachen in einem Array vorkommt, in welchem die Kürzel *aller rtl Sprachen enthalten sind, und setzt dann den Wert einer 
    *Variable textDirection auf "rtl" oder "ltr"    
    */
   
    checkDirection():void{
      const lang = navigator.language;
      const rtlLanguages:string[] = ["ar","dv", "ff", "he", "ku", "fa", "ur" ];
      (rtlLanguages.includes(lang))? this.textDirection ="rtl":this.textDirection ="ltr";
    }

}