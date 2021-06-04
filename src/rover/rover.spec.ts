import { Direction } from './utils';
import { Rover } from './rover';

describe('rover test sequence', () => {
  it.each`
    config
    ${{ x: 0, y: 0, direction: Direction.NORTH }}
    ${{ x: 0, y: 1, direction: Direction.SOUTH }}
    ${{ x: 1, y: 0, direction: Direction.EAST }}
    ${{ x: 1, y: 1, direction: Direction.WEST }}
  `('the rover should be initialised correctly', ({ config }) => {
    const rover = new Rover(config);

    expect(rover).toBeTruthy();
    expect(rover.position.x).toBe(config.x);
    expect(rover.position.y).toBe(config.y);
    expect(rover.direction).toBe(config.direction);
  });

  test.each`
    config                                        | expected
    ${{ x: 0, y: 0, direction: Direction.EAST }}  | ${{ x: 0, y: 0, direction: Direction.NORTH }}
    ${{ x: 0, y: 0, direction: Direction.NORTH }} | ${{ x: 0, y: 0, direction: Direction.WEST }}
    ${{ x: 0, y: 0, direction: Direction.SOUTH }} | ${{ x: 0, y: 0, direction: Direction.EAST }}
    ${{ x: 0, y: 0, direction: Direction.WEST }}  | ${{ x: 0, y: 0, direction: Direction.SOUTH }}
  `('should turn a rover 90 degrees to the left', ({ config, expected }) => {
    const rover = new Rover(config);

    rover.turnLeft();

    const { x, y, direction } = expected;

    expect(rover.position.x).toBe(x);
    expect(rover.position.y).toBe(y);
    expect(rover.direction).toBe(direction);
  });

  test.each`
    config                                        | expected
    ${{ x: 0, y: 0, direction: Direction.NORTH }} | ${{ x: 0, y: 0, direction: Direction.EAST }}
    ${{ x: 0, y: 0, direction: Direction.WEST }}  | ${{ x: 0, y: 0, direction: Direction.NORTH }}
    ${{ x: 0, y: 0, direction: Direction.EAST }}  | ${{ x: 0, y: 0, direction: Direction.SOUTH }}
    ${{ x: 0, y: 0, direction: Direction.SOUTH }} | ${{ x: 0, y: 0, direction: Direction.WEST }}
  `('should turn a rover 90 degrees to the right', ({ config, expected }) => {
    const rover = new Rover(config);

    rover.turnRight();

    const { x, y, direction } = expected;

    expect(rover.position.x).toBe(x);
    expect(rover.position.y).toBe(y);
    expect(rover.direction).toBe(direction);
  });
});
