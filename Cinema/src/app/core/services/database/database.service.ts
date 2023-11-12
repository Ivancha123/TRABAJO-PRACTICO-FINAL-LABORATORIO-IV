import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getPersons() {
    return this.http.get(`${this.API_URI}/persons`);
  }

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
