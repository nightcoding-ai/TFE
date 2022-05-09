import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerListElementComponent } from './player-list-element.component';

describe('PlayerListElementComponent', () => {
  let component: PlayerListElementComponent;
  let fixture: ComponentFixture<PlayerListElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerListElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
