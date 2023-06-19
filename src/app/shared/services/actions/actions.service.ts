import { Injectable } from '@angular/core';
import { IActionRequest, IActionResponce } from '../../interfaces/actions/actions.interface';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {

  private url = environment.BACKEND_URL;
  private api = { actions: `${this.url}/discounts` };

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {}

  getAll(): Observable<IActionResponce[]>{
    return this.http.get<IActionResponce[]>(this.api.actions);
  }

  getOneAction(id: number): Observable<IActionResponce>{
    return this.http.get<IActionResponce>(`${this.api.actions}/${id}`);
  }

  createAction(action: IActionRequest): Observable<IActionResponce>{
    return this.http.post<IActionResponce>(this.api.actions, action);
  }

  updateAction(action: IActionRequest, id: number): Observable<IActionResponce>{
    return this.http.patch<IActionResponce>(`${this.api.actions}/${id}`, action);
  }

  deleteAction(id: number): Observable<void>{
    return this.http.delete<void>(`${this.api.actions}/${id}`);
  }
}
