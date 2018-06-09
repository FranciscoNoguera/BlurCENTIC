/**
 * Este componente implementa la pantalla de instrucciones del juego
 * @author Francisco Noguera Fuentes
 * @author JUan Martinez Romero
 * @author Sergio Gil Sotos
 * @author Francisco Miguel López
 * @author Oleh Kuchma
 * @version 1.0
 */
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-instruction-page',
  templateUrl: './instruction-page.component.html',
  styleUrls: ['./instruction-page.component.css']
})
export class InstructionPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  reditectToMenu() {
    /*
    Esta función redirecciona a la página de inicio del juego.
    */
    this.router.navigateByUrl('home', {replaceUrl: true});
  }

}
