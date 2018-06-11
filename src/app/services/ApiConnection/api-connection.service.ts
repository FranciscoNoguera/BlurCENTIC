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
    /*
    Esta función recupera la información para el juego
    */
    let messageHeader = new Headers();
    messageHeader.append( 'Content-Type', 'application/json' );
    return this.http.get(ITEMS_URL + localStorage.getItem('invitation'), {headers: messageHeader})
    .map( response => response.json()).catch(this.handleErrors);
  }

  sendPoints(points: number){
    /*
    Esta función envía la puntuación obtenida al API
    */
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
