import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TimerComponent } from './components/timer/timer.component';
import { ImageComponent } from './components/image/image.component';


@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    ImageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
