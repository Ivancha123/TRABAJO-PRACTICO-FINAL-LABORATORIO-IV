import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Usuario {
  user: string;
  documento: string;
  born: Date;
  email: string;
  genre: string;
  telefono: string;
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class UsuarioModule { 

  
}

