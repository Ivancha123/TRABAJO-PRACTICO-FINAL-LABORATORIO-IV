import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';



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
import { PersonsListComponent } from './core/pages/persons-list/persons-list.component';
import { PersonFormComponent } from './core/pages/persons-add/persons-add.component';

import { DataBaseService } from './core/services/database/database.service';


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
    PersonsListComponent,
    PersonFormComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [
    DataBaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
