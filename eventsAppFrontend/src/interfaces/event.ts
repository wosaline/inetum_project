import { User } from "./user";

export interface Event {
  id?: number; // optionnel pour la création
  description: string;
  date: string;
  time: string;
  capacity: number;
  private: boolean;
  createdBy: User|number;
  createdAt?: Date;
  updatedAt?: Date;
  title: string;
  location: string;
  logo?: string;
}