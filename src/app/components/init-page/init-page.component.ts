/**
 * Este componente implementa la pantalla de inicio del juego
 * @author Francisco Noguera Fuentes
 * @author JUan Martinez Romero
 * @version 1.0
 */
import { Card } from './../../interfaces/Card';
import { ApiConnectionService } from './../../services/ApiConnection/api-connection.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-init-page',
  templateUrl: './init-page.component.html',
  styleUrls: ['./init-page.component.css']
})
export class InitPageComponent implements OnInit {
  public gameMode: string;

  constructor(private router: Router, private apiConnectionService: ApiConnectionService) { }

  ngOnInit() {
    this.apiConnectionService.getCredentials();
    
    this.apiConnectionService.getInfo().subscribe(info => {
      localStorage.setItem('data', JSON.stringify(info['data']));
      localStorage.setItem('cards', JSON.stringify(info['items']));
      localStorage.setItem('gameMode', info['config']['id']);
    });
    this.gameMode = localStorage.getItem('gameMode');
  }

  reditectToArcade() {
    /*
    Esta función redirecciona a la pantalla de juego.
    */
    localStorage.setItem('gameStarted', 'false');
    this.router.navigateByUrl('game', {replaceUrl: true});
  }

  reditectToInstruction() {
    /*
    Esta función redirecciona a las instrucciones de juego.
    */
    this.router.navigateByUrl('instruction');
  }

}
