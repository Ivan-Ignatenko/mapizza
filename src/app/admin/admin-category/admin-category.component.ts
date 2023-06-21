import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryResponce } from 'src/app/shared/interfaces/category/category.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { Storage, deleteObject, getDownloadURL, percentage, ref, uploadBytesResumable } from '@angular/fire/storage';

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

  public uploadPercent!: number;
  public isUploaded = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private storage: Storage
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
      imagePath: [null, Validators.required]
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
    this.categoryService.deleteCategory(category.id).subscribe(() => {
      this.getAllCategories();
    })
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('images', file.name, file)
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

  async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
    const path = `${folder}/${name}`;
    let url = '';
    if (file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        percentage(task).subscribe(data => {
          this.uploadPercent = data.progress;
        });
        await task;
        url = await getDownloadURL(storageRef);
      } catch (e: any) {
        console.error(e);
      }
    } else {
      console.log('wrong format');
    }
    return Promise.resolve(url);
  }

  valueByControl(control: string): string{
    return this.categoryForm.get(control)?.value;
  }

  deleteImage(): void{
    const task = ref(this.storage, this.valueByControl('imagePath'));
    deleteObject(task).then(() => {
      console.log('file deleted');
      this.isUploaded = false;
      this.uploadPercent = 0;
      this.categoryForm.patchValue({
        imagePath: null
      });
    });
  };
}
