import { NgModule, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule, DecimalPipe } from '@angular/common';
import { CompanyService } from './services/company.service';
import { CountryService } from './services/country.service';
import { AppRoutingModule } from '../app-routing.module';




@NgModule({
    declarations: [
      HeaderComponent,
      FooterComponent,
      SidebarComponent,
    ],
    imports:[
      CommonModule,
      AppRoutingModule,
    ],
    exports:[
        HeaderComponent,
        FooterComponent,
        SidebarComponent,],
    providers: [
      CompanyService, 
      CountryService,
      DecimalPipe,
      ],
  })
  export class CoreModule {


  }
