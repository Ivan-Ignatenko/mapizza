import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationComponent } from './authorization.component';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AuthorizationComponent', () => {
  let component: AuthorizationComponent;
  let fixture: ComponentFixture<AuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizationComponent ],
      imports: [
        HttpClientModule, 
        MatIconModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: Auth, useValue: {} },
        { provide: Firestore, useValue: {} },
        { provide: ToastrService, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
