import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

/*Servicios*/
import { ApiConnectionService } from './services/ApiConnection/api-connection.service';

/*Componentes*/
import { ArcadeModeComponent } from './components/arcade-mode/arcade-mode.component';
import { InitPageComponent } from './components/init-page/init-page.component';
import { GameModeComponent } from './components/game-mode/game-mode.component';
import { EndGameComponent } from './components/end-game/end-game.component';

/*Rutas*/
import { ROUTES } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    ArcadeModeComponent,
    InitPageComponent,
    GameModeComponent,
    EndGameComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    ApiConnectionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
