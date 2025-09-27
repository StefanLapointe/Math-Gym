import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutineModeList } from './routine-mode-list';

describe('RoutineModeList', () => {
  let component: RoutineModeList;
  let fixture: ComponentFixture<RoutineModeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutineModeList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutineModeList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
