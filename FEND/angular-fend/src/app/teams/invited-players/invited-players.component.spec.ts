import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitedPlayersComponent } from './invited-players.component';

describe('InvitedPlayersComponent', () => {
  let component: InvitedPlayersComponent;
  let fixture: ComponentFixture<InvitedPlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitedPlayersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitedPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
