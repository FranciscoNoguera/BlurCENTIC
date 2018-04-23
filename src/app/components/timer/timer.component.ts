import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {


  private segundos: number;
  private isPaused: boolean;

  constructor() {
    this.segundos = 60;
    this.isPaused = false;
    setInterval(() => this.tick(), 1000);
  }

  private tick(): void {
    if(this.isPaused == false){
      if(this.segundos > 0){
        --this.segundos
      } else{ this.togglePause }

    }
  }
  togglePause(): void {
    this.isPaused = !this.isPaused;
  }

  ngOnInit() {
  }

}
