import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class ApiConnectionService {

  constructor( private http: Http, private activatedRoute: ActivatedRoute ) {
    /*
    Comprobamos en el almacenamiento local que no hay credenciales previamente almacenados.
    En el caso de que no hayan almacenados, se obtienen del Api. 
    */
    if( localStorage.getItem('invitation') == "undefined" ){
      this.activatedRoute.queryParams.subscribe(
        invite => {
          localStorage.setItem('invitation', invite["invitation"]);
          localStorage.setItem('validation', invite["validation"]);
       })
    }
  }

  getImage(){
    /*
    */
   let messageHeader = new Headers();
   messageHeader.append( 'Content-Type', 'application/json' );
  }
}
