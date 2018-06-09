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

  constructor(private router: Router, private apiConnectionService: ApiConnectionService) { }

  ngOnInit() {
    this.apiConnectionService.getCredentials();
    
    this.apiConnectionService.getInfo().subscribe(info => {
      localStorage.setItem('data', JSON.stringify(info['data']));
      localStorage.setItem('cards', JSON.stringify(info['items']));
      localStorage.setItem('gameMode', info['config']['id']);
    });
  }

  reditectToArcade() {
    localStorage.setItem('gameStarted', 'false');
    this.router.navigateByUrl('game', {replaceUrl: true});
  }

  reditectToInstruction() {
    this.router.navigateByUrl('instruction');
  }

}
