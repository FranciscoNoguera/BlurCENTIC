import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  imageEnlarge: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  imageSizeToggle() {
    if(this.imageEnlarge){
      this.imageEnlarge = false;
    } else {
      this.imageEnlarge = true;
    }
  }

}
