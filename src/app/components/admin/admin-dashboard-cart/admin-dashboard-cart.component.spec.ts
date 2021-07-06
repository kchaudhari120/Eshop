import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardCartComponent } from './admin-dashboard-cart.component';

describe('AdminDashboardCartComponent', () => {
  let component: AdminDashboardCartComponent;
  let fixture: ComponentFixture<AdminDashboardCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDashboardCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
