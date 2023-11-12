import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/pages/home/home.component';
import { RegisterComponent } from './core/pages/register/register.component';
import { AboutUsComponent } from './core/pages/about-us/about-us.component';
import { MoviesComponent } from './core/pages/movies/movies.component';
import { PricesComponent } from './core/pages/prices/prices.component';
import { ComingSoonComponent } from './core/pages/coming-soon/coming-soon.component';
import { ContactUsComponent } from './core/pages/contact-us/contact-us.component';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { AdministratorComponent } from './core/pages/administrator/administrator.component';
import { UserProfileComponent } from './core/pages/user-profile/user-profile.component';
import { MyTicketsComponent } from './core/pages/my-tickets/my-tickets.component';

const routes: Routes = [  {
  path: "",
  component: HomeComponent
},
{
  path: "home",
  component: HomeComponent
},
{
  path: "register",
  component: RegisterComponent
},
{
  path: "about-us",
  component: AboutUsComponent
},
{
  path: "movies",
  component: MoviesComponent
},
{
  path: "prices",
  component: PricesComponent
},
{
  path: "coming-soon",
  component: ComingSoonComponent
},
{
  path: "contact-us",
  component: ContactUsComponent
},
{
  path: "user-profile",
  component: UserProfileComponent
},
{
  path: "administrator",
  component: AdministratorComponent
},
{
  path: "my-tickets",
  component: MyTicketsComponent
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