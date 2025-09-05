import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { TrainingPage } from './math-problems/training-page/training-page';

export const routes: Routes = [
    {path: "", component: Home},
    {path: "training/:problemType", component: TrainingPage}
];
