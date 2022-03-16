import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanplayerComponent } from './banplayer.component';

describe('BanplayerComponent', () => {
  let component: BanplayerComponent;
  let fixture: ComponentFixture<BanplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BanplayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BanplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
