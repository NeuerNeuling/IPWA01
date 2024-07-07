import { AfterContentInit, Component, HostListener, OnInit} from '@angular/core';
import { DirectionControlService } from './core/services/directionControlService';
import { CookieService } from './core/services/cookie.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentInit {
  //Titel der Website
  title = 'footprint-website';
  //Gibt an ob die Sidebar ein- oder ausgeklappt ist
  toggleStatus: boolean=false;
  //Gibt an ob die Website in der Mobile-Ansicht angezeigt wird
  isMobile:boolean = false;



  constructor(public directionControlService:DirectionControlService,
    public cookieService:CookieService){
  }


  ngOnInit(){
    this.toggleStatus=false;
    
   (window.innerWidth <= 600) ? this.isMobile =true : this.isMobile =false;
  }

  //Fail-safe
  ngAfterContentInit() {
    this.toggleStatus =false;
  }

 /*
 *Wird der Mobile Modus des Browers nachträglich aktiviert, wird die isMobile 
 *Variable geändert; erleichtert das Testen
 */ 
 @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    (event.target.innerWidth <= 600) ? this.isMobile =true : this.isMobile =false;
  }
 

}
