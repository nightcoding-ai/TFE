import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTeamProfileComponent } from './my-team-profile.component';

describe('MyTeamProfileComponent', () => {
  let component: MyTeamProfileComponent;
  let fixture: ComponentFixture<MyTeamProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTeamProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTeamProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
