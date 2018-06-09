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
    this.router.navigateByUrl('home', {replaceUrl: true});
  }

}
