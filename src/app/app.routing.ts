import { InitPageComponent } from './components/init-page/init-page.component';
import { ArcadeModeComponent } from './components/arcade-mode/arcade-mode.component';
import { EndGameComponent } from './components/end-game/end-game.component';
import { InstructionPageComponent} from './components/instruction-page/instruction-page.component';

export const ROUTES = [
    {path: '', component: InitPageComponent},
    {path: 'home', component: InitPageComponent},
    {path: 'game', component: ArcadeModeComponent},
    {path: 'endGame', component: EndGameComponent},
    {path: 'instruction', component: InstructionPageComponent},
    {path: '**', redirectTo: '/home' , pathMatch: 'full'}
];
