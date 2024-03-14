import { Routes } from '@angular/router';
import {CertificatesPageComponent} from "./pages/certificates-page/certificates-page.component";

export const routes: Routes = [
  {path: 'certificates', component: CertificatesPageComponent},
  {path: '', redirectTo: '/certificates', pathMatch: 'full'}
];
