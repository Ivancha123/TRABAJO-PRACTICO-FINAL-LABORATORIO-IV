import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AltaUsuarioComponent } from './pages/alta-usuario/alta-usuario.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { MovieComponent } from './pages/movies/movies.component';
import { PricesComponent } from './pages/prices/prices.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ComingSoonComponent } from './pages/coming-soon/coming-soon.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';

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
    path: "aboutUs",
    component: AboutUsComponent
  },
  {
    path: "movies",
    component: MovieComponent
  },
  {
    path: "prices",
    component: PricesComponent
  },
  {
    path: "shop",
    component: ShopComponent
  },
  {
    path: "comingSoon",
    component: ComingSoonComponent
  },
  {
    path: "contactUs",
    component: ContactUsComponent
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
