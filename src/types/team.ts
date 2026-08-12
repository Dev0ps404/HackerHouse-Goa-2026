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
