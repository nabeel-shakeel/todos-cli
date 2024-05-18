import { Command } from 'commander';
import { red, cyan } from 'kolorist';
import { fetchTodos, displayTodos } from './todos';

const program = new Command();

program
  .name('td')
  .description('A utility to track your todos from the command line')
  .version('1.0.0');

// available options
program
  .option('-n, --number <number>', 'number of todos', '20')
  .option('-e, --even', 'fetch even indexed todos')
  .option('--no-even', 'fetch odd indexed todos');

// process command line args from user
program.parse(process.argv);
const options = program.opts();

async function init() {
  try {
    console.log(cyan('\nStart Fetching todos...\n'));
    // By default, fetch even todos
    const todos = await fetchTodos(
      parseInt(options.number),
      options.even ?? true,
    );
    displayTodos(todos);
  } catch (error) {
    console.error(red(`✖ Couldn't start the process. Error: ${error}`));
  }
}

// calling the main function
init();
