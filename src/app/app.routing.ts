import { InitPageComponent } from './components/init-page/init-page.component';
import { ArcadeModeComponent } from './components/arcade-mode/arcade-mode.component';


export const ROUTES = [
    {path: 'init', component: InitPageComponent},
    {path: 'arcade', component: ArcadeModeComponent},
    {path: '', redirectTo: '/init' , pathMatch: 'full'},
    {path: '**', redirectTo: '/init' , pathMatch: 'full'}
];