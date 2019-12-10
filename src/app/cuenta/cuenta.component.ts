import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss']
})
export class CuentaComponent implements OnInit {

  cuentaForm: FormGroup;
  imagen: string;

  constructor(private authService: AuthService,
              private ff: FormBuilder) { }

  ngOnInit() {
    this.loadUsuario();
    this.cuentaForm = this.ff.group({
      nombre: '',
      email: '',
      direccion: '',
      cp: '',
      localidad: ''
    });
  }

  loadUsuario() {
    this.authService.getUsuario()
            .subscribe((res:any)=>{
                this.cuentaForm.get('nombre').setValue(res.usuario.nombre);
                this.cuentaForm.get('email').setValue(res.usuario.email);
                this.cuentaForm.get('direccion').setValue(res.usuario.direccion);
                this.cuentaForm.get('cp').setValue(res.usuario.cp);
                this.cuentaForm.get('localidad').setValue(res.usuario.localidad);
                this.imagen = 'http://localhost:8080/imagenes/' + res.usuario.imagen;
              },(err:any)=>{
                console.log(err);
              })
  }

}
