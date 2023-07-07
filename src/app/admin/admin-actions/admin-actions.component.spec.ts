import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminActionsComponent } from './admin-actions.component';
import { HttpClientModule } from '@angular/common/http';
import { Storage } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';

describe('AdminActionsComponent', () => {
  let component: AdminActionsComponent;
  let fixture: ComponentFixture<AdminActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminActionsComponent ],
      imports: [
        HttpClientModule
      ],
      providers: [
        { provide: Storage, useValue: {} },
        { provide: ToastrService, useValue: {} },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
