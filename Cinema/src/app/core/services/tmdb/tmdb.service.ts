import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Movie, MoviesResponse } from '../../interfaces/movies';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  //API EXAMPLE https://api.themoviedb.org/3/movie/550?api_key=567825f8ebb0876a212913ed63c81145 
  private urlApi = 'https://api.themoviedb.org/3/movie/550?api_key=567825f8ebb0876a212913ed63c81145';

  private serverAPI = 'https://api.themoviedb.org/3';
  private moviePage = 1;

  constructor(private http: HttpClient) {
  }

  get params() {
    return {
      api_key: '567825f8ebb0876a212913ed63c81145',
      language: 'en-US',
      page: this.moviePage.toString()
    }
  }

  public getMovies(): Observable<Movie[]> {
    return this.http.get<MoviesResponse>(`${this.serverAPI}/movie/now_playing?`, { params: this.params }).pipe(
      map((res) => res.results)
    );
  }
  public getMovieById(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.serverAPI}/movie/${id}?`, { params: this.params }).pipe(
      map((res) => res)
    );
  }

}
