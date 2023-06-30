import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProductResponce } from 'src/app/shared/interfaces/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  private eventSubscription!: Subscription;

  public userProducts: IProductResponce[] = [];
  public categoryName!: string;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private router: Router
  ) {
    this.eventSubscription = this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        this.getAllProducts();
      }
    })
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }

  getAllProducts(): void{
    const categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;
    this.productService.getAllByCategory(categoryName).subscribe(data => {
      this.userProducts = data;
      this.categoryName = data[0].category.name;
    })
  }

  productCount(product: IProductResponce, value: boolean): void {
    if (value) {
      product.count++;
    } else if (!value && product.count > 1) {
      product.count--;
    }
  }

  addToBasket(product: IProductResponce): void {
    let basket: IProductResponce[] = [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some(prod => prod.id === product.id)) {
        const index = basket.findIndex(prod => prod.id === product.id);
        basket[index].count += product.count;
      } else {
        basket.push(product);
      }
    } else {
      basket.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    product.count = 1;
    this.orderService.changeBasket.next(true);
  }

}
