import { Component, OnInit } from '@angular/core';

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
