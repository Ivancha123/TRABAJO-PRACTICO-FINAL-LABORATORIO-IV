import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/pages/home/home.component';
import { RegisterComponent } from './core/pages/register/register.component';
import { AboutUsComponent } from './core/pages/about-us/about-us.component';
import { MoviesComponent } from './core/pages/movies/movies.component';
import { MovieComponent } from './core/pages/movie/movie.component';
import { PricesComponent } from './core/pages/prices/prices.component';
import { ContactUsComponent } from './core/pages/contact-us/contact-us.component';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { AdministratorComponent } from './core/pages/administrator/administrator.component';
import { UserProfileComponent } from './core/pages/user-profile/user-profile.component';
import { MyTicketsComponent } from './core/pages/my-tickets/my-tickets.component';
import { AddComboComponent } from './core/pages/administrator/events/add-combos/add-combo.component';
import { AddFunctionComponent } from './core/pages/administrator/events/add-function/add-function.component';
import { ListSeatComponent } from './core/pages/list-seats/list-seats.component';
import { AddCardComponent } from './core/pages/add-card/add-card.component';
import { AddTicketComponent } from './core/pages/add-ticket/add-ticket.component';
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
  path: "movie/:id",
  component: MovieComponent
},
{
  path: "prices",
  component: PricesComponent
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
  path: 'administrator/combo/edit/:id',
  component: AddComboComponent
},
{
  path: 'administrator/function/edit/:id',
  component: AddFunctionComponent
},
{
  path: 'movie/:id_movie/functionId/:id_function',
  component: ListSeatComponent
},
{
  path: 'movie/:id_movie/functionId/:id_function/seatId/:id_seat',
  component: AddCardComponent
},
{
  path: 'movie/:id_movie/functionId/:id_function/seatId/:id_seat/cardId/:id_card',
  component: AddTicketComponent
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