import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerChatbotComponent } from './career-chatbot-component';

describe('CareerChatbotComponent', () => {
  let component: CareerChatbotComponent;
  let fixture: ComponentFixture<CareerChatbotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareerChatbotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareerChatbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
