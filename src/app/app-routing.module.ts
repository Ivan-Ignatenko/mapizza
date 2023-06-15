import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./pages/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule)
  },
  {
    path: 'dogovir-publichnoyi-oferty',
    loadChildren: () => import('./pages/dogovir-publichnoyi-oferty/dogovir-publichnoyi-oferty.module').then(m => m.DogovirPublichnoyiOfertyModule)
  },
  {
    path: 'news',
    loadChildren: () => import('./pages/news/news.module').then(m => m.NewsModule)
  },
  {
    path: 'actions',
    loadChildren: () => import('./pages/actions/actions.module').then(m => m.ActionsModule)
  },
  {
    path: 'product/:category',
    loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
