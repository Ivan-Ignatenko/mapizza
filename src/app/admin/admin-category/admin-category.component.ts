import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryResponce } from 'src/app/shared/interfaces/category/category.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent {

  public adminCategories: ICategoryResponce[] = [];
  public categoryForm!: FormGroup;

  public editId!: number;
  public editStatus = false;
  public formStatus = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.initCategoryForm();
    this.getAllCategories();
  }

  openForm(): void { 
    this.formStatus = true;
  }

  initCategoryForm(): void {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      imagePath: ['https://www.mundodeportivo.com/alfabeta/hero/2022/01/shingeki-no-kyojin-cosplay-mikasa-ackerman.jpg?width=768&aspect_ratio=16:9&format=nowebp']
    });
  }

  getAllCategories(): void {
    this.categoryService.getAll().subscribe(data => {
      this.adminCategories = data;
    })
  }

  addCategory(): void {
    if (this.editStatus) {
      this.categoryService.updateCategory(this.categoryForm.value, this.editId).subscribe(() => {
        this.getAllCategories();
      })
    } else {
      this.categoryService.createCategory(this.categoryForm.value).subscribe(() => {
        this.getAllCategories();
      })
    }
    this.editStatus = false;
    this.categoryForm.reset();
    this.formStatus = false;
  }

  editCategory(category: ICategoryResponce): void {
    this.formStatus = true;
    this.categoryForm.patchValue({
      name: category.name,
      path: category.path,
      imagePath: category.imagePath
    });
    this.editStatus = true;
    this.editId = category.id;
  }

  deleteCategory(category: ICategoryResponce): void {
    this.categoryService.deleteCategory(category.id).subscribe(() => {
      this.getAllCategories();
    })
  }
}
