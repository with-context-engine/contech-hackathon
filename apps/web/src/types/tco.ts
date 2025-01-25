export interface TCOLocation {
  address: string;
  lat: number;
  lng: number;
  tcoCount: number;
}

export interface TCOData {
  locations: TCOLocation[];
}
