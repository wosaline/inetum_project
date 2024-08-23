import { Component, OnInit } from '@angular/core';
import { EventCardComponent } from '../event-card/event-card.component';
import { CommonModule } from '@angular/common';
import { HttpProviderService } from '../../services/http-provider.service';

@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [EventCardComponent, CommonModule],
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.css',
})
export class EventsListComponent implements OnInit {
  eventsList: any[] = [
    {
      title:
        'Long event Title For myAPP HHHH flgkdfjgvolbjdflgvbjdlmfjgvbdlmfjgblmdfjgmldfjgbdmfjgbdfmgbjdfmlgbjfdlm',
      description:
        'Un événement fait partie intégrante de la stratégie de communication d’une entreprise. Il peut s’agir d’une manifestation pour remercier ses collaborateurs et ses clients, informer d’un changement, célébrer une réussite… Dans tous les cas, un événement sert à faire passer un message et à promouvoir une entreprise. Une présentation écrite permet d’annoncer un événement grand public',
      date: '11/08/2024',
      location: 'Paris',
      time: '10h',
      capacity: 140,
    },
    {
      title: 'Long event Title For myAPP HHHH',
      description:
        'Un événement fait partie intégrante de la stratégie de communication d’une entreprise. Il peut s’agir d’une manifestation pour remercier ses collaborateurs et ses clients, informer d’un changement, célébrer une réussite… Dans tous les cas, un événement sert à faire passer un message et à promouvoir une entreprise. Une présentation écrite permet d’annoncer un événement grand public',
      date: '11/08/2024',
      location: 'Paris',
      time: '10h',
      capacity: 140,
    },
    {
      title: 'Long event Title For myAPP HHHH',
      description:
        'Un événement fait partie intégrante de la stratégie de communication d’une entreprise. Il peut s’agir d’une manifestation pour remercier ses collaborateurs et ses clients, informer d’un changement, célébrer une réussite… Dans tous les cas, un événement sert à faire passer un message et à promouvoir une entreprise. Une présentation écrite permet d’annoncer un événement grand public',
      date: '11/08/2024',
      location: 'Paris',
      time: '10h',
      capacity: 140,
    },
    {
      title: 'Long event Title For myAPP HHHH',
      description:
        'Un événement fait partie intégrante de la stratégie de communication d’une entreprise. Il peut s’agir d’une manifestation pour remercier ses collaborateurs et ses clients, informer d’un changement, célébrer une réussite… Dans tous les cas, un événement sert à faire passer un message et à promouvoir une entreprise. Une présentation écrite permet d’annoncer un événement grand public',
      date: '11/08/2024',
      location: 'Paris',
      time: '10h',
      capacity: 140,
    },
    {
      title: 'Long event Title For myAPP HHHH',
      description:
        'Un événement fait partie intégrante de la stratégie de communication d’une entreprise. Il peut s’agir d’une manifestation pour remercier ses collaborateurs et ses clients, informer d’un changement, célébrer une réussite… Dans tous les cas, un événement sert à faire passer un message et à promouvoir une entreprise. Une présentation écrite permet d’annoncer un événement grand public',
      date: '11/08/2024',
      location: 'Paris',
      time: '10h',
      capacity: 140,
    },
    {
      title: 'Long event Title For myAPP HHHH',
      description:
        'Un événement fait partie intégrante de la stratégie de communication d’une entreprise. Il peut s’agir d’une manifestation pour remercier ses collaborateurs et ses clients, informer d’un changement, célébrer une réussite… Dans tous les cas, un événement sert à faire passer un message et à promouvoir une entreprise. Une présentation écrite permet d’annoncer un événement grand public',
      date: '11/08/2024',
      location: 'Paris',
      time: '10h',
      capacity: 140,
    },
    {
      title: 'Long event Title For myAPP HHHH',
      description:
        'Un événement fait partie intégrante de la stratégie de communication d’une entreprise. Il peut s’agir d’une manifestation pour remercier ses collaborateurs et ses clients, informer d’un changement, célébrer une réussite… Dans tous les cas, un événement sert à faire passer un message et à promouvoir une entreprise. Une présentation écrite permet d’annoncer un événement grand public',
      date: '11/08/2024',
      location: 'Paris',
      time: '10h',
      capacity: 140,
    },
    {
      title: 'Long event Title For myAPP HHHH',
      description:
        'Un événement fait partie intégrante de la stratégie de communication d’une entreprise. Il peut s’agir d’une manifestation pour remercier ses collaborateurs et ses clients, informer d’un changement, célébrer une réussite… Dans tous les cas, un événement sert à faire passer un message et à promouvoir une entreprise. Une présentation écrite permet d’annoncer un événement grand public',
      date: '11/08/2024',
      location: 'Paris',
      time: '10h',
      capacity: 140,
    },
    {
      title: 'Long event Title For myAPP HHHH',
      description:
        'Un événement fait partie intégrante de la stratégie de communication d’une entreprise. Il peut s’agir d’une manifestation pour remercier ses collaborateurs et ses clients, informer d’un changement, célébrer une réussite… Dans tous les cas, un événement sert à faire passer un message et à promouvoir une entreprise. Une présentation écrite permet d’annoncer un événement grand public',
      date: '11/08/2024',
      location: 'Paris',
      time: '10h',
      capacity: 140,
    },
    {
      title: 'Long event Title For myAPP HHHH',
      description:
        'Un événement fait partie intégrante de la stratégie de communication d’une entreprise. Il peut s’agir d’une manifestation pour remercier ses collaborateurs et ses clients, informer d’un changement, célébrer une réussite… Dans tous les cas, un événement sert à faire passer un message et à promouvoir une entreprise. Une présentation écrite permet d’annoncer un événement grand public',
      date: '11/08/2024',
      location: 'Paris',
      time: '10h',
      capacity: 140,
    },
    {
      title: 'Long event Title For myAPP HHHH',
      description:
        'Un événement fait partie intégrante de la stratégie de communication d’une entreprise. Il peut s’agir d’une manifestation pour remercier ses collaborateurs et ses clients, informer d’un changement, célébrer une réussite… Dans tous les cas, un événement sert à faire passer un message et à promouvoir une entreprise. Une présentation écrite permet d’annoncer un événement grand public',
      date: '11/08/2024',
      location: 'Paris',
      time: '10h',
      capacity: 140,
    },
  ];

  constructor(private httpProviderService: HttpProviderService) {}
  ngOnInit(): void {
    // remove comments when API  it is ready
    //  this.loadCompartiments();
  }

  // loadCompartiments() {
  //   this.httpProviderService.getAllEvents().subscribe(
  //     (res) => {
  //       this.eventsList = res.body;
  //       console.log('Compartiments:', this.eventsList);
  //     },
  //     (error) => {
  //       console.error('Error fetching compartiments:', error);
  //     }
  //   );
  // }
}
