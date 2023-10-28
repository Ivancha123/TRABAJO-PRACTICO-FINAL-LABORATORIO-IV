import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AltaUsuarioComponent } from './pages/alta-usuario/alta-usuario.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "altaUsuario",
    component: AltaUsuarioComponent
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
