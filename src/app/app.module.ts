import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

/*Servicios*/
import { ApiConnectionService } from './services/ApiConnection/api-connection.service';

/*Componentes*/import { ArcadeModeComponent } from './components/arcade-mode/arcade-mode.component';
import { InitPageComponent } from './components/init-page/init-page.component';

/*Rutas*/
import { ROUTES } from './app.routing'

@NgModule({
  declarations: [
    AppComponent,
    ArcadeModeComponent,
    InitPageComponent
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
