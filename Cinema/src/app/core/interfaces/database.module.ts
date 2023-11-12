import { Time } from '@angular/common';
import { Title } from '@angular/platform-browser';

export interface Person {
    id_person?: number;
    document?: string;
    user_name?: string;
    lastname?: string;
    born?: Date;
    genre?: string;
    phone?: string;
    email?: string;
};

export interface Movie {
    id?: number;
    title?: string;
    movie_status?: number;
};

export interface Combo {
    id?: number;
    description?: string;
    price?: number;
};

export interface Room {
    id?: number;
    name?: string;
    capacity?: number;
};

export interface Function {
    id?: number;
    date?: Date;
    hour?: Time;
    idRoom?: number;
    idMovie?: number;
    price?: number;
};

export interface Ticket {
    id?: number;
    idPerson?: number;
    idFunction?: number;
    idTransaction?: number;
};

export interface ComboTicket {
    id?: number;
    idTicket?: number;
    amount?: number;
};

export interface Seat {
    id?: number;
    idRoom?: number;
    letter?: string;
    number?: number;
};

export interface TicketSeat {
    idTicket?: number;
    idSeat?: number;
    
};