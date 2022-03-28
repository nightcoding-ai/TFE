import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinrequestlistComponent } from './joinrequestlist.component';

describe('JoinrequestlistComponent', () => {
  let component: JoinrequestlistComponent;
  let fixture: ComponentFixture<JoinrequestlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinrequestlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinrequestlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
