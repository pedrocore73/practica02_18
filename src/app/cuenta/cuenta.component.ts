import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss']
})
export class CuentaComponent implements OnInit {

  cuentaForm: FormGroup;
  imagen: any;
  imagenSrc: any;
  id: string;
  public uploader: FileUploader = new FileUploader({url: 'http://localhost:8080/imagenes'});

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
    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('imagen', this.imagen);
    }
  }

  loadUsuario() {
    this.authService.getUsuario()
            .subscribe((res:any)=>{
                this.id = res.usuario._id;
                this.cuentaForm.get('nombre').setValue(res.usuario.nombre);
                this.cuentaForm.get('email').setValue(res.usuario.email);
                this.cuentaForm.get('direccion').setValue(res.usuario.direccion);
                this.cuentaForm.get('cp').setValue(res.usuario.cp);
                this.cuentaForm.get('localidad').setValue(res.usuario.localidad);
                this.imagen = res.usuario.imagen;
                this.imagenSrc = 'http://localhost:8080/imagenes/' + res.usuario.imagen;
              },(err:any)=>{
                console.log(err);
              })
  }

  onFileSelected(event) {
    if(event.target.files.length > 0) {
      this.imagen = this.id + new Date().getTime() + '.' + event.target.files[0].name.split('.')[event.target.files[0].name.split('.').length -1];
      let file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ()=>{ this.imagenSrc = reader.result };
      reader.readAsDataURL(file);
    }
  }

  sendUser() {
    let user = {
      nombre: this.cuentaForm.get('nombre').value,
      direccion: this.cuentaForm.get('direccion').value,
      cp: this.cuentaForm.get('cp').value,
      localidad: this.cuentaForm.get('localidad').value,
      imagen: this.imagen,
    }
    this.authService.putUsuario(user)
                .subscribe((res:any)=>{
                    this.authService.setImagen(this.imagen);
                  },(err:any)=>{
                    console.log(err);
                  })
  }

}
