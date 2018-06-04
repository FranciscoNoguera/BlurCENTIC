import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-init-page',
  templateUrl: './init-page.component.html',
  styleUrls: ['./init-page.component.css']
})
export class InitPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  reditectToArcade(){
    this.router.navigateByUrl('init');
  }

}
