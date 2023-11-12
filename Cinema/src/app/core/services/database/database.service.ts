import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators'

import { Person } from 'src/app/core/interfaces/database.module' ;
import { Movie } from 'src/app/core/interfaces/database.module' ;
import { Combo } from 'src/app/core/interfaces/database.module' ;
import { Room } from 'src/app/core/interfaces/database.module' ;
import { Function } from 'src/app/core/interfaces/database.module' ;
import { Ticket } from 'src/app/core/interfaces/database.module' ;
import { ComboTicket } from 'src/app/core/interfaces/database.module' ;
import { Seat } from 'src/app/core/interfaces/database.module' ;
import { TicketSeat } from 'src/app/core/interfaces/database.module' ;


import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  //Person functions

  public getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.API_URI}/persons`).pipe(
      map((res)=>res)
    );

  /*public getMovies(): Observable<Movie[]> {
    return this.http.get<MoviesResponse>(`${this.serverAPI}/movie/now_playing?`, { params: this.params }).pipe(
      map((res) => res.results)
    );
  }*/

  getPerson(id: string) {
    return this.http.get(`${this.API_URI}/persons/${id}`);
  }

  deletePerson(id: string) {
    return this.http.delete(`${this.API_URI}/persons/${id}`);
  }

  /*
  saveGame(game: Person) {
    return this.http.post(`${this.API_URI}/games`, game);
  }

  updateGame(id: string|number, updatedGame: Person): Observable<Person> {
    return this.http.put(`${this.API_URI}/games/${id}`, updatedGame);
  }
*/
}
