import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProductResponce } from 'src/app/shared/interfaces/product/product.interface';
// import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent {

  public currentProduct!: IProductResponce;

  constructor(
    // private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(responce => {
      this.currentProduct = responce['productInfo'];
    })
    // this.getCurrentProduct();
  }

  getCurrentProduct(): void{
    // const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    // this.productService.getOneProduct(id).subscribe(data =>{
    //   this.currentProduct = data;
    // })
  }
}
