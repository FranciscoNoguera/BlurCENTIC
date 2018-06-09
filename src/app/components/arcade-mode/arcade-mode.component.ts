import { BASE_URL } from './../../app.constants';
import { Card } from './../../interfaces/Card';
import { ApiConnectionService } from './../../services/ApiConnection/api-connection.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-arcade-mode',
  templateUrl: './arcade-mode.component.html',
  styleUrls: ['./arcade-mode.component.css']
})
export class ArcadeModeComponent implements OnInit {
  //Variables del cronómetro
  private segundos: number;
  private isPaused: boolean;
  
  //Variables del tamaño de la imágen
  public imageEnlarge: boolean = false;

  //Variables del modo de juego
  private gameMode: string;

  //Variables de la tarjeta
  private cards: Card[] = [];
  private positionCard: number = 0;
  private gameTime: number;
  public gameImage: string;
  public gameClue: string;
  private gameSolution: string;
  public arraySolution: string[];
  public arrayKeyboard: string[];

  //Variables del teclado
  public keyboardAux: string = '';

  //Variables de la pista
  public displayClue: boolean = false;

  //Variables del nivel de difuminado
  public blurLevel: number = 0;

  //Variables de la puntuación
  private totalPoints: number = 0;
  private cardPoints: number = 0;
  private maxPoints: number = 0;

  constructor(private apiConnectionService: ApiConnectionService, private router: Router) {
    setInterval(() => this.tick(), 1000);
  }

  ngOnInit(){
    for(var i=0; i<(JSON.parse(localStorage.getItem('cards'))).length; i++){
      this.cards[i] = JSON.parse(localStorage.getItem('cards'))[i];
    }
    this.gameMode = localStorage.getItem('gameMode');

    if(localStorage.getItem('gameStarted') == 'true'){ 
      this.maxPoints = parseInt(localStorage.getItem('maxPoints'));
      this.totalPoints = parseInt(localStorage.getItem('totalPoints'));
      this.positionCard = parseInt(localStorage.getItem('positionCard'));
      this.loadNextCard();
      this.segundos = parseInt(localStorage.getItem('time'));

    } else {
      localStorage.setItem('gameStarted', 'true');
      this.loadNextCard();
    }
  }

  endGame(){
    /*
    Esta función termina la partida. Guarda los puntos obtenidos en la memoria local y redirige a la página de fin
    */
    var points: number = this.totalPoints/ this.maxPoints * 100;
    localStorage.setItem('gamePoints', ' ' + points);
    this.router.navigateByUrl('endGame', {replaceUrl: true});
  }

  loadNextCard(){
    /*
    Esta función recorre el array para buscar una tarjeta que se pueda cargar.
    En caso de que no exista ninguna termina la partida 
    */
    this.totalPoints += this.getPuntuaciónTarjeta();
    localStorage.setItem('totalPoints', ' ' + this.totalPoints);
    if(this.positionCard < this.cards.length){
      this.displayClue = false;
      this.loadCard();
      this.blurLevel = 0;
      localStorage.setItem('maxPoints', ' ' + this.maxPoints);
      this.maxPoints += 10;
      this.positionCard++;
      localStorage.setItem('positionCard', ' ' + (this.positionCard - 1));
    } else {
      this.endGame();
    }
  }

  loadCard(){
    /*
    Esta función recupera los valores del array y los carga para el juego.
    También gestiona el modo de juego. 
    */
    this.gameImage = BASE_URL + this.cards[this.positionCard].imageURL;
    this.gameClue = this.cards[this.positionCard].clue;
    this.gameSolution = this.cards[this.positionCard].solution;
    this.arraySolution = new Array((this.cards[this.positionCard].solution).length);

    this.arrayKeyboard = this.suffleArray(this.cards[this.positionCard].solution);
    
    if(this.gameMode == "Arcade"){
      this.gameTime = 60;
      this.segundos = 60;
      this.isPaused = false;
    } else if ((this.gameMode == "Party") || (this.gameMode == "Survival")){
      this.gameTime = this.cards[this.positionCard].time;
      this.segundos = this.cards[this.positionCard].time;
      this.isPaused = false;
    }
  }

