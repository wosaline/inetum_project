// src/app/utils.ts
export const images: string[] = [
  'event0.jpeg',
  'event1.webp',
  'event2.jpeg',
  'event3.jpeg',
  'event4.jpeg',
  'event5.jpeg',
  'event6.jpeg',
  'event7.jpeg',
  'event8.jpeg',
  'event9.jpeg',
  'event10.jpeg',
  'event11.jpeg',
  'event12.jpeg',
  'event13.jpeg',
  'event14.webp',
  'event15.jpeg',
  'event16.jpeg',
  'event17.jpeg',
  'event18.webp',
];

// Fonction pour obtenir une image aléatoire
export function getRandomImage(): string {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}
