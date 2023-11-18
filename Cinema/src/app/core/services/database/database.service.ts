import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

import { Person, PersonResponse } from 'src/app/core/interfaces/database.module' ;
import { xMovie } from 'src/app/core/interfaces/database.module' ;
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

  public getPersons() : Observable<Person[]> {
    return this.http.get<Person[]>(`${this.API_URI}/persons`);
  }

  getPerson(id: string) {
    return this.http.get(`${this.API_URI}/persons/${id}`);
  }

  deletePerson(id: number|undefined) {
    return this.http.delete(`${this.API_URI}/persons/${id}`);
  }

  savePerson(person: Person): Observable<Person> {
    return this.http.post<Person>(`${this.API_URI}/persons`, person);
  }

  updatePerson(id: string|number, updatedPerson: Person): Observable<Person> {
    return this.http.put<Person>(`${this.API_URI}/persons/${id}`, updatedPerson);
  }

  //Movie Functions

  public getMovies() : Observable<xMovie[]> {
    return this.http.get<xMovie[]>(`${this.API_URI}/movies`);
  }

  getMovie(id: string) {
    return this.http.get(`${this.API_URI}/movies/${id}`);
  }

  deleteMovie(id: number|undefined) {
    return this.http.delete(`${this.API_URI}/movies/${id}`);
  }

  saveMovie(movie: xMovie) {
    return this.http.post(`${this.API_URI}/movies`, movie);
  }

  updateMovie(id: string|number, updatedMovie: xMovie) {
    this.http.put(`${this.API_URI}/movies/${id}`, updatedMovie);
  }

  //Combo Functions

  public getCombos() : Observable<Combo[]> {
    return this.http.get<Combo[]>(`${this.API_URI}/combos`);
  }

  getCombo(id: string) {
    return this.http.get(`${this.API_URI}/combos/${id}`);
  }

  deleteCombo(id: number|undefined) {
    return this.http.delete(`${this.API_URI}/combos/${id}`);
  }

  saveCombo(combo: Combo) {
    return this.http.post(`${this.API_URI}/combos`, combo);
  }

  updateCombo(id: string|number, updatedCombo: Combo): Observable<Combo> {
    return this.http.put<Combo>(`${this.API_URI}/combos/${id}`, updatedCombo);
  }

  //Room Functions

  getRooms() : Observable<Room[]> {
    return this.http.get<Room[]>(`${this.API_URI}/rooms`);
  }

  getRoom(id: string) {
    return this.http.get(`${this.API_URI}/rooms/${id}`);
  }

  deleteRoom(id: number|undefined) {
    return this.http.delete(`${this.API_URI}/rooms/${id}`);
  }

  saveRoom(room: Room) {
    return this.http.post(`${this.API_URI}/rooms`, room);
  }

  updateRoom(id: string|number, updatedRoom: Room): Observable<Room> {
    return this.http.put(`${this.API_URI}/rooms/${id}`, updatedRoom);
  }

  //Function Functions

  public getFunctions() : Observable<Function[]> {
    return this.http.get<Function[]>(`${this.API_URI}/functions`);
  }

  getFunction(id: string) {
    return this.http.get(`${this.API_URI}/functions/${id}`);
  }
  public getFunctionByMovie(id: string) : Observable<Function[]>{
    return this.http.get<Function[]>(`${this.API_URI}/functions/${id}`);
  }

  deleteFunction(id: number|undefined) {
    return this.http.delete(`${this.API_URI}/functions/${id}`);
  }

  saveFunction(functions: Function) {
    return this.http.post(`${this.API_URI}/functions`, functions);
  }

  updateFunction(id: string|number, updatedFunction: Function): Observable<Function> {
    return this.http.put(`${this.API_URI}/functions/${id}`, updatedFunction);
  }

  //Ticket Functions

  getTickets() {
    return this.http.get(`${this.API_URI}/tickets`);
  }

  getTicket(id: string) {
    return this.http.get(`${this.API_URI}/tickets/${id}`);
  }

  deleteTicket(id: number|undefined) {
    return this.http.delete(`${this.API_URI}/tickets/${id}`);
  }

  saveTicket(ticket: Ticket) {
    return this.http.post(`${this.API_URI}/tickets`, ticket);
  }

  updateTicket(id: string|number, updatedTicket: Ticket): Observable<Ticket> {
    return this.http.put(`${this.API_URI}/tickets/${id}`, updatedTicket);
  }

  //ComboTicket Functions

  getComboTickets() {
    return this.http.get(`${this.API_URI}/combos-tickets`);
  }

  getComboTicket(id: string) {
    return this.http.get(`${this.API_URI}/combos-tickets/${id}`);
  }

  deleteComboTicket(id: number|undefined) {
    return this.http.delete(`${this.API_URI}/combos-tickets/${id}`);
  }

  saveComboTicket(comboTicket: ComboTicket) {
    return this.http.post(`${this.API_URI}/combos-tickets`, comboTicket);
  }

  updateComboTicket(id: string|number, updatedComboTicket: ComboTicket): Observable<ComboTicket> {
    return this.http.put(`${this.API_URI}/combos-tickets/${id}`, updatedComboTicket);
  }

  //Seat Functions

  getSeats() {
    return this.http.get(`${this.API_URI}/seats`);
  }

  getSeat(id: string) {
    return this.http.get(`${this.API_URI}/seats/${id}`);
  }

  deleteSeat(id: number|undefined) {
    return this.http.delete(`${this.API_URI}/seats/${id}`);
  }

  saveSeat(seats: Seat) {
    return this.http.post(`${this.API_URI}/seats`, seats);
  }

  updateSeat(id: string|number, updatedSeat: Seat): Observable<Seat> {
    return this.http.put(`${this.API_URI}/seats/${id}`, updatedSeat);
  }

  //TicketSeat Functions

  getTicketSeats() {
    return this.http.get(`${this.API_URI}/tickets-seats`);
  }

  getTicketSeat(id: string) {
    return this.http.get(`${this.API_URI}/tickets-seats/${id}`);
  }

  deleteTicketSeat(id: number|undefined) {
    return this.http.delete(`${this.API_URI}/tickets-seats/${id}`);
  }

  saveTicketSeat(ticketSeats: TicketSeat) {
    return this.http.post(`${this.API_URI}/tickets-seats`, ticketSeats);
  }

  updateTicketSeat(id: string|number, updatedTicketSeat: TicketSeat): Observable<TicketSeat> {
    return this.http.put(`${this.API_URI}/tickets-seats/${id}`, updatedTicketSeat);
  }
}



