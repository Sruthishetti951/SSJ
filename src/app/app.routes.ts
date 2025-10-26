import { Routes } from '@angular/router';
import { CardComponent } from './component/card/card.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path:'card',
    component:CardComponent
  }
];
