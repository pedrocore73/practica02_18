import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @ViewChild('nav', {static: false}) navRef: ElementRef;
  subscripImagen: Subscription;
  imagen: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.subscripImagen = this.authService.isImagenIn
                                .subscribe((data)=>{
                                  this.imagen = 'http://localhost:8080/imagenes/' + data.imagen;
                                },(err)=>{
                                  console.log(err);
                                })
  }

  toggleMenu() {
    this.navRef.nativeElement.classList.toggle('open');
  }
}
