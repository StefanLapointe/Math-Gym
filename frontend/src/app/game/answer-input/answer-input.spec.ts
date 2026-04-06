import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerInput } from './answer-input';

describe('AnswerInput', () => {
  let component: AnswerInput;
  let fixture: ComponentFixture<AnswerInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnswerInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnswerInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
