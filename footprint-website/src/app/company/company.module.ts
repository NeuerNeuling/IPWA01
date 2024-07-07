import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CompanyStartComponent } from './company-start/company-start.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { CompanyRoutingModule } from './company-routing.module';
import { CommonModule } from '@angular/common';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { CompanyComponent } from './company.component';



@NgModule({
    declarations: [  
    CompanyStartComponent, 
    CompanyDetailComponent, CompanyComponent
  ],
    imports: [
      FormsModule,
      CompanyRoutingModule,
      CommonModule,
      ReactiveFormsModule,
      NgbTypeaheadModule
    ]
  })
  export class CompanyModule {}