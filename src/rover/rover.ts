import { RoverConfig, Vector2 } from './typings';
import { Direction, directionMapping, toHumanReadableDirection } from './utils';

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

  moveForward() {
    this.position.x += directionMapping(this.direction).x;
    this.position.y += directionMapping(this.direction).y;
  }

  moveBackward() {
    this.position.x -= directionMapping(this.direction).x;
    this.position.y -= directionMapping(this.direction).y;
  }

  processCommandString(input: string): string {
    const inputToFunctionMapping = {
      L: this.turnLeft,
      R: this.turnRight,
      F: this.moveForward,
      B: this.moveBackward
    };

    const validInput = Object.keys(inputToFunctionMapping);
    for (const char of input) {
      if (!validInput.includes(char)) {
        throw new Error(
          `invalid character detected in input, directions must be one of [${validInput.join(
            ', '
          )}]`
        );
      }

      const roverFunction = inputToFunctionMapping[char];
      roverFunction.bind(this)();
    }

    const humanReadableDirection = toHumanReadableDirection(this.direction);
    return `(${this.position.x}, ${this.position.y}) ${humanReadableDirection}}`;
  }
}
