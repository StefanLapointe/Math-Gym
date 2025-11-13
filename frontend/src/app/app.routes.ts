import { Routes } from '@angular/router';
import { HomePage } from './home/home-page/home-page';
import { EndlessModePage } from './endless-mode/endless-mode-page/endless-mode-page';
import { LoginPage } from './auth/login-page/login-page';
import { RoutineModePage } from './routine-mode/routine-mode-page/routine-mode-page';
import { RegistrationPage } from './auth/registration-page/registration-page';
import { TermsPage } from './legal/terms-page/terms-page';
import { PrivacyPage } from './legal/privacy-page/privacy-page';
import { SettingsPage } from './settings/settings-page/settings-page';

export const routes: Routes = [
    {path: "", component: HomePage},
    {path: "login", component: LoginPage},
    {path: "register", component: RegistrationPage},
    {path: "training/endless/:problemType", component: EndlessModePage},
    {path: "training/routine/:routineId", component: RoutineModePage},
    {path: "terms", component: TermsPage},
    {path: "privacy", component: PrivacyPage},
    {path: "settings", component: SettingsPage}
];
