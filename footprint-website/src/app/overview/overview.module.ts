import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OverviewStartComponent } from './overview-start/overview-start.component';
import { CommonModule } from '@angular/common';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { OverviewRoutingModule } from './overview-routing.module';
import { OverviewComponent } from './overview.component';



@NgModule({
    declarations: [
      OverviewStartComponent,
      OverviewComponent
    ],
    imports: [
      ReactiveFormsModule,
      CommonModule,
      NgbTypeaheadModule,
      FormsModule,
      OverviewRoutingModule,
      RouterModule,
      RouterModule.forChild([
        { path: '', component: OverviewStartComponent},
      ])
    ]
  })
  export class OverviewModule{
  }