import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IActionResponce } from 'src/app/shared/interfaces/actions/actions.interface';

@Component({
  selector: 'app-actions-info',
  templateUrl: './actions-info.component.html',
  styleUrls: ['./actions-info.component.scss']
})
export class ActionsInfoComponent {

  public action!: IActionResponce;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(responce => {
      this.action = responce['actionInfo'];
    })
  }
}
