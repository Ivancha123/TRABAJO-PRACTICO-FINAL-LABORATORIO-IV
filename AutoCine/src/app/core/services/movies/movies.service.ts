import { HttpClientModule, HttpClient, HttpHeaders  } from '@angular/common/http';
import { HttpModule  } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators'
import { Movie } from 'src/app/core/interfaces/movies.module' 

@Injectable({
  providedIn: 'root'
})


export class MoviesService {
    private apiUrl = "https://api.themoviedb.org/3/";
    private APIKEY='1a2cadbab89e8809ea7692aa2761d993'
    options={headers:new HttpHeaders({
      'X-RapidAPI-Key': '1a2cadbab89e8809ea7692aa2761d993'
    })}
    constructor(private http: HttpClient) { }

    getMovies(page:number):Observable<Movie[]>{
      let direction = this.apiUrl + "movie/changes?page=" + page;
      return this.http.get<Movie[]>(direction,this.options);
    }
  

}