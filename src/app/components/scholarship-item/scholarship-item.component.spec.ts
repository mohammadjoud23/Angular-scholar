import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarshipItemComponent } from './scholarship-item.component';

describe('ScholarshipItemComponent', () => {
  let component: ScholarshipItemComponent;
  let fixture: ComponentFixture<ScholarshipItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScholarshipItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScholarshipItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
