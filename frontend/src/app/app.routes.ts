import { Routes } from '@angular/router';
import { HomePage } from './home/home-page/home-page';
import { EndlessModePage } from './endless-mode/endless-mode-page/endless-mode-page';
import { LoginPage } from './auth/login-page/login-page';
import { RoutineModePage } from './routine-mode/routine-mode-page/routine-mode-page';

export const routes: Routes = [
    {path: "", component: HomePage},
    {path: "login", component: LoginPage},
    {path: "training/endless/:problemType", component: EndlessModePage},
    {path: "training/routine/:routineId", component: RoutineModePage}
];
