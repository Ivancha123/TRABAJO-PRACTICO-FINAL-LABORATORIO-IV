import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Card, Person, PersonResponse, Comment, FunctionFormat, CommentFormat } from 'src/app/core/interfaces/database.module' ;
import { xMovie } from 'src/app/core/interfaces/database.module' ;
import { Combo } from 'src/app/core/interfaces/database.module' ;
import { Room } from 'src/app/core/interfaces/database.module' ;
import { Function } from 'src/app/core/interfaces/database.module' ;
import { Ticket } from 'src/app/core/interfaces/database.module' ;
import { ComboTicket } from 'src/app/core/interfaces/database.module' ;
import { Seat } from 'src/app/core/interfaces/database.module' ;

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

  getPerson(id: string|undefined) {
    return this.http.get(`${this.API_URI}/persons/${id}`);
  }

  getPersonForEmail(email: string|undefined) {
    return this.http.get(`${this.API_URI}/persons/login/${email}`);
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

  getMovie(id: string|undefined): Observable<xMovie> {
    return this.http.get<xMovie>(`${this.API_URI}/movies/${id}`);
  }

  deleteMovie(id: number|undefined) {
    return this.http.delete(`${this.API_URI}/movies/${id}`);
  }

  saveMovie(movie: xMovie) {
    return this.http.post(`${this.API_URI}/movies`, movie);
  }

  updateMovie(id: string|number, updatedMovie: xMovie) : Observable<xMovie>{
    return this.http.put<xMovie>(`${this.API_URI}/movies/${id}`, updatedMovie);
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

  getRoom(id: string|undefined) {
    return this.http.get(`${this.API_URI}/rooms/${id}`);
  }

  getRoomForName(id: string){
    return this.http.get(`${this.API_URI}/rooms/name/${id}`)
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
  getFunctionFormat() : Observable<FunctionFormat[]> {
    return this.http.get<FunctionFormat[]>(`${this.API_URI}/functions/format`);
  }

  getFunction(id: string) {
    return this.http.get(`${this.API_URI}/functions/${id}`);
  }
  getFunctionByMovie(id: string): Observable<Function[]>{
    return this.http.get<Function[]>(`${this.API_URI}/functions/movie/${id}`);
  }

  deleteFunction(id: number|undefined) {
    return this.http.delete(`${this.API_URI}/functions/${id}`);
  }

  saveFunction(functions: Function) {
    return this.http.post(`${this.API_URI}/functions`, functions);
  }

  updateFunction(id: string|number, updatedFunction: Function): Observable<Function> {
    return this.http.put<Function>(`${this.API_URI}/functions/${id}`, updatedFunction);
  }

  //Ticket Functions

  getTickets() : Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.API_URI}/tickets`);
  }

  getTicketsFormat() : Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.API_URI}/tickets/format`);
  }

  getTicketsFormatByUser(id: string|null) : Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.API_URI}/tickets/user/${id}`);
  }

  getTicketsFormatComboByUser(id: string|null) : Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.API_URI}/tickets/combo/user/${id}`);
  }

  getTicket(id: string | null) {
    return this.http.get(`${this.API_URI}/tickets/${id}`);
  }

  getTicketForFunctionId(id: number|undefined) {
    return this.http.get(`${this.API_URI}/tickets/function/${id}`);
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

  getSeats() : Observable<Seat[]>{
    return this.http.get<Seat[]>(`${this.API_URI}/seats`);
  }

  getSeat(id: string) {
    return this.http.get(`${this.API_URI}/seats/${id}`);
  }

  getSeatForRoom(id: string|undefined): Observable<Seat[]>{
    return this.http.get<Seat[]>(`${this.API_URI}/seats/room/${id}`);
  }
  getSeatForRoom2(id: string|undefined): Observable<Seat[]>{
    return this.http.get<Seat[]>(`${this.API_URI}/seats/room2/${id}`);
  }

  deleteSeat(id: number|undefined) {
    return this.http.delete(`${this.API_URI}/seats/${id}`);
  }

  saveSeat(seats: Seat) {
    return this.http.post(`${this.API_URI}/seats`, seats);
  }

  updateSeat(id: number | undefined, updatedSeat: Seat): Observable<Seat> {
    return this.http.put(`${this.API_URI}/seats/${id}`, updatedSeat);
  }

  //Card Functions

  public getCards() : Observable<Card[]> {
    return this.http.get<Card[]>(`${this.API_URI}/cards`);
  }

  getCard(id: string|undefined): Observable<Card> {
    return this.http.get<Card>(`${this.API_URI}/cards/${id}`);
  }

  getCardForUserId(id: string|null): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.API_URI}/cards/userId/${id}`);
  }

  getCardForNumber(number: string|null): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.API_URI}/cards/number/${number}`);
  }
  

  deleteCard(id: number|undefined) {
    return this.http.delete(`${this.API_URI}/cards/${id}`);
  }

  saveCard(card: Card) {
    return this.http.post(`${this.API_URI}/cards`, card);
  }

  updateCard(id: string|number, updatedCard: Card) {
    this.http.put(`${this.API_URI}/cards/${id}`, updatedCard);
  }

  //Comment Functions

  public getComments() : Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.API_URI}/comments`);
  }

  getComment(id: string) {
    return this.http.get(`${this.API_URI}/comments/${id}`);
  }
  getCommentByMovie(id: string): Observable<CommentFormat[]>{
    return this.http.get<CommentFormat[]>(`${this.API_URI}/comments/movie/${id}`);
  }

  deleteComment(id: number|undefined) {
    return this.http.delete(`${this.API_URI}/comments/${id}`);
  }

  saveComment(comments: Comment) {
    return this.http.post(`${this.API_URI}/comments`, comments);
  }

  updateComment(id: string|number, updatedComment: Comment): Observable<Comment> {
    return this.http.put<Comment>(`${this.API_URI}/comments/${id}`, updatedComment);
  }

}



