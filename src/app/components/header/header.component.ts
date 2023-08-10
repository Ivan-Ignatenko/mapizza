import { Component } from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { ICategoryResponce } from 'src/app/shared/interfaces/category/category.interface';
import { IProductResponce } from 'src/app/shared/interfaces/product/product.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { AuthorizationComponent } from '../authorization/authorization.component';
import { ROLE } from 'src/app/shared/constans/role.constant';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public categories: ICategoryResponce[] = [];

  public basket: IProductResponce[] = [];

  public total: number = 0;
  public totalCount: number = 0;

  public modalStatus: boolean = false;
  public emptyBasket: boolean = true;

  public cabinetStatus: boolean = false;

  public isBasket: boolean = false;
  public isModal: boolean = false;
  public isLogin: boolean = true;
  public loginPage: string = '';
  public roomPage: string = '';
  public loginUrl: string = '';

  public menuIsOpen: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private orderService: OrderService,
    private accountService: AccountService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllCategories();
    this.loadBasket();
    this.updateBasket();
    this.checkUserLogin();
    this.checkUpdateUserLogin();
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

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    })
  }

  openLoginDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.backdropClass = 'dialog-back';
    dialogConfig.autoFocus = false;
    this.dialog.open(AuthorizationComponent, dialogConfig);
  }

  showModal(): void {
    if (this.basket.length > 0) {
      this.emptyBasket = false;
    }
    this.isBasket = !this.isBasket;
    this.isModal = !this.isModal;
    this.modalStatus = !this.modalStatus;
  }

  productCount(product: IProductResponce, value: boolean): void {
    if (value) {
      ++product.count;
      const array: IProductResponce[] = JSON.parse(localStorage.getItem('basket') as string);
      const index = array.findIndex(item => item.id === product.id);
      ++array[index].count;
      localStorage.setItem('basket', JSON.stringify(array));
      this.orderService.changeBasket.next(true);
    } else if (!value && product.count > 1) {
      --product.count;
      const array: IProductResponce[] = JSON.parse(localStorage.getItem('basket') as string);
      const index = array.findIndex(item => item.id === product.id);
      --array[index].count;
      localStorage.setItem('basket', JSON.stringify(array));
      this.orderService.changeBasket.next(true);
    }
  }

  deleteProduct(id: number): void {
    const array: IProductResponce[] = JSON.parse(localStorage.getItem('basket') as string);
    const index = array.findIndex(item => item.id === id);
    array.splice(index, 1);
    localStorage.setItem('basket', JSON.stringify(array));
    this.orderService.changeBasket.next(true);
    if (array.length === 0) {
      this.emptyBasket = !this.emptyBasket;
    }
  }

  checkUserLogin(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    if (currentUser && currentUser.role === ROLE.ADMIN) {
      this.isLogin = false;
      this.loginPage = 'Admin';
      this.cabinetStatus = true;
      this.loginUrl = 'admin';
    } else if (currentUser && currentUser.role === ROLE.USER) {
      this.isLogin = false;
      this.loginPage = 'User';
      this.cabinetStatus = true;
      this.loginUrl = 'user-profile';
    } else {
      this.isLogin = true;
      this.loginPage = '';
      this.cabinetStatus = false;
      this.loginUrl = '';
    }
  }

  checkUpdateUserLogin(): void {
    this.accountService.isUserLogin$.subscribe(() => {
      this.checkUserLogin();
    })
  }

  openSmallMenu(): void {
    this.menuIsOpen = !this.menuIsOpen;
  }
}
