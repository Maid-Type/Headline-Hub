import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificnewsComponent } from './specificnews.component';

describe('SpecificnewsComponent', () => {
  let component: SpecificnewsComponent;
  let fixture: ComponentFixture<SpecificnewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecificnewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificnewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
