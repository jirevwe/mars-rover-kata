export const Direction = Object.freeze({
  NORTH: 0,
  SOUTH: 2,
  EAST: 1,
  WEST: 3
});

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
  }
}
