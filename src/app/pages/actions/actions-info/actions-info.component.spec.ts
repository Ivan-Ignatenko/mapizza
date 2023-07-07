import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsInfoComponent } from './actions-info.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ActionsInfoComponent', () => {
  let component: ActionsInfoComponent;
  let fixture: ComponentFixture<ActionsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionsInfoComponent ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
