import { Component } from '@angular/core';
import { IAction } from 'src/app/shared/interfaces/actions/actions.interface';
import { ActionsService } from 'src/app/shared/services/actions/actions.service';

@Component({
  selector: 'app-admin-actions',
  templateUrl: './admin-actions.component.html',
  styleUrls: ['./admin-actions.component.scss']
})
export class AdminActionsComponent {

  public adminActions: IAction[] = [];
  public title!: string;
  public description!: string;
  public imagePath: string = 'https://www.mundodeportivo.com/alfabeta/hero/2022/01/shingeki-no-kyojin-cosplay-mikasa-ackerman.jpg?width=768&aspect_ratio=16:9&format=nowebp';
  public editId!: number;

  public editStatus: boolean = true;

  constructor(
    private actionsService: ActionsService
  ) { }

  ngOnInit(): void {
    this.getActions();
  }

  getActions(): void {
    this.adminActions = this.actionsService.getActions();
  }

  addAction(): void {
    const newAction: IAction = {
      title: this.title,
      description: this.description,
      imagePath: this.imagePath,
      id: 1
    };
    if (this.adminActions.length > 0) {
      const id = this.adminActions.slice(-1)[0].id;
      newAction.id = id + 1;
    }
    this.actionsService.addAction(newAction);
    this.title = '';
    this.description = '';
  }

  editAction(action: IAction): void {
    this.description = action.description;
    this.title = action.title;
    this.editId = action.id;
    this.editStatus = false;
  }

  saveAction(): void {
    const updateAction: IAction = {
      title: this.title,
      description: this.description,
      imagePath: this.imagePath,
      id: this.editId
    };
    this.actionsService.updateAction(updateAction, this.editId);
    this.title = '';
    this.description = '';
    this.editStatus = true;
  }

  deleteAction(action: IAction): void {
    if(confirm('Are you sure?')){
      this.actionsService.deleteAction(action.id);
    }
  }
}
