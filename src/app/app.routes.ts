import { Routes } from '@angular/router';

export const routes: Routes = [
    //{ path: '**', loadComponent: () => import('./home/home').then(m => m.Home) }

    {path:'', redirectTo: 'en', pathMatch: 'full'},
    {path: ':Lang', 
        children:[
            {path: '', loadComponent: () => import('./home/home').then(m => m.Home)},
            {path: 'tickets', loadComponent: () => import('./features/ticketing/ticket.list/ticket.list').then(m => m.TicketList)}
        ]
    }

];
