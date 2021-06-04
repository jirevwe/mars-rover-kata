import { RoverConfig, Vector2 } from './typings';

export class Rover {
  position: Vector2;
  direction: number;

  constructor(readonly config: RoverConfig) {
    this.direction = config.direction;
    this.position = { x: config.x, y: config.y };
  }

  turnLeft() {}
}
