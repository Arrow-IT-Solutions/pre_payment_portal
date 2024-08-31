import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisaRoutingModule } from './visa.routing';
import { VisaComponent } from './visa/visa.component';
import { TranslateService } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgPrimeModule } from 'src/app/shared/ngprime.module';

@NgModule({
  declarations: [
    VisaComponent
  ],
  imports: [
    CommonModule,
    VisaRoutingModule,
    SharedModule,
    NgPrimeModule
  ]
})
export class VisaModule { }