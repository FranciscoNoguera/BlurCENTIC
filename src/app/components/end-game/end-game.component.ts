/**
 * Este componente implementa la pantalla de fin del juego
 * @author Francisco Noguera Fuentes
 * @author JUan Martinez Romero
 * @version 1.0
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-end-game',
  templateUrl: './end-game.component.html',
  styleUrls: ['./end-game.component.css']
})
export class EndGameComponent implements OnInit {
  public obteinedPoints: String;

  constructor() { }

  ngOnInit() {
    this.obteinedPoints = localStorage.getItem('gamePoints');
  }
}
