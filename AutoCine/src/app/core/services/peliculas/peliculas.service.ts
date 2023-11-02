import { HttpClient  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators'
import { Movie, PeliculasResponse } from 'src/app/core/interfaces/peliculas.module' 

@Injectable({
  providedIn: 'root'
}
)
export class PeliculasService {

  private baseUrl = 'https://api.themoviedb.org/3/';

  constructor(private http:HttpClient) { }

  get params(){
    return{
      api_key:'1a2cadbab89e8809ea7692aa2761d993',
      laguaje:'es-ES'
    }
  }

  getPeliculas():Observable<Movie[]>{
    return this.http.get<PeliculasResponse>(`${this.baseUrl}/movie/now_playing`,{params:this.params}).pipe(
      map((res)=>res.results))
  }

}