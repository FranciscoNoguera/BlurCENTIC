import { ApiConnectionService } from './../../services/ApiConnection/api-connection.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-arcade-mode',
  templateUrl: './arcade-mode.component.html',
  styleUrls: ['./arcade-mode.component.css']
})
export class ArcadeModeComponent implements OnInit {
  private segundos: number;
  private isPaused: boolean;
  imageEnlarge: boolean = false;

  constructor(private apiConnectionService: ApiConnectionService) {
    this.segundos = 60;
    this.isPaused = false;
    setInterval(() => this.tick(), 1000);
  }

  ngOnInit() {
    this.apiConnectionService.getCredentials();
    this.apiConnectionService.getCards();
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

  imageSizeToggle() {
    if(this.imageEnlarge){
      this.imageEnlarge = false;
    } else {
      this.imageEnlarge = true;
    }
  }

}
