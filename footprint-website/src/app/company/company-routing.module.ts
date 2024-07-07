import { RouterModule, Routes } from "@angular/router";
import { CompanyStartComponent } from "./company-start/company-start.component";
import { CompanyDetailComponent } from "./company-detail/company-detail.component";
import { NgModule } from "@angular/core";
import { CompanyComponent } from "./company.component";

const routes: Routes = [
    {
      path: '',
      component: CompanyComponent,
      children: [
      
        { path: '', 
        component: CompanyStartComponent },

        /*
        *name ist der Name der Firma, mit : wird angegeben, dass es sich *hierbei um einen Routeparameter mit Namen name handelt
        */
        {
          path: 'details/:name',
          component: CompanyDetailComponent,
        },
      ]
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class CompanyRoutingModule {}