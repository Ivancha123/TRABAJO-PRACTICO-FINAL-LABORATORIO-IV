import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>('/users');
  }

  getUser(id: number): Observable<any> {
    return this.http.get<any>('/users/' + id);
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>('/users', user);
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put<any>('/users/' + id, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>('/users/' + id);
  }

}
