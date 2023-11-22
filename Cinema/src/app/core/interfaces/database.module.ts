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

export interface PersonResponse {
    results: Person[];
};

export interface xMovie {
    id_movie: number;
    title: string;
    movie_status: number;
};

export interface Combo {
    id_combo?: number;
    combo_description?: string;
    price?: number;
};

export interface Room {
    id_room?: number;
    room_name?: string;
    capacity?: number;
};

export interface Function {
    id_function?: number;
    function_date?: Date;
    function_hour?: Time;
    id_room?: number;
    id_movie?: number;
    price?: number;
};

export interface Card {
    id_card?: number;
    number?: number;
    id_person?: number;
};

export interface Seat {
    id_seat?: number;
    id_Room?: number;
    seat_letter?: string;
    seat_number?: number;
};

export interface Ticket {
    id_ticket?: number;
    id_person?: number;
    id_function?: number;
    id_card?: number;
    id_seat?: number;
    mount?: number;

};

export interface ComboTicket {
    id_combo?: number;
    id_ticket?: number;
    amount?: number;
};




