import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoryComponent } from './admin-category.component';
import { HttpClientModule } from '@angular/common/http';
import { Storage } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';

describe('AdminCategoryComponent', () => {
  let component: AdminCategoryComponent;
  let fixture: ComponentFixture<AdminCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCategoryComponent ],
      imports: [
        HttpClientModule
      ],
      providers: [
        { provide: Storage, useValue: {} },
        { provide: ToastrService, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
