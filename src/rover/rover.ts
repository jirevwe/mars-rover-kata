export class Rover {
  position: any;
  direction: number;

  constructor(readonly config) {
    this.direction = config.direction;
    this.position = { x: config.x, y: config.y };
  }
}
