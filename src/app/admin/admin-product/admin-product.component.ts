import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ICategoryResponce } from 'src/app/shared/interfaces/category/category.interface';
import { IProductResponce } from 'src/app/shared/interfaces/product/product.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent {

  public adminProducts: IProductResponce[] = [];
  public adminCategories: ICategoryResponce[] = [];
  public productForm!: FormGroup;

  public editId!: number;
  public editStatus: boolean = false;
  public formStatus: boolean = false;

  public uploadPercent!: number;
  public isUploaded: boolean = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private imageService: ImageService,
    private toastr: ToastrService
  ) { };

  ngOnInit(): void {
    this.initProductForm();
    this.getAllProducts();
    this.getAllCategories();
  };

  openForm(): void {
    this.formStatus = !this.formStatus;
  };

  initProductForm(): void {
    this.productForm = this.fb.group({
      category: [null, Validators.required],
      path: [null, Validators.required],
      name: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, Validators.required],
      weight: [null, Validators.required],
      imagePath: [null, Validators.required],
      count: [1]
    })
  };

  getAllProducts(): void {
    this.productService.getAll().subscribe(data => {
      this.adminProducts = data;
    })
  };

  getAllCategories(): void {
    this.categoryService.getAll().subscribe(data => {
      this.adminCategories = data;
    })
  };

  addProduct(): void {
    if (this.editStatus) {
      this.productService.updateProduct(this.productForm.value, this.editId).subscribe(() => {
        this.getAllProducts();
        this.toastr.success('The product has been successfully changed');
      })
    } else {
      this.productService.createProduct(this.productForm.value).subscribe(() => {
        this.getAllProducts();
        this.toastr.success('The product has been created successfully');
      })
    }
    this.editStatus = false;
    this.productForm.reset();
    this.formStatus = false;
    this.isUploaded = false;
  };

  editProduct(product: IProductResponce): void {
    this.formStatus = true;
    this.productForm.patchValue({
      category: product.category,
      path: product.path,
      name: product.name,
      description: product.description,
      price: product.price,
      weight: product.weight,
      imagePath: product.imagePath
    });
    this.editStatus = true;
    this.editId = product.id;
    this.isUploaded = true;
  };

  deleteProduct(product: IProductResponce): void {
    if(confirm('Are you sure?')){
      this.productService.deleteProduct(product.id).subscribe(() => {
        this.getAllProducts();
        this.toastr.success('The product has been successfully removed');
      })
    }
  };

  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadFile('images', file.name, file)
      .then(data => {
        this.productForm.patchValue({
          imagePath: data
        });
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  };

  valueByControl(control: string): string {
    return this.productForm.get(control)?.value;
  };

  deleteImage(): void {
    this.imageService.deleteUploadFile(this.valueByControl('imagePath'))
      .then(() => {
        this.isUploaded = false;
        this.uploadPercent = 0;
        this.productForm.patchValue({
          imagePath: null
        })
      })
      .catch(err => {
        console.log(err);
      })
  };
}