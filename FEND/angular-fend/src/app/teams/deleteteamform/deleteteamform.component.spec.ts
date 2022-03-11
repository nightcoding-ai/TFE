import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteteamformComponent } from './deleteteamform.component';

describe('DeleteteamformComponent', () => {
  let component: DeleteteamformComponent;
  let fixture: ComponentFixture<DeleteteamformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteteamformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteteamformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
