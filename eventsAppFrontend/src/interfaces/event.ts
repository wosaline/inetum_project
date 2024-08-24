export interface Event {
  id?: number; // optionnel pour la création
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
}