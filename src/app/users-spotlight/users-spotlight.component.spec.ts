import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSpotlightComponent } from './users-spotlight.component';

describe('UsersSpotlightComponent', () => {
  let component: UsersSpotlightComponent;
  let fixture: ComponentFixture<UsersSpotlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersSpotlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersSpotlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
