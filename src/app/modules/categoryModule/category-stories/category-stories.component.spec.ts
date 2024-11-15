import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryStoriesComponent } from './category-stories.component';

describe('CategoryStoriesComponent', () => {
  let component: CategoryStoriesComponent;
  let fixture: ComponentFixture<CategoryStoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryStoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
