import { Routes } from '@angular/router';
import { HomePage } from './home/home-page/home-page';
import { TrainingPage } from './math-problems/training-page/training-page';

export const routes: Routes = [
    {path: "", component: HomePage},
    {path: "training/:problemType", component: TrainingPage}
];
