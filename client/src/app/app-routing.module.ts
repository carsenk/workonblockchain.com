import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: '', component: HomeComponent},
  { path: '', loadChildren: './auth-module/auth-module.module#AuthModuleModule'},
  { path: '', loadChildren: './pages-module/pages-module.module#PagesModuleModule'},
  { path: '', loadChildren: './referral-module/referral-module.module#ReferralModuleModule'},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
