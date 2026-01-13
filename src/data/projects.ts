export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  location?: string;
  imageUrl: string;
  images?: string[];
  description?: string;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'THE IRON[Y] OF IRON',
    category: 'Architecture',
    year: '2025',
    location: 'Kiruna, Sweden',
    imageUrl: '/ironyofiron.jpeg',
    images: ['/ironyofiron.jpeg'],
    description: 'This project explores the post-extraction landscape of Kiruna, proposing a new way of inhabiting the mine-scape after the relocation of the city. It focuses on the reuse of mining infrastructure and the ecological restoration of the site.',
  },
  {
    id: '2',
    title: 'Appendix - The Master Degree Project',
    category: 'Urban Design',
    year: '2025',
    location: 'Stockholm, Sweden',
    imageUrl: '/ironyofiron.jpeg',
    images: ['/ironyofiron.jpeg'],
    description: 'Järvafältet is a large green wedge in Stockholm. This project proposes a strategy to integrate productive landscapes into the existing recreational areas, enhancing food security and social cohesion in the surrounding neighborhoods.',
  },
  {
    id: '3',
    title: 'The Fading Edge',
    category: 'Architecture',
    year: '2024',
    imageUrl: '/ironyofiron.jpeg',
    images: ['/ironyofiron.jpeg'],
    description: 'A housing typology that integrates livestock farming within the domestic space, exploring the relationship between humans and animals in a rural setting.',
  },
  {
    id: '4',
    title: 'DREAMING BIGGER',
    category: 'Architecture',
    year: '2024',
    imageUrl: '/ironyofiron.jpeg',
    images: ['/ironyofiron.jpeg'],
    description: 'A hybrid building in the Gasverket area, combining industrial heritage with new residential and commercial functions.',
  },
  {
    id: '5',
    title: 'ECOBAY',
    category: 'Urban Design',
    year: '2021',
    imageUrl: '/ironyofiron.jpeg',
    images: ['/ironyofiron.jpeg'],
    description: 'An ecological laboratory in Södertälje, focusing on water management and biodiversity enhancement in an urban context.',
  },
  {
    id: '6',
    title: 'FLADDERMUS FARSTA',
    category: 'Research',
    year: '2023',
    imageUrl: '/ironyofiron.jpeg',
    images: ['/ironyofiron.jpeg'],
    description: 'A research project mapping the underground spaces of Stockholm, revealing the hidden infrastructure and potential for future development.',
  },
  {
    id: '7',
    title: 'Dhamachunda',
    category: 'Architecture',
    year: '2019 - 2023',
    imageUrl: '/ironyofiron.jpeg',
    images: ['/ironyofiron.jpeg'],
  },
  {
    id: '8',
    title: 'Sacred Groves',
    category: 'Architecture',
    year: '2022 - 2023',
    imageUrl: '/ironyofiron.jpeg',
    images: ['/ironyofiron.jpeg'],
  },
  {
    id: '9',
    title: 'Dreamweaving | G20 Exhibition',
    category: 'Urban Design',
    year: '2022',
    imageUrl: '/ironyofiron.jpeg',
    images: ['/ironyofiron.jpeg'],
  },
  {
    id: '10',
    title: 'Kalainagaram',
    category: 'Urban Design',
    year: '2022',
    imageUrl: '/ironyofiron.jpeg',
    images: ['/ironyofiron.jpeg'],
  },
  {
    id: '11',
    title: 'TRANSIT[ION]',
    category: 'Research',
    year: '2021',
    imageUrl: '/ironyofiron.jpeg',
    images: ['/ironyofiron.jpeg'],
  },
  {
    id: '12',
    title: 'BACHELOR CULMINATION',
    category: 'Research',
    year: '2016-2020',
    imageUrl: '/ironyofiron.jpeg',
    images: ['/ironyofiron.jpeg'],
  },
];
