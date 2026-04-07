import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedGameMenu } from './saved-game-menu';

describe('SavedGameMenu', () => {
  let component: SavedGameMenu;
  let fixture: ComponentFixture<SavedGameMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedGameMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedGameMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
