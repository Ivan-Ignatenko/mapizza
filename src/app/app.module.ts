import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { DostavkaComponent } from './pages/dostavka/dostavka.component';
import { ActionsComponent } from './pages/actions/actions.component';
import { KontaktyComponent } from './pages/kontakty/kontakty.component';
import { CareerComponent } from './pages/career/career.component';
import { NewsComponent } from './pages/news/news.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';
import { ActionsInfoComponent } from './pages/actions-info/actions-info.component';
import { BasketComponent } from './pages/basket/basket.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutUsComponent,
    DostavkaComponent,
    ActionsComponent,
    KontaktyComponent,
    CareerComponent,
    NewsComponent,
    FaqComponent,
    ProductComponent,
    ProductInfoComponent,
    ActionsInfoComponent,
    BasketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
