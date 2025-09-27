import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndlessModePage } from './endless-mode-page';

describe('EndlessModePage', () => {
  let component: EndlessModePage;
  let fixture: ComponentFixture<EndlessModePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndlessModePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndlessModePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
