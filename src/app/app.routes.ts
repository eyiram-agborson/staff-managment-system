import { Routes } from '@angular/router';
import { PageLayout } from './page-layout/page-layout';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
{
    path: '', component: PageLayout,
    children: [
        {
            path: '', redirectTo: 'dashboard', pathMatch: 'full'
        },
        {
            path: 'dashboard', component: Dashboard
        },
        {
            path: 'profile', loadComponent: ()=> import('./profile/profile').then(m=>m.Profile)
        },
        {
            path: 'staff', loadComponent: ()=> import('./staff/staff').then(m =>m.Staff)
        },
        {
            path:'tasks', loadComponent: ()=> import('./tasks/tasks').then(m => m.Tasks)
        }

    ]
}
];
