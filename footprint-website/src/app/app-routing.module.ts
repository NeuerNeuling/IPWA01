import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainpageComponent } from './mainpage/mainpage.component';
import { CountryRouteResolver } from './resolvers/country.route.resolver';
import { CompanyRouteResolver } from './resolvers/company.route.resolver';
import { OverviewRouteResolver } from './resolvers/overview.route.resolver';



 
const routes: Routes = [
  { 
    //bei Besuch der Website über die URL der Website wird man zur mainpage weitergeleitet
    path: "", 
    redirectTo: "/mainpage", 
    pathMatch: "full" 
  },
  {
    path:"mainpage",
    //
    component:MainpageComponent
  },
  { 
    path: "country", 
    /*
    *CountryModule ist ein lazy-loaded Module, daher sind die dazugehörigen 
    *routes im country-routing.module.ts deklariert.
    */
   loadChildren: () =>
    import("./country/country.module").then(m => m.CountryModule),
    /*
    *Der Router wartet dank dem Resolver bis die benötigten Daten abgerufen
    *sind, bevor die route aktiviert wird
    */
    resolve: {
      countryRouteResolver: CountryRouteResolver
    },
  },
  { 
    path: "company", 
    //lazy-loaded Module
    loadChildren: () =>
    import("./company/company.module").then(m => m.CompanyModule),
    resolve: {
      companyRouteResolver: CompanyRouteResolver
    },
  },
  {
  path: "overview",
  //lazy-loaded Module
  loadChildren: () =>
    import("./overview/overview.module").then(m => m.OverviewModule),
    resolve: {
      overviewRouteResolver: OverviewRouteResolver
    },
  }, 
  {
    path:"impressum",
    //lazy-loaded Module
    loadChildren: () =>
    import("./impressum/impressum.module").then(m => m.ImpressumModule)
  },
  {
    path:"legal",
    //lazy-loaded Module
    loadChildren: () =>
    import("./legal/legal.module").then(m => m.LegalModule)
  },

  { 
    /*
    *Falls der Nutzer eine falsche URL eingibt wird er zur Mainpage 
    *weitergeleitet
    */
    path: "**",
    redirectTo: "/mainpage",
  }
];


@NgModule({
  /*scrollPositionRestoration ist enabled um beim Wechsel auf Unterseiten die
  *Scrollposition zurückzusetzen
  */
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled', anchorScrolling: 'disabled'})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
