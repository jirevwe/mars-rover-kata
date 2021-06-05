import { Rover } from './rover/rover';
import { RoverConfig } from './rover/typings';
import { Direction } from './rover/utils';

function run() {
  const config: RoverConfig = {
    direction: Direction.EAST,
    x: 0,
    y: 0
  };
  const rover = new Rover(config);

  const out = rover.processCommandString('LLFF');
  console.log(out);
}

run();
