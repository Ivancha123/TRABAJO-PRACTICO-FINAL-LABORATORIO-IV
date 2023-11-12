import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';




import { AppComponent } from './app.component';
import { HeaderComponent } from './core/shared/header/header.component';
import { NavbarComponent } from './core/shared/navbar/navbar.component';
import { ContentComponent } from './core/shared/content/content.component';
import { HomeComponent } from './core/pages/home/home.component';
import { RegisterComponent } from './core/pages/register/register.component';
import { AboutUsComponent } from './core/pages/about-us/about-us.component';
import { ComingSoonComponent } from './core/pages/coming-soon/coming-soon.component';
import { MoviesComponent } from './core/pages/movies/movies.component';
import { PricesComponent } from './core/pages/prices/prices.component';
import { ContactUsComponent } from './core/pages/contact-us/contact-us.component';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { LoginComponent } from './core/shared/dialog/login/login.component';
import { FullBodyComponent } from './core/shared/full-body/full-body.component';
import { HomeSliderComponent } from './core/pages/component/home-slider/home-slider.component';
import { MovieCardComponent } from './core/pages/component/movie-card/movie-card.component';
import { MovieComponent } from './core/pages/movie/movie.component';
import { AdministratorComponent } from './core/pages/administrator/administrator.component';
import { FunctionsComponent } from './core/pages/administrator/functions/functions.component';
import { CombosComponent } from './core/pages/administrator/combos/combos.component';
import { StatisticsComponent } from './core/pages/administrator/statistics/statistics.component';
import { TicketsComponent } from './core/pages/administrator/tickets/tickets.component';
import { UsersComponent } from './core/pages/administrator/users/users.component';
import { AmoviesComponent } from './core/pages/administrator/amovies/amovies.component';
import { UserProfileComponent } from './core/pages/user-profile/user-profile.component';
import { MyTicketsComponent } from './core/pages/my-tickets/my-tickets.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    ContentComponent,
    HomeComponent,
    RegisterComponent,
    AboutUsComponent,
    ComingSoonComponent,
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
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
