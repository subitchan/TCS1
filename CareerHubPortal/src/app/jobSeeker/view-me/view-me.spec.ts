import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMe } from './view-me';

describe('ViewMe', () => {
  let component: ViewMe;
  let fixture: ComponentFixture<ViewMe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
