import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'
import { Cast, Credits, Movie, MovieDetails, MoviesResponse } from '../../interfaces/movies';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  //API EXAMPLE https://api.themoviedb.org/3/movie/550?api_key=567825f8ebb0876a212913ed63c81145 
  private urlApi = 'https://api.themoviedb.org/3/movie/550?api_key=567825f8ebb0876a212913ed63c81145';

  private serverAPI = 'https://api.themoviedb.org/3';
  private moviePage = 1;
  public onLoad = false;


  constructor(private http: HttpClient) { }

  get params() {
    return {
      api_key: '567825f8ebb0876a212913ed63c81145',
      language: 'en-US',
      page: this.moviePage.toString()
    }
  }

  getMovies(): Observable<Movie[]> {
    console.log('Loading');
    if (this.onLoad) {
      return of([]);
    }
    this.onLoad = true;
    return this.http.get<MoviesResponse>(`${this.serverAPI}/movie/now_playing`, { params: this.params }).pipe(
      map((res) => res.results),
      tap(() => {
        this.moviePage += 1;
        this.onLoad = false;
      })
    );
  }

  searchMovie(text: string): Observable<Movie[]> {
    const params = { ...this.params, page: 1, query: text };
    return this.http.get<MoviesResponse>(`${this.serverAPI}/search/movie`, {
      params
    }).pipe(
      map(res => res.results)
    )
  }

  getPeliculaDetalle(id: string) {

    return this.http.get<MovieDetails>(`${this.serverAPI}/movie/${id}`, {
      params: this.params
    }).pipe(
      catchError(err => of(null))
    )

  }
  public getMovieById(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.serverAPI}/movie/${id}?`, { params: this.params }).pipe(
      map((res) => res)
    );
  }

  getCast(id:string):Observable<Cast[]>{

    return this.http.get<Credits>(`${this.serverAPI}/movie/${id}/credits`,{
      params:this.params
    }).pipe(
      map(res=> res.cast),
      catchError(err => of([]))
    );
  }
  resetMoviesPage(){
    this.moviePage =1;
  }

}
