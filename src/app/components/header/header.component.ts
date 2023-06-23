import { Component } from '@angular/core';
import { ICategoryResponce } from 'src/app/shared/interfaces/category/category.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public categories: ICategoryResponce[] = [];

  constructor(
    private categoryService: CategoryService
  ){}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void{
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    })
  }
}
