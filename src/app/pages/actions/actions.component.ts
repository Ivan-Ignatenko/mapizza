import { Component } from '@angular/core';
import { IAction } from 'src/app/shared/interfaces/actions/actions.interface';
import { ActionsService } from 'src/app/shared/services/actions/actions.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent {

  public userActions: IAction[] = [];

  constructor(
    private actionsService: ActionsService
  ) { }

  ngOnInit(): void {
    this.getActions();
  }

  getActions(): void {
    this.userActions = this.actionsService.getActions()
  }

}
