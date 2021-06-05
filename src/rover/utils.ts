export enum Direction {
  NORTH = 0,
  SOUTH = 2,
  EAST = 1,
  WEST = 3
}

export function directionMapping(direction: number) {
  switch (direction) {
    case Direction.NORTH:
      return { x: 0, y: 1 };
    case Direction.SOUTH:
      return { x: 0, y: -1 };
    case Direction.EAST:
      return { x: 1, y: 0 };
    case Direction.WEST:
      return { x: -1, y: 0 };
    default:
      throw new Error(`${direction} is not a valid direction`);
  }
}

export function toHumanReadableDirection(direction: number) {
  switch (direction) {
    case Direction.NORTH:
      return 'NORTH';
    case Direction.SOUTH:
      return 'SOUTH';
    case Direction.EAST:
      return 'EAST';
    case Direction.WEST:
      return 'WEST';
    default:
      throw new Error(`${direction} is not a valid direction`);
  }
}
