import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss']
})
export class CuentaComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loadUsuario();
  }

  loadUsuario() {
    this.authService.getUsuario()
            .subscribe((res:any)=>{
                console.log(res);
              },(err:any)=>{
                console.log(err);
              })
  }

}
