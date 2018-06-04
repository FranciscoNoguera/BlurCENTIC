import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';

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
    console.log("Invitación: ", localStorage.getItem('invitation'));
    console.log("Validación: ", localStorage.getItem('validation'));
  }

  getCards(){
    /*
    */
   let messageHeader = new Headers();
   messageHeader.append( 'Content-Type', 'application/json' );
  console.log("Comprobando invitation");
    //console.log(localStorage.getItem('invitation'));
  console.log('https://gameserver.centic.ovh/games/info/' + localStorage.getItem('invitation'));
   this.http.get('https://gameserver.centic.ovh/games/info/' + localStorage.getItem('invitation'), {headers: messageHeader})
    .map(( response: Response) => {
      console.log(response);
    });
  }
}
