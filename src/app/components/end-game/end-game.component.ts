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
  public obteinedPoints: number;
  private pointsPercentage: string;
  public imgRoute: string;

  constructor() { }

  ngOnInit() {
    this.pointsPercentage = localStorage.getItem('gamePoints');

    if((parseFloat(this.pointsPercentage)) > 50){
      this.imgRoute = '../../../assets/PetHappy.gif';
    } else {
      this.imgRoute = '../../../assets/Pet.gif';
    }
    
    this.obteinedPoints = (JSON.parse(localStorage.getItem('data'))['points'])/100*parseFloat(this.pointsPercentage);
  }
}
