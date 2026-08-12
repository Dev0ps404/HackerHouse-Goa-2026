export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string | null;
  imageElement: HTMLImageElement | null;
  zoom: number;
  positionX: number;
  positionY: number;
}

export interface BuilderData {
  photo: HTMLImageElement | null;
  name: string;
  role: string;
  stack: string;
  builderClass: string;
  builderId: string;
  zoom: number;
  positionX: number;
  positionY: number;
}
