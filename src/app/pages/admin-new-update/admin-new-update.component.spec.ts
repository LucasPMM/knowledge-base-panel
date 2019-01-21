import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewUpdateComponent } from './admin-new-update.component';

describe('AdminNewUpdateComponent', () => {
  let component: AdminNewUpdateComponent;
  let fixture: ComponentFixture<AdminNewUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNewUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
