import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./pages/faq/faq.module').then(m => m.FaqModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./pages/about-us/about-us.module').then(m => m.AboutUsModule)
  },
  {
    path: 'kontakty',
    loadChildren: () => import('./pages/kontakty/kontakty.module').then(m => m.KontaktyModule)
  },
  {
    path: 'dostavka',
    loadChildren: () => import('./pages/dostavka/dostavka.module').then(m => m.DostavkaModule)
  },
  {
    path: 'career',
    loadChildren: () => import('./pages/career/career.module').then(m => m.CareerModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
