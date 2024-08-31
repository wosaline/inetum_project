import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { EventsListComponent } from '../events-list/events-list.component';
import { HttpProviderService } from '../../services/http-provider.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [NavbarComponent, EventsListComponent, CommonModule, FormsModule],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css',
})
export class HomeComponentComponent implements OnInit {
  eventsList: any[] = [];
  filteredEvents: any[] = [];
  loading: boolean = true;
  isLoggedIn: boolean = false;
  showPrivateEvents: boolean = true; // Par défaut, afficher les événements privés si l'utilisateur est connecté

  constructor(
    private httpProviderService: HttpProviderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated(); // Vérification de l'état de connexion
    this.loadEvents();
  }

  loadEvents() {
    this.httpProviderService.getAllEvents().subscribe(
      (res) => {
        this.eventsList = res.body || [];
        // Filtrer les événements privés si l'utilisateur n'est pas connecté
        this.applyFilter(); // Appliquer le filtre initialement
        this.loading = false;
        // if (!this.isLoggedIn) {
        // this.eventsList = this.eventsList.filter((event) => !event.private);

        console.log('Events:', this.eventsList);
        this.eventsList = this.eventsList;
      },
      (error) => {
        console.error('Error fetching events:', error);
        this.loading = false;
      }
    );
  }
  togglePrivateEvents(): void {
    this.showPrivateEvents = !this.showPrivateEvents;
    this.applyFilter(); // Appliquer le filtre à chaque changement
    // this.loadEvents(); // Recharger les événements avec le nouveau filtre
  }
  applyFilter(): void {
    // Si l'utilisateur est connecté, appliquer le filtre basé sur la case à cocher
    if (this.isLoggedIn && !this.showPrivateEvents) {
      this.eventsList = this.eventsList.filter((event) => !event.private);
    } else {
      this.filteredEvents = this.eventsList;
    }
  }
}
