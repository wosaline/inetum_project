import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEventModalComponent } from './edit-event-modal.component';

describe('EditEventModalComponent', () => {
  let component: EditEventModalComponent;
  let fixture: ComponentFixture<EditEventModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEventModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEventModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
