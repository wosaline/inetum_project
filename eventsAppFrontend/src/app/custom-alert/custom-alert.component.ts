import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AlertComponent, ButtonCloseDirective, ButtonDirective, TemplateIdDirective } from '@coreui/angular';

@Component({
  selector: 'app-custom-alert',
  standalone: true,
  imports: [AlertComponent, TemplateIdDirective, ButtonCloseDirective, ButtonDirective, CommonModule],
  templateUrl: './custom-alert.component.html',
  styleUrl: './custom-alert.component.css',
})
export class CustomAlertComponent {
  @Input() message: string = '';

  // Méthode pour masquer l'alerte
  hideAlert() {
    this.message = '';
  }
}
