import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-mode',
  templateUrl: './game-mode.component.html',
  styleUrls: ['./game-mode.component.css']
})
export class GameModeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  gameArcade(){
    localStorage.setItem('gameMode', 'Arcade');
    this.router.navigateByUrl('game')
  }

  gameParty(){
    localStorage.setItem('gameMode', 'Party');
    this.router.navigateByUrl('game')
  }

  gameSurvival(){
    localStorage.setItem('gameMode', 'Survival');
    this.router.navigateByUrl('game')
  }

}
