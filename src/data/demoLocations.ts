import { Coordinates, LocalizedText } from '../types/temple';

export interface DemoStartingPoint {
  id: string;
  label: LocalizedText;
  shortLabel: LocalizedText;
  coordinates: Coordinates;
}

export const DEMO_STARTING_POINTS: DemoStartingPoint[] = [
  {
    id: 'demo-main-gate',
    label: {
      en: 'Shirdi Temple Main Entrance',
      hi: 'शिरडी मंदिर मुख्य प्रवेश द्वार',
    },
    shortLabel: {
      en: 'Main Gate',
      hi: 'मुख्य द्वार',
    },
    coordinates: {
      latitude: 19.7669,
      longitude: 74.4774,
    },
  },
  {
    id: 'demo-dwarkamai-courtyard',
    label: {
      en: 'Near Dwarkamai Courtyard',
      hi: 'द्वारकामाई प्रांगण के पास',
    },
    shortLabel: {
      en: 'Dwarkamai Area',
      hi: 'द्वारकामाई क्षेत्र',
    },
    coordinates: {
      latitude: 19.7661,
      longitude: 74.4764,
    },
  },
  {
    id: 'demo-lendi-gate',
    label: {
      en: 'Near Lendi Garden Gate',
      hi: 'लेंडी बाग द्वार के पास',
    },
    shortLabel: {
      en: 'Lendi Gate',
      hi: 'लेंडी द्वार',
    },
    coordinates: {
      latitude: 19.7679,
      longitude: 74.4777,
    },
  },
];
