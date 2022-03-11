import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateteamComponent } from './updateteam.component';

describe('UpdateteamComponent', () => {
  let component: UpdateteamComponent;
  let fixture: ComponentFixture<UpdateteamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateteamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
