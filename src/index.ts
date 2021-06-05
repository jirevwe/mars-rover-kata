import commandLineArgs from 'command-line-args';
import commandLineUsage from 'command-line-usage';
import { optionDefinitions, sections } from './constants';
import { Rover } from './rover/rover';
import { RoverConfig } from './rover/typings';
import { Direction } from './rover/utils';

function run() {
  const usage = commandLineUsage(sections);

  try {
    const options = commandLineArgs(optionDefinitions);

    const requiredArgs = optionDefinitions
      .map((it) => it.name)
      .filter((it) => it !== 'help');
    const argKeys = Object.keys(options).filter((it) => it !== 'help');

    if (options.help || argKeys.length === 0) {
      console.log(usage);
      process.exit(0);
    }

    const missingArgs = [];
    for (const param of requiredArgs) {
      if (!argKeys.includes(param)) missingArgs.push(param);
    }

    if (missingArgs.length > 0) {
      console.log(`missing required arguments: ${missingArgs.join(', ')}`);
      console.log(usage);

      process.exit(1);
    }

    const config: RoverConfig = {
      direction: parseInt(Direction[options.direction]),
      x: parseInt(options['x-position']),
      y: parseInt(options['y-position'])
    };
    const rover = new Rover(config);

    const newCoordinates = rover.processCommandString(options.input);
    console.log(newCoordinates);
  } catch (error) {
    console.log(error.message);
    console.log(usage);

    process.exit(1);
  }
}

run();
