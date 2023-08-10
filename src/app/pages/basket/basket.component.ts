import { Component } from '@angular/core';
import { IProductResponce } from 'src/app/shared/interfaces/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {

  public basket: IProductResponce[] = [];

  public totalPrice: number = 0;

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.loadBasket();
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
  }

  getTotalPrice(): void {
    this.totalPrice = this.basket
      .reduce((total: number, prod: IProductResponce) => total + prod.count * prod.price, 0)
  }

  productCount(product: IProductResponce, value: boolean): void {
    if (value) {
      ++product.count;
      const array: IProductResponce[] = JSON.parse(localStorage.getItem('basket') as string);
      const index = array.findIndex(item => item.id === product.id);
      ++array[index].count;
      localStorage.setItem('basket', JSON.stringify(array));
      this.orderService.changeBasket.next(true);
      this.loadBasket();
    } else if (!value && product.count > 1) {
      --product.count;
      const array: IProductResponce[] = JSON.parse(localStorage.getItem('basket') as string);
      const index = array.findIndex(item => item.id === product.id);
      --array[index].count;
      localStorage.setItem('basket', JSON.stringify(array));
      this.orderService.changeBasket.next(true);
      this.loadBasket();
    }
  }

  deleteProduct(id: number): void {
    const array: IProductResponce[] = JSON.parse(localStorage.getItem('basket') as string);
    const index = array.findIndex(item => item.id === id);
    array.splice(index, 1);
    localStorage.setItem('basket', JSON.stringify(array));
    this.orderService.changeBasket.next(true);
    this.loadBasket();
  }
}
