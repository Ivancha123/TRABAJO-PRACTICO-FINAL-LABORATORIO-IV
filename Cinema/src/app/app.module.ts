import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/shared/header/header.component';
import { NavbarComponent } from './core/shared/navbar/navbar.component';
import { ContentComponent } from './core/shared/content/content.component';
import { HomeComponent } from './core/pages/home/home.component';
import { RegisterComponent } from './core/pages/register/register.component';
import { AboutUsComponent } from './core/pages/about-us/about-us.component';
import { MoviesComponent } from './core/pages/movies/movies.component';
import { PricesComponent } from './core/pages/prices/prices.component';
import { ContactUsComponent } from './core/pages/contact-us/contact-us.component';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { LoginComponent } from './core/shared/login/login.component';
import { FullBodyComponent } from './core/shared/full-body/full-body.component';
import { HomeSliderComponent } from './core/pages/component/home-slider/home-slider.component';
import { MovieCardComponent } from './core/pages/component/movie-card/movie-card.component';
import { MovieComponent } from './core/pages/movie/movie.component';
import { PosterGridComponent } from './core/pages/component/poster-grid/poster-grid.component';


import { SeatFormComponent } from './core/pages/administrator/events/add-seats/add-seat.component';
import { AddRoomComponent } from './core/pages/administrator/events/add-rooms/add-room.component';
import { ListFunctionComponent } from './core/pages/administrator/events/list-function/list-function.component';

import { DataBaseService } from './core/services/database/database.service';

import { AdministratorComponent } from './core/pages/administrator/administrator.component';
import { RoomsComponent } from './core/pages/administrator/rooms/rooms.component';
import { FunctionsComponent } from './core/pages/administrator/functions/functions.component';
import { CombosComponent } from './core/pages/administrator/combos/combos.component';
import { StatisticsComponent } from './core/pages/administrator/statistics/statistics.component';
import { TicketsComponent } from './core/pages/administrator/tickets/tickets.component';
import { UsersComponent } from './core/pages/administrator/users/users.component';
import { AmoviesComponent } from './core/pages/administrator/amovies/amovies.component';
import { UserProfileComponent } from './core/pages/user-profile/user-profile.component';
import { MyTicketsComponent } from './core/pages/my-tickets/my-tickets.component';
import { AddFunctionComponent } from './core/pages/administrator/events/add-function/add-function.component';
import { ListMoviesComponent } from './core/pages/administrator/events/list-movies/list-movies.component';
import { AddComboComponent } from './core/pages/administrator/events/add-combos/add-combo.component';
import { ListComboComponent } from './core/pages/administrator/events/list-combos/list-combo.component';
import { ListPersonsComponent } from './core/pages/administrator/events/list-person/list-person.component';
import { AddMovieComponent } from './core/pages/administrator/events/add-movies/add-movie.component';
import { ListSeatComponent } from './core/pages/list-seats/list-seats.component';
import { AddCardComponent } from './core/pages/add-card/add-card.component';
import { AddTicketComponent } from './core/pages/add-ticket/add-ticket.component';
import { ListTicketComponent } from './core/pages/administrator/events/list-tickets/list-ticket.component';
import { AddCommentComponent } from './core/pages/add-comments/add-comment.component';
import { AddComboTicketComponent } from './core/pages/add-combos-tickets/add-combo-ticket.component';
import { SeatsComponent } from './core/pages/administrator/seats/seats.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    ContentComponent,
    HomeComponent,
    RegisterComponent,
    AboutUsComponent,
    MoviesComponent,
    PricesComponent,
    ContactUsComponent,
    ContactUsComponent,
    NotFoundComponent,
    LoginComponent,
    FullBodyComponent,
    HomeSliderComponent,
    MovieCardComponent,
    MovieComponent,
    AdministratorComponent,
    FunctionsComponent,
    CombosComponent,
    StatisticsComponent,
    TicketsComponent,
    UsersComponent,
    AmoviesComponent,
    UserProfileComponent,
    MyTicketsComponent,
    SeatFormComponent,
    AddRoomComponent,
    AddFunctionComponent,
    ListMoviesComponent,
    ListFunctionComponent,
    AddComboComponent,
    ListComboComponent,
    ListPersonsComponent,
    PosterGridComponent,
    AddMovieComponent,
    ListSeatComponent,
    AddCardComponent,
    AddTicketComponent,
    ListTicketComponent,
    AddCommentComponent,
    AddComboTicketComponent,
    RoomsComponent,
    SeatsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    DataBaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
