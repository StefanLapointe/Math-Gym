import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutineModePage } from './routine-mode-page';

describe('RoutineModePage', () => {
  let component: RoutineModePage;
  let fixture: ComponentFixture<RoutineModePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutineModePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutineModePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
