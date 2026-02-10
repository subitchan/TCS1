import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMe } from './update-me';

describe('UpdateMe', () => {
  let component: UpdateMe;
  let fixture: ComponentFixture<UpdateMe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateMe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
