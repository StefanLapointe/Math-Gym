import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Train } from './pages/train/train';

export const routes: Routes = [
    {path: "", component: Home},
    {path: "train/:problemType", component: Train}
];
