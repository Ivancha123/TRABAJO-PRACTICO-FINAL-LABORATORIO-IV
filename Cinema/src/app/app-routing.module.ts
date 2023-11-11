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
import { PersonsListComponent } from './core/pages/persons-list/persons-list.component';
import { PersonFormComponent } from './core/pages/persons-add/persons-add.component';

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
  path: "persons",
  component: PersonsListComponent
},
{
  path: 'persons/add',
  component: PersonFormComponent
},
{
  path: 'persons/edit/:id',
  component: PersonFormComponent
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