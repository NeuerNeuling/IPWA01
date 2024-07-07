import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { OverviewStartComponent } from "./overview-start/overview-start.component";
import { OverviewComponent } from "./overview.component";

const routes: Routes = [
    {
      path: '',
      component: OverviewComponent,
      children: [
        { path: '', component: OverviewStartComponent},
      ]
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class OverviewRoutingModule {
    
  }