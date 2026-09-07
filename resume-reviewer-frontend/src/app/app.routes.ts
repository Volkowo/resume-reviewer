import { Routes } from '@angular/router';
import { Review } from './pages/review/review';
import { About } from './pages/about/about';

export const routes: Routes = [
    {
        path: 'review',
        component: Review
    },
    {
        path: 'about',
        component: About
    }
];