  getPuntuaciónTarjeta(): number{
    /*
    Esta función devuelve la puntuación obtenida en la tarjeta.
    */
    var points = this.cardPoints;
    if(points == 0){
      return 0;
    } else if ((points > 0) && (this.displayClue)){
      return points -1;
    } else {
      return points;
    }
  }

  isRightAnwser(){
    /*
    Esta función comprueba que el texto almacenado en la variable array solución sea el mismo que en  gameSolución.
    En caso afirmativo llama a la función loadNextCard().
    */
    var aux: string;
    for (var i=0; i<this.gameSolution.length; i++){
      if(i==0){
        aux = this.arraySolution[i];
      } else {
        aux += this.arraySolution[i];
      }
    }
    if(aux == this.gameSolution){
      this.loadNextCard();
    }
  }

  exchangeLetter(keyboard: string, position: number){
    /*
    Esta función maneja los teclados.
    */
    if(keyboard == "solution"){
      let aux: string = this.arraySolution[position];
      this.arraySolution[position] = this.keyboardAux;
      this.keyboardAux = aux;
      this.isRightAnwser();
    } else if(keyboard == "keyboard"){
      let aux: string = this.arrayKeyboard[position];
      this.arrayKeyboard[position] = this.keyboardAux;
      this.keyboardAux = aux;
    }
  }

  suffleArray(letters:string): string[]{
    /*
    Completa el teclado con letras aleatorias y mezcla dichas letras.
    Devuelve un array con el que se forma el teclado.
    */
    var text = letters;
    let possibleCaracters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for(var i=letters.length; i<14; i++){
      text += possibleCaracters.charAt(Math.floor(Math.random()*possibleCaracters.length));
    }

    var arrayLetters: string[] = new Array(text.length);
    for(var i = 0; i < text.length; i++) {
      arrayLetters[i] = text.substr(i, 1);
    }

    let j: number;
    let cambio: string;
    for(var i = 0; i < arrayLetters.length; i++) {
      j = Math.floor(Math.random()*arrayLetters.length);
      cambio = arrayLetters[i];
      arrayLetters[i] = arrayLetters[j];
      arrayLetters[j] = cambio;
    }
    return arrayLetters;
  }


  private tick(): void {
    /*
    Esta función modifica el valor del tiempo en el cronómetro
    */
    if(this.isPaused == false){
      if(this.segundos > 0){
        --this.segundos
        localStorage.setItem('time', ' ' + (this.segundos));
        if((this.segundos <= this.gameTime) && (this.segundos > this.gameTime*4/5)){
          this.blurLevel = 0;
          this.cardPoints = 10;
        } else if((this.segundos <= this.gameTime*4/5) && (this.segundos > this.gameTime*3/5)){
          this.blurLevel = 1;
          this.cardPoints = 8;
        } else if((this.segundos <= this.gameTime*3/5) && (this.segundos > this.gameTime*2/5)){
          this.blurLevel = 2;
          this.cardPoints = 6;
        } else if((this.segundos <= this.gameTime*2/5) && (this.segundos > this.gameTime*1/5)){
          this.blurLevel = 3;
          this.cardPoints = 4;
        }else if(this.segundos <= this.gameTime*1/5){
          this.blurLevel = 4;
          this.cardPoints = 2;
        }

      } else{
        this.togglePause();
        if(this.gameMode == "Survival"){
          this.endGame();
        } else if ((this.gameMode == "Arcade") ||(this.gameMode == "Party")){
          this.cardPoints = 0;
          this.loadNextCard();
        }
      }

    }
  }

  jumpCard(){
    /*
    Carga la siguiente tarjeta o en el caso del modo de juego Survival termina la partida
    */
    if(this.gameMode == "Survival"){
      this.endGame();
    }
    this.cardPoints = 0;
    this.loadNextCard();
  }

  showClue(){
    /*
    Muestra la pista
    */
    this.displayClue = true;
  }

  togglePause(): void {
    /*
    Esta función para el cronómetro
    */
    this.isPaused = !this.isPaused;
  }
  
  imageSizeToggle() {
    /*
    Esta función modifica el tamaño de la imagen
    */
    if(this.imageEnlarge){
      this.imageEnlarge = false;
    } else {
      this.imageEnlarge = true;
    }
  }

}
