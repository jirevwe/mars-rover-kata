import { RoverConfig, Vector2 } from './typings';
import { Direction } from './utils';

export class Rover {
  position: Vector2;
  direction: number;
  private possibleDirections: number;

  constructor(readonly config: RoverConfig) {
    this.direction = config.direction;
    this.position = { x: config.x, y: config.y };
    this.possibleDirections = Object.keys(Direction).length;
  }

  turnLeft() {
    this.direction =
      (this.direction + this.possibleDirections - 1) % this.possibleDirections;
  }

  turnRight() {
    this.direction =
      (this.direction + this.possibleDirections + 1) % this.possibleDirections;
  }
}
