import { NgModule } from '@angular/core';
import { LegalComponent } from './legal.component';
import { LegalRoutingModule } from './legal-routing.module';


@NgModule({
    declarations: [
    LegalComponent
  ],
    imports: [
      LegalRoutingModule
    ]
  })
  export class LegalModule {}