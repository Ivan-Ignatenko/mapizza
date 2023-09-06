import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryResponce } from 'src/app/shared/interfaces/category/category.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent {

  public adminCategories: ICategoryResponce[] = [];
  public categoryForm!: FormGroup;

  public editId!: number | string;
  public editStatus: boolean = false;
  public formStatus: boolean = false;

  public uploadPercent!: number;
  public isUploaded: boolean = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private imageService: ImageService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initCategoryForm();
    this.getAllCategories();
  }

  openForm(): void {
    this.formStatus = !this.formStatus;
  }

  initCategoryForm(): void {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      imagePath: [null, Validators.required]
    });
  }

  getAllCategories(): void {
    this.categoryService.getAll().subscribe(data => {
      this.adminCategories = data as ICategoryResponce[];
    })
  }

  addCategory(): void {
    if (this.editStatus) {
      this.categoryService.updateCategory(this.categoryForm.value, this.editId as string).then(() => {
        this.getAllCategories();
        this.toastr.success('The category has been successfully changed');
      })
    } else {
      this.categoryService.createCategory(this.categoryForm.value).then(() => {
        this.getAllCategories();
        this.toastr.success('The category has been created successfully');
      })
    }
    this.editStatus = false;
    this.categoryForm.reset();
    this.formStatus = false;
    this.isUploaded = false;
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
    this.isUploaded = true;
  }

  deleteCategory(category: ICategoryResponce): void {
    if (confirm('Are you sure?')) {
      this.categoryService.deleteCategory(category.id as string).then(() => {
        this.getAllCategories();
        this.toastr.success('The category has been successfully removed');
      })
    }
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadFile('images', file.name, file)
      .then(data => {
        this.categoryForm.patchValue({
          imagePath: data
        });
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  valueByControl(control: string): string {
    return this.categoryForm.get(control)?.value;
  }

  deleteImage(): void {
    this.imageService.deleteUploadFile(this.valueByControl('imagePath'))
      .then(() => {
        this.isUploaded = false;
        this.uploadPercent = 0;
        this.categoryForm.patchValue({
          imagePath: null
        })
      })
      .catch(err => {
        console.log(err);
      })
  };
}
