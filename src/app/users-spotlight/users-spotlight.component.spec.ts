import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from '../app-routing.module';

import { UsersSpotlightComponent } from './users-spotlight.component';

describe('UsersSpotlightComponent', () => {
  let component: UsersSpotlightComponent;
  let fixture: ComponentFixture<UsersSpotlightComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersSpotlightComponent ],
      imports: [ FontAwesomeModule, AppRoutingModule ]
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
