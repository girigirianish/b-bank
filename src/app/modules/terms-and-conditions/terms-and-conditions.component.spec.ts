import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BLOOD_BANK_REST_URL } from 'src/app/app-rest.injection-token';
import { PagesService } from '../shared/services';

import { TermsAndConditionsComponent } from './terms-and-conditions.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';

fdescribe('TermsAndConditionsComponent', () => {
  let component: TermsAndConditionsComponent;
  let fixture: ComponentFixture<TermsAndConditionsComponent>;
  let debugElement: DebugElement;
  let pageService: PagesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TermsAndConditionsComponent],
      providers: [
        PagesService,
        {
          provide: BLOOD_BANK_REST_URL,
          useFactory: () => {
            return '/api/admin/api';
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsAndConditionsComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    pageService = debugElement.injector.get(PagesService);
    spyOn(pageService, 'getPageContent').and.returnValue(
      Promise.resolve('mock page content')
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call page service method  get page content on component initialization', () => {
    component.ngOnInit();
    expect(pageService.getPageContent).toHaveBeenCalled();
  });
});
