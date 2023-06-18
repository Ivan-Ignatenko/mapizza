import { Injectable } from '@angular/core';
import { IAction } from '../../interfaces/actions/actions.interface';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {

  private actions: Array<IAction> = [
    {
      id: 1,
      title: 'Good discount',
      description: 'bla-bla-bla, bla-bla, bla-bla vvvvvvvvvvvv vvvvvvvvvvvvv vvvvvvvvv vvvvvvvvvvvv vvvvvvvvvvvvv vvvvvvvvvvvv vvvvv vvvvvvvvvvvvvvvvvvvv vvvvvvvvvvvvv vvvvvvvvv vvvvvvvvv vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv',
      imagePath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzzbrB-wHcRESuzW5GMn56zcYHfa8YzvqQNZsFiAY5Dg&s'
    }
  ];

  constructor() { }

  ngOnInit(): void { }

  getActions(): IAction[] {
    return this.actions;
  }

  addAction(action: IAction): void {
    this.actions.push(action);
  }

  updateAction(action: IAction, id: number): void{
    const index = this.actions.findIndex(action => action.id === id);
    this.actions.splice(index, 1, action);
  }

  deleteAction(id: number): void{
    const index = this.actions.findIndex(action => action.id === id);
    this.actions.splice(index, 1);
  }
}
