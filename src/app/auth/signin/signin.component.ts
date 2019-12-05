import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { ValidatePass } from '../../validators/checkpass.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;
  mensaje: string;
  showMensaje = false;

  constructor(private authService: AuthService,
              private ff: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.signinForm = this.ff.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{4,64}$')]],
      checkpass: ['', [Validators.required]]
    }, {validator: ValidatePass})
  }

  sendUsuario() {
    this.showMensaje = false;
    let usuario = {
      nombre: this.signinForm.get('nombre').value,
      email: this.signinForm.get('email').value,
      password: this.signinForm.get('password').value
    }
    this.authService.postUsuario(usuario)
                .subscribe((res:any)=>{
                    this.router.navigate(['/']);
                  },(err:any)=>{
                    console.log(err);
                  })
  }

  checkValidation() {
    this.showMensaje = true;
    if (this.signinForm.controls.nombre.invalid) {
      this.mensaje = 'Introduzca un nombre y apellidos';
    } else if (this.signinForm.controls.email.invalid) {
      this.mensaje = 'Introduzca un correo electrónico válido';
    } else if (this.signinForm.controls.password.invalid) {
      this.mensaje = 'La contraseña debe tener más de 4 caracteres y al menos una mayúscula, una minúscula y un número';
    } else if (this.signinForm.controls.checkpass.invalid) { 
      this.mensaje = 'Reescriba la contraseña por favor'
    } else if(this.signinForm.invalid) {
      this.mensaje = 'Las contraseñas no coinciden';
    } 
  }

}
