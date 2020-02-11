import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwimFormComponent } from './swim-form.component';

describe('SwimFormComponent', () => {
  let component: SwimFormComponent;
  let fixture: ComponentFixture<SwimFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwimFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwimFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
