import { Component } from '@angular/core';
import { ICategoryResponce } from 'src/app/shared/interfaces/category/category.interface';
import { IProductResponce } from 'src/app/shared/interfaces/product/product.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public categories: ICategoryResponce[] = [];

  private basket: IProductResponce[] = [];

  public total: number = 0;
  public totalCount: number = 0;

  constructor(
    private categoryService: CategoryService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.getAllCategories();
    this.loadBasket();
    this.updateBasket();
  }

  getAllCategories(): void {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    })
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
    this.getTotalCount();
  }

  getTotalPrice(): void {
    this.total = this.basket
    .reduce((total: number, prod: IProductResponce) => total + prod.count * prod.price, 0)
  }

  getTotalCount(): void {
    this.totalCount = this.basket
    .reduce((total: number, prod: IProductResponce) => total + prod.count, 0);
  }

  updateBasket(): void{
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    })
  }
}
