import { Component } from '@angular/core';
import { IActionResponce } from 'src/app/shared/interfaces/actions/actions.interface';
import { ActionsService } from 'src/app/shared/services/actions/actions.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent {

  public userActions: IActionResponce[] = [];

  constructor(
    private actionsService: ActionsService
  ) { }

  ngOnInit(): void {
    this.getAllActions();
  }

  getAllActions(): void {
    this.actionsService.getAll().subscribe(data => {
      this.userActions = data as IActionResponce[];
    })
  }

}
