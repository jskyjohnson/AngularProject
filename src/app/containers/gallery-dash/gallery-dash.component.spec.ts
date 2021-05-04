import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryDashComponent } from './gallery-dash.component';

describe('GalleryDashComponent', () => {
  let component: GalleryDashComponent;
  let fixture: ComponentFixture<GalleryDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
