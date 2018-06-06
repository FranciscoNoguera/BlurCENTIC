import { Card } from './../../interfaces/Card';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ITEMS_URL } from '../../app.constants';
import { SEND_POINTS_URL } from '../../app.constants';

@Injectable()
export class ApiConnectionService {

  constructor( private http: Http, private activatedRoute: ActivatedRoute ) {}

  getCredentials(){
    /*
    Esta función se utiliza para recuperar los parámetros invitation y validation de la url
    */
    this.activatedRoute.queryParams.subscribe(invite => {
      localStorage.setItem('invitation', invite["invitation"]);
      localStorage.setItem('validation', invite["validation"]);
    });
  }

  getInfo(){
    let messageHeader = new Headers();
    messageHeader.append( 'Content-Type', 'application/json' );
    this.http.get(ITEMS_URL + localStorage.getItem('invitation'), {headers: messageHeader})
    .map( response => response.json()).catch(this.handleErrors).subscribe(info => {
      localStorage.setItem('game', info['game']);
      localStorage.setItem('points', info['points']);
    });
  }

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

  sendPoints(points: number){
    let messageHeader = new Headers();
   messageHeader.append( 'Content-Type', 'application/json' );
    
    let message = {
      "validation": localStorage.getItem('validation'),
      "invitation": localStorage.getItem('invitation'),
      "percent": points,
      "title": "Puntos ganados",
      "resume": "Has ganado puntos con el juego del Blur",
      "message": "Como has jugado al juego del Blur has recibido puntos por ello"
    };

    this.http.post(SEND_POINTS_URL, JSON.stringify(message),{headers: messageHeader})
    .map(response => response.json()).catch(this.handleErrors).subscribe(info => {
      console.log(info);
    });
  }

  handleErrors(error: Response) {
    /*
    Esta función maneja los errores producidos durante la comunicación.
    */
    return Observable.throw(error);
  }
}
