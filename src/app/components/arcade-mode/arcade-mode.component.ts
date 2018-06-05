import { BASE_URL } from './../../app.constants';
import { Card } from './../../interfaces/Card';
import { ApiConnectionService } from './../../services/ApiConnection/api-connection.service';
import { Component, OnInit } from '@angular/core';

//Falta por definir la mecánia de puntos
//Falta el fin del juego
//Hay un error en el cronometro en modo survival

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

  constructor(private apiConnectionService: ApiConnectionService) {

    //Tengo que modificarlo para
    //this.segundos = 60;
    //this.isPaused = false;
    setInterval(() => this.tick(), 1000);
  }

  ngOnInit() {
    this.cards = this.apiConnectionService.getCards();
    console.log (this.cards);

    this.gameMode = localStorage.getItem('gameMode');
    //this.gameMode = "Arcade";

    this.loadNextCard();
    
  }

  endGame(){

  }

  loadNextCard(){
    /*
    Esta función recorre el array para buscar una tarjeta que se pueda cargar.
    En caso de que no exista ninguna termina la partida 
    */
    var success: boolean = false;
    while((success == false) && (this.positionCard < this.cards.length)){
      this.blurLevel = 0;
      success = this.loadCard();
      this.positionCard++;
    }
    if(this.positionCard >= this.cards.length){
      this.endGame();
    }
  }

  loadCard(): boolean{
    /*
    Esta función recupera los valores del array y los carga para el juego.
    También gestiona el modo de juego. 
    */
    if(this.cards[this.positionCard].publish){
      this.gameImage = BASE_URL + this.cards[this.positionCard].imageURL;
      this.gameClue = this.cards[this.positionCard].clue;
      this.gameSolution = this.cards[this.positionCard].solution;
      this.arraySolution = new Array((this.cards[this.positionCard].solution).length);
      this.arrayKeyboard = this.shuffleArray(this.cards[this.positionCard].letters);

      if(this.gameMode == "Arcade"){
        this.gameTime = 60;
        this.segundos = 60;
        this.isPaused = false;
      } else if (this.gameMode == "Party"){
        this.gameTime = this.cards[this.positionCard].time;
        this.segundos = this.cards[this.positionCard].time;
        this.isPaused = false;
      } else if((this.positionCard == 0) && (this.gameMode == "Survival")){
        this.gameTime = 300;
        this.segundos = 300;
        this.isPaused = false;
      }
      return true;
    } else {
      return false;
    }
  }

  isRightAnwser(){

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

  shuffleArray(letters: string): string[]{
    /*
    Esta función baraja las letras del string solución y devuelve un array de caracteres con las letras barajadas. 
    */
    var arrayLetters: string[] = new Array(letters.length);
    for(var i = 0; i < letters.length; i++) {
      arrayLetters[i] = letters.substr(i, 1);
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

        if((this.segundos <= this.gameTime) && (this.segundos > this.gameTime*4/5)){
          this.blurLevel = 0;
        } else if((this.segundos <= this.gameTime*4/5) && (this.segundos > this.gameTime*3/5)){
          this.blurLevel = 1;
        } else if((this.segundos <= this.gameTime*3/5) && (this.segundos > this.gameTime*2/5)){
          this.blurLevel = 2;
        } else if((this.segundos <= this.gameTime*2/5) && (this.segundos > this.gameTime*1/5)){
          this.blurLevel = 3;
        }else if(this.segundos <= this.gameTime*1/5){
          this.blurLevel = 4;
        }


      } else{
        this.togglePause();
        if(this.gameMode == "Survival"){
          this.endGame();
        } else if ((this.gameMode == "Arcade") ||(this.gameMode == "Party")){
          this.loadNextCard();
        }
      }

    }
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
