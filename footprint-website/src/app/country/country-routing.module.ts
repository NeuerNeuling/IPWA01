import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { CountryStartComponent } from "./country-start/country-start.component";
import { CountryDetailComponent } from "./country-detail/country-detail.component";
import { CountryComponent } from './country.component';


const routes: Routes = [
    {
      path: '',
      component: CountryComponent,

      children: [
        { 
          path: '', 
          component: CountryStartComponent 
        },
        /*
        *name ist der Name der Firma, mit : wird angegeben, dass es sich
        *hierbei um einen Routeparameter mit Namen name handelt
        */
        {
          path: 'details/:name',
          component: CountryDetailComponent,
        },
      ]
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class CountryRoutingModule {}