import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/core/interfaces/usuario.module';

@Component({
  selector: 'app-alta-usuario',
  templateUrl: './alta-usuario.component.html',
  styleUrls: ['./alta-usuario.component.css']
})
export class AltaUsuarioComponent implements OnInit {

  usuario: Usuario = {
    user: '',
    documento: '',
    born: new Date(),
    email: '',
    genre: 'Masculino',
    telefono: '',
  };
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      user: new FormControl(''),
      documento: new FormControl(''),
      born: new FormControl(''),
      email: new FormControl(''),
      genre: new FormControl('Masculino'),
      telefono: new FormControl('')
    });
  }

  ngOnInit() { }

  onSubmit() {
    console.log(this.usuario);
  }

  validateEmail(): boolean {
    const email = this.form.get('email')?.value;
    if (email === null) {
      return false;
    }

    const regex = /^[a-zA-Z0-9.!#%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(email);
  }
}