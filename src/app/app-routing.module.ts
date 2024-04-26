import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DigidetallesComponent } from './digidetalles/digidetalles.component';
import { AuthGuard } from './guards/auth.guard'; // Importar la guardia de rutas

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }, // Aplicar la guardia de rutas a la ruta 'home'
  { path: '', component: LoginComponent },
  { path: 'detalles/:name', component: DigidetallesComponent, canActivate: [AuthGuard] } // Aplicar la guardia de rutas a la ruta 'detalles/:name'
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
