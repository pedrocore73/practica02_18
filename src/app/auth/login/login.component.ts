import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }

  sendCredenciales() {
    let credenciales = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    }
    this.authService.login(credenciales)
              .subscribe((res:any)=>{
                  this.router.navigate(['/inicio']);
                },(err:any)=>{
                  console.log(err);
                })
  }

}
