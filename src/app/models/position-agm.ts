


export class PositionAGM {
  public infowindow: any;
  public marker: any;
  constructor(
    public accuracy: number| null = null,
    public altitude: number | null = null,
    public altitudeAccuracy: number | null = null,
    public heading: number | null = null,
    public latitude: number| null = null,
    public longitude: number| null = null,
    public speed: number | null = null,
    public ID: number = null

  ) {

  }
}
