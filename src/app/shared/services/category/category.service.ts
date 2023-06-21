import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategoryRequest, ICategoryResponce } from '../../interfaces/category/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = environment.BACKEND_URL;
  private api = { categories: `${this.url}/categories` };

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<ICategoryResponce[]>{
    return this.http.get<ICategoryResponce[]>(this.api.categories);
  }

  createCategory(category: ICategoryRequest): Observable<ICategoryResponce>{
    return this.http.post<ICategoryResponce>(this.api.categories, category);
  }

  updateCategory(category: ICategoryRequest, id: number): Observable<ICategoryResponce>{
    return this.http.patch<ICategoryResponce>(`${this.api.categories}/${id}`, category);
  }

  deleteCategory(id: number): Observable<void>{
    return this.http.delete<void>(`${this.api.categories}/${id}`);
  }
}
