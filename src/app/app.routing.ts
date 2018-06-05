import { InitPageComponent } from './components/init-page/init-page.component';
import { ArcadeModeComponent } from './components/arcade-mode/arcade-mode.component';
import { GameModeComponent } from './components/game-mode/game-mode.component';
import { EndGameComponent } from './components/end-game/end-game.component';


export const ROUTES = [
    {path: '', component: InitPageComponent},
    {path: 'home', component: InitPageComponent},
    {path: 'init', component: GameModeComponent},
    {path: 'game', component: ArcadeModeComponent},
    {path: 'endGame', component: EndGameComponent},
    {path: '**', redirectTo: '/home' , pathMatch: 'full'}
];