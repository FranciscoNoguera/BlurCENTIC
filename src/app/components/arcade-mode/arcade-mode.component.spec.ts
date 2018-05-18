import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcadeModeComponent } from './arcade-mode.component';

describe('ArcadeModeComponent', () => {
  let component: ArcadeModeComponent;
  let fixture: ComponentFixture<ArcadeModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArcadeModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArcadeModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
