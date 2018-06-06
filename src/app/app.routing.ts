import { InitPageComponent } from './components/init-page/init-page.component';
import { ArcadeModeComponent } from './components/arcade-mode/arcade-mode.component';
import { GameModeComponent } from './components/game-mode/game-mode.component';
import { EndGameComponent } from './components/end-game/end-game.component';
import { InstructionPageComponent} from './instruction-page/instruction-page.component';

export const ROUTES = [
    {path: '', component: InitPageComponent},
    {path: 'home', component: InitPageComponent},
    {path: 'init', component: GameModeComponent},
    {path: 'game', component: ArcadeModeComponent},
    {path: 'endGame', component: EndGameComponent},
    {path: 'instruction', component: InstructionPageComponent},
    {path: '**', redirectTo: '/home' , pathMatch: 'full'}
];
