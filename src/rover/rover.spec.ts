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

  test.each`
    config                                        | expected
    ${{ x: 0, y: 0, direction: Direction.EAST }}  | ${{ x: 1, y: 0, direction: Direction.EAST }}
    ${{ x: 0, y: 0, direction: Direction.NORTH }} | ${{ x: 0, y: 1, direction: Direction.NORTH }}
    ${{ x: 0, y: 1, direction: Direction.SOUTH }} | ${{ x: 0, y: 0, direction: Direction.SOUTH }}
    ${{ x: 1, y: 0, direction: Direction.WEST }}  | ${{ x: 0, y: 0, direction: Direction.WEST }}
  `(
    'should move a rover at ($config.x, $config.y) forward to ($expected.x, $expected.y)',
    ({ config, expected }) => {
      const rover = new Rover(config);

      rover.moveForward();

      const { x, y, direction } = expected;

      expect(rover.position.x).toBe(x);
      expect(rover.position.y).toBe(y);
      expect(rover.direction).toBe(direction);
    }
  );

  test.each`
    config                                        | expected
    ${{ x: 1, y: 0, direction: Direction.EAST }}  | ${{ x: 0, y: 0, direction: Direction.EAST }}
    ${{ x: 0, y: 1, direction: Direction.NORTH }} | ${{ x: 0, y: 0, direction: Direction.NORTH }}
    ${{ x: 0, y: 0, direction: Direction.SOUTH }} | ${{ x: 0, y: 1, direction: Direction.SOUTH }}
    ${{ x: 0, y: 0, direction: Direction.WEST }}  | ${{ x: 1, y: 0, direction: Direction.WEST }}
  `(
    'should move a rover at ($config.x, $config.y) backward to ($expected.x, $expected.y)',
    ({ config, expected }) => {
      const rover = new Rover(config);

      rover.moveBackward();

      const { x, y, direction } = expected;

      expect(rover.position.x).toBe(x);
      expect(rover.position.y).toBe(y);
      expect(rover.direction).toBe(direction);
    }
  );
});

describe('rover input processing test', () => {
  test.each`
    config                                                           | expected
    ${{ x: 0, y: 0, direction: Direction.NORTH, input: 'LL' }}       | ${'(0, 0) SOUTH'}
    ${{ x: 0, y: 0, direction: Direction.WEST, input: 'RR' }}        | ${'(0, 0) EAST'}
    ${{ x: 0, y: 0, direction: Direction.SOUTH, input: 'FF' }}       | ${'(0, -2) SOUTH'}
    ${{ x: 0, y: 0, direction: Direction.EAST, input: 'BB' }}        | ${'(-2, 0) EAST'}
    ${{ x: 4, y: 2, direction: Direction.EAST, input: 'FLFFFRFLB' }} | ${'(6, 4) NORTH'}
  `(
    "should validate that a rover can process an input string and report it's coordinates",
    ({ config, expected }) => {
      const rover = new Rover(config);

      const output = rover.processCommandString(config.input);

      expect(output).toMatch(expected);
    }
  );

  test.each`
    config                                                      | expected
    ${{ x: 0, y: 0, direction: Direction.NORTH, input: 'LEL' }} | ${'directions must be one of [L, R, F, B]'}
    ${{ x: 0, y: 0, direction: Direction.WEST, input: 'BRS' }}  | ${'directions must be one of [L, R, F, B]'}
  `(
    'should return an error while processing an input string',
    ({ config, expected }) => {
      const rover = new Rover(config);

      expect(() => rover.processCommandString(config.input)).toThrow(expected);
    }
  );
});
