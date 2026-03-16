import { Routes } from '@angular/router';
import { authGuard } from './features/user.managment/guards/auth.guard';

export const routes: Routes = [
    {path:'', redirectTo: '/en/login', pathMatch: 'full'},
    {path: ':Lang',
    canActivateChild:[authGuard],
        children:[
            {   
                path: 'tickets',
                loadComponent: () => import('./features/ticketing/ticket.list/ticket.list').then(m => m.TicketList)
            },
            {path: 'newticket', loadComponent: () => import('./features/ticketing/ticket.form/ticket.form').then(m => m.TicketForm)},
            {path: 'ticket/:TicketId', loadComponent: () => import('./features/ticketing/ticket.form/ticket.form').then(m => m.TicketForm)},
            {path: 'users', loadComponent: () => import('./features/user.managment/user.list/user.list').then(m => m.UserListComponent)}
        ]
    },
    {path: ':Lang/login', loadComponent: () => import('./features/user.managment/login/login').then(m => m.LoginFormComponent)},
    { path: ':Lang/error/:errorCode', loadComponent: () => import('./shared/error.page/error.page').then(m => m.ErrorPage) },
    { path: '**', loadComponent: () => import('./shared/error.page/error.page').then(m => m.ErrorPage) }
];
