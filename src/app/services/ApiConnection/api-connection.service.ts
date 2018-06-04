import { Card } from './../../interfaces/Card';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { ITEMS_URL } from '../../app.constants';

@Injectable()
export class ApiConnectionService {

  constructor( private http: Http, private activatedRoute: ActivatedRoute ) {}

  getCredentials(){
    /*
    */
    this.activatedRoute.queryParams.subscribe(invite => {
      localStorage.setItem('invitation', invite["invitation"]);
      localStorage.setItem('validation', invite["validation"]);
    });
  }

  //getCards(){
    /*
    */
   /*let messageHeader = new Headers();
   messageHeader.append( 'Content-Type', 'application/json' );
   this.http.get(ITEMS_URL + localStorage.getItem('invitation'), {headers: messageHeader})
    .map(( response: Response) => {
      console.log(response);
    });
  }*/

  getCards(): Card[] {
    let cards: Card[] = [ 
      {
          "_id": "5b0d50f76790716289c7f90d",
          "time": 60,
          "clue": "Test",
          "solution": "Test",
          "letters": "Test",
          "imageURL": "/files/1527599350831-test.png",
          "publish": false
      },
      {
          "_id": "5b0d735e6790716289c7f90e",
          "time": 45,
          "clue": "Empresa cliente",
          "solution": "Centic",
          "letters": "CenticSa",
          "imageURL": "/files/1527608128329-centic.jpg",
          "publish": true
      },
      {
          "_id": "5b0d74606790716289c7f910",
          "time": 60,
          "clue": "Dominar el mundo",
          "solution": "tentaculo",
          "letters": "tentaculo",
          "imageURL": "/files/1527608396277-purple_tentacle.jpg",
          "publish": true
      },
      {
          "_id": "5b0d74c36790716289c7f911",
          "time": 60,
          "clue": "Universidad Católica",
          "solution": "UCAM",
          "letters": "UCAMCUI",
          "imageURL": "/files/1527608512007-ucam.png",
          "publish": true
      },
      {
          "_id": "5b0d751f6790716289c7f912",
          "time": 50,
          "clue": "Profesor de PIIS",
          "solution": "Joaquin",
          "letters": "Joaquin",
          "imageURL": "/files/1527608603908-joaquin.jpg",
          "publish": true
      }
  ];
  return cards;
  }
}
