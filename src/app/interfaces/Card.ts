export interface Card {
    /**
     * Las distintas pantallas dentro del juego se organizan como tarjetas, cada tarjeta
     * contiene los siguientes parámetros.
     * @author Francisco Noguera Fuentes
     * @version 1.0
     */
    _id: string; //Id que el Api asigna a la tarjeta.
    time: number; //Este parámetro contiene el tiempo máximo para resolver la tarjeta.
    clue: string; //Contiene la pista de la tarjeta.
    solution: string; //Contiene la solución de la tarjeta.
    letters: string; //Contiene las letras que se utilizarán para crear el teclado de la tarjeta.
    imageURL: string; //Url de la imagen almacenada en la API.
    publish: boolean; //Define si la tarjeta se publicará o no.
}