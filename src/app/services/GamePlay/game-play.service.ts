import { Card } from './../../interfaces/Card';
import { Injectable } from '@angular/core';

@Injectable()
export class GamePlayService {

  cards: Card[] = [];

  constructor() { }

}
