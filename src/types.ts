export interface MemoryPhoto {
  id: string;
  title: string;
  caption: string;
  imageUrl?: string;
  date?: string;
}

export interface TributeConfig {
  sisterName: string;
  brotherName: string;
  collegeName?: string;
  customLetter?: string;
  bgShadowOpacity?: number;
  bgShadowImage?: string;
}

export interface AudioHighlightSegment {
  id: string;
  title: string;
  subtitle: string;
  startTime: number; // in seconds
  endTime: number;   // in seconds
  startFormatted: string;
  endFormatted: string;
  lyrics: string;
  lyricsHindi: string;
}

export interface AudioSegmentConfig {
  startTime: number; // in seconds (e.g. 33 for 0:33)
  endTime: number;   // in seconds (e.g. 59 for 0:59)
  isSegmentEnabled: boolean;
}

export interface AudioTrack {
  id: string;
  name: string;
  subtitle: string;
  type: 'preset' | 'synth' | 'uploaded' | 'url';
  url?: string;
  defaultStartTime?: number;
  defaultEndTime?: number;
  segments?: AudioHighlightSegment[];
}

