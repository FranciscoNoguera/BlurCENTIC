import { InitPageComponent } from './components/init-page/init-page.component';
import { ArcadeModeComponent } from './components/arcade-mode/arcade-mode.component';
import { GameModeComponent } from './components/game-mode/game-mode.component';


export const ROUTES = [
    {path: '', component: InitPageComponent},
    {path: 'init', component: GameModeComponent},
    {path: 'game', component: ArcadeModeComponent},
    {path: '', redirectTo: '' , pathMatch: 'full'},
    {path: '**', redirectTo: '/init' , pathMatch: 'full'}
];