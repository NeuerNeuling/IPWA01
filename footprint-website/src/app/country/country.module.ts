import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountryStartComponent } from './country-start/country-start.component';
import { CountryDetailComponent } from './country-detail/country-detail.component';
import { CountryRoutingModule } from './country-routing.module';
import { CommonModule } from '@angular/common';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { CountryComponent } from './country.component';


@NgModule({
    declarations: [
        CountryStartComponent,
        CountryDetailComponent,
        CountryComponent
  ],
    imports: [
      FormsModule,
      ReactiveFormsModule,
      CountryRoutingModule,
      CommonModule,
      NgbTypeaheadModule,
    ]
  })
  export class CountryModule {}