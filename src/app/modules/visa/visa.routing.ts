import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisaComponent } from './visa/visa.component';



const routes: Routes = [

  // {
  //   path: '',
  //   redirectTo: '/auth/login',
  //   pathMatch: 'full',
  // },
  {
    path: 'payment',
    component: VisaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisaRoutingModule {}
