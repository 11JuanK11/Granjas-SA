import { Routes } from '@angular/router';
import { Bienvenida } from './main/content/bienvenida/bienvenida';
import { Clientes } from './main/content/clientes/clientes';
import { Dashboard } from './main/content/dashboard/dashboard';
import { Reportes } from './main/content/reportes/reportes';
import { Porcinos } from './main/content/porcinos/porcinos';

export const routes: Routes = [
    {path: '', redirectTo: '/inicio', pathMatch: 'full'},
    {path: 'inicio', component: Bienvenida},
    {path: 'clientes', component: Clientes},
    {path: 'porcinos', component: Porcinos},
    {path: 'dashboard', component: Dashboard},
    {path: 'reportes', component: Reportes},


    /*

    {path: 'private', component: PrivateComponent,
        canActivate: [firstGuardGuard],
        children: [
            {path: '', redirectTo: 'fruits', pathMatch: 'full'},
            {
                path: 'fruits',
                component: FruitsTableComponent,
                resolve: { productData: primerResolverResolver }
            },
            {path: 'if', component: IfComponent},
            {path: 'loading', component: LoadingComponent},
            {path: 'carrito', component: CarritoComponente}
        ]
    } 
    */
];
