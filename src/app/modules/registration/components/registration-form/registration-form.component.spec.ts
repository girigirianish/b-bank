import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  DebugElement,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RegistrationFormComponent } from './registration-form.component';
import { of } from 'rxjs';

fdescribe('RegistrationComponent', () => {
  let component: RegistrationFormComponent;
  let fixture: ComponentFixture<RegistrationFormComponent>;
  let debugElement: DebugElement;
  let dialog: MatDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatToolbarModule,
        MatCardModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        ReactiveFormsModule,
        ToastrModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDialogModule,
        BrowserAnimationsModule,
      ],
      declarations: [RegistrationFormComponent],
      providers: [
        {
          provide: MatDialog,
          useValue: {
            open: () => {
              return {
                componentInstance: {
                  locationSelected: of({
                    lat: 1,
                    long: 3,
                  }),
                },
              };
            },
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationFormComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    dialog = debugElement.injector.get(MatDialog);

    spyOn(dialog, 'open').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('register', () => {
    it('should do nothing if the form is invalid', () => {
      component.ngOnInit();
      spyOn(component.registrationDetailsSubmitted, 'next').and.callThrough();
      component.register();
      expect(
        component.registrationDetailsSubmitted.next
      ).not.toHaveBeenCalled();
    });

    it('should emit the for if the form is valid', () => {
      component.ngOnInit();
      component.temporaryAddress = {
        lat: 1,
        long: 3,
      };
      component.registrationForm.setValue({
        name: 'anish',
        email: 'email@gmail.com',
        temporaryAddress: 'some address',
        permanentAddress: 'permanent address',
        phoneNumber: '0123456789',
        bloodGroup: 'A+',
        lastDonated: 'asdasdasd',
      });
      spyOn(component.registrationDetailsSubmitted, 'next').and.callThrough();
      component.register();
      expect(component.registrationForm.invalid).toBe(false);
      expect(component.registrationDetailsSubmitted.next).toHaveBeenCalled();
    });
  });

  describe('resetForm', () => {
    it('should reset form', () => {
      spyOn(component.registerForm, 'resetForm').and.callThrough();
      spyOn(component.registrationForm, 'reset').and.callThrough();
      component.resetForm();
      fixture.whenStable().then(() => {
        expect(component.registerForm.resetForm).toHaveBeenCalled();
      });
      expect(component.registrationForm.reset).toHaveBeenCalled();
    });
  });

  describe('openMap', () => {
    it('should open Map with the permanant address context', () => {
      const temporaryAddress = {
        lat: 1,
        long: 3,
      };
      const permanentAdrress = {
        lat: 1,
        long: 3,
      };
      component.openMap('permanent');
      expect(dialog.open).toHaveBeenCalled();
    });

    it('should open Map with the temporary address context', () => {
      const temporaryAddress = {
        lat: 1,
        long: 3,
      };
      const permanentAdrress = {
        lat: 1,
        long: 3,
      };
      component.openMap('temporaryAddress');
      expect(dialog.open).toHaveBeenCalled();
    });
  });
});
