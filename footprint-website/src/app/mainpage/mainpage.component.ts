import { Component} from '@angular/core';
import { CookieService } from '../core/services/cookie.service';


@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent  {
  
  constructor(public cookieService:CookieService) {}

  /*
  *Diese Methode dient dem Setzen der Variablen notAccepted auf false und der 
  *Variablen allCookiesAccepted auf true. Beide Variablen gehören zum
  *CookieService.
  */
  cookiesAccept():void{
    this.cookieService.setNotAccepted();
    this.cookieService.setAllCookiesAccepted();
  }

}
