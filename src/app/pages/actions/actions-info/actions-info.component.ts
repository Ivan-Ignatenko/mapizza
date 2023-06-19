import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IActionResponce } from 'src/app/shared/interfaces/actions/actions.interface';
import { ActionsService } from 'src/app/shared/services/actions/actions.service';

@Component({
  selector: 'app-actions-info',
  templateUrl: './actions-info.component.html',
  styleUrls: ['./actions-info.component.scss']
})
export class ActionsInfoComponent {

  public action!: IActionResponce;

  constructor(
    private actionsService: ActionsService,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.getOneAction();
  }

  getOneAction(): void{
    const ACTION_ID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.actionsService.getOneAction(ACTION_ID).subscribe(data => {
      this.action = data;
    });
  }

}
