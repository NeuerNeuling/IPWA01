import { Component, EventEmitter, Output, Input, OnInit, AfterViewInit } from '@angular/core';
//Für Scrolleffekt
import { ViewportScroller } from '@angular/common';
//Für Anchorchange
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { DirectionControlService } from '../core/services/directionControlService';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  //toggleStatusSidebar wird über die Elternkomponente gesteuert
  @Input() toggleStatusSidebar:boolean =false;
  //Die Elternkomponente hört auf das togglerEvent 
  @Output() togglerEvent: EventEmitter<boolean> = new  EventEmitter<boolean>();
  chevron: string = ">";
  page: string='mainpage';

  constructor(private viewportScroller: ViewportScroller, private activatedRoute:ActivatedRoute, private router:Router, private appComponent: AppComponent, private directionControlService:DirectionControlService) {}

  /*
  *Wird beim Drücken des Buttons ausgelöst. Die Methode ändert damit den Wert 
  *der toggleStatusSidebar Variablen indirekt
  */
  clickEvent():void{
      this.togglerEvent.emit();
      //Um keine Icons nutzen zu müssen wurde das normale Chevron verwendet
      this.toggleStatusSidebar ? this.chevron =">" :   this.chevron ="<";
  }
  
  //Für das Scrollen zu den Ankerelementen
  public onClick(elementId: string):void { 
      this.viewportScroller.scrollToAnchor(elementId);
  }

  ngOnInit() {
    this.getPage();
    //Um das richtige Chevron bei einer rtl-Sprache anzuzeigen
    if(this.directionControlService.textDirection ==="rtl"){
      this.chevron =">";
    }
    /*
    *Damit die Anker nur auf der aktuellen Unterseiten angezeigt werden, muss *page bei Seitenwechsel aktualisiert werden
    */
    this.router.events.subscribe(params => {
      this.getPage();
    })
      
  }

  /*
  *Diese Methode ermittelt die aktuelle Unterseite und speichert sie als Wert 
  *der Variablen page. Diese Variable dient dazu nur die Anker der aktuellen 
  *Unterseite in der Sidebar als Links darzustellen.
  */
  getPage():string
  {
    let url:string = this.router.url;
      if(url.includes('overview')){
        this.page = "overview";
      }
      /*
      *Damit die sidebar auch in der Detailansicht funktioniert wie *beabsichtigt muss sie über Country und Company in der Hierachie stehen
      */
      else if(url.includes('details')){
        this.page="details";
      }else if (url.includes('country')){
        this.page = "country";
      }else if(url.includes('company')){
        this.page = "company";
      }else if(url.includes('legal')){
        this.page="legal";
      }else if(url.includes('impressum')){
        this.page="impressum";
      }else{
        this.page = "mainpage";
      }
      return this.page;
  }


}
