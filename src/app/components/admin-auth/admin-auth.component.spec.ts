import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthComponent } from './admin-auth.component';
import { ToastrService } from 'ngx-toastr';
import { Firestore } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AdminAuthComponent', () => {
  let component: AdminAuthComponent;
  let fixture: ComponentFixture<AdminAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAuthComponent ],
      imports: [
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: ToastrService, useValue: {} },
        { provide: Firestore, useValue: {} },
        { provide: Auth, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
