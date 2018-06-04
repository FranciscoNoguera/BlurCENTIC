import { BASE_URL } from './../../app.constants';
import { Card } from './../../interfaces/Card';
import { ApiConnectionService } from './../../services/ApiConnection/api-connection.service';
import { Component, OnInit } from '@angular/core';


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
  public gameImage: string;
  public gameClue: string;
  private gameSolution: string;
  public arraySolution: string[];
  public arrayKeyboard: string[];

  //Variables del teclado
  public keyboardAux: string = '';

  //Variables de la pista
  public displayClue: boolean = false;

  constructor(private apiConnectionService: ApiConnectionService) {
    //this.gameMode = localStorage.getItem('gameMode');

    //Tengo que modificarlo para
    this.segundos = 60;
    this.isPaused = false;
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
        this.segundos = 60;
        this.isPaused = false;
      } else if (this.gameMode == "Party"){
        this.segundos = this.cards[this.positionCard].time;
        this.isPaused = false;
      }
      return true;
    } else {
      return false;
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
      } else{ this.togglePause }

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
