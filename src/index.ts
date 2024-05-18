
import { Command } from 'commander';
import { table } from 'table';
import { red, cyan, magenta } from 'kolorist';

interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const API_URL = 'https://jsonplaceholder.typicode.com/todos';
const program = new Command();

program
  .name('td')
  .description('A utility to track your todos from the command line')
  .version('1.0.0');

// available options
program
  .option('-n, --number <number>', 'number of todos', '20')
  .option('-e, --even', 'fetch even indexed todos')
  .option('--no-even', 'fetch odd indexed todos')

// process command line args from user
program.parse(process.argv);
const options = program.opts();

export const fetchTodos = async (number: number, even: boolean) => {
  const promises = [];
  for (let i = 1; promises.length < number; i++) {
    if ((even && i % 2 === 0) || (!even && i % 2 !== 0)) {
      promises.push(fetch(`${API_URL}/${i}`).then(res => res.json()));
    }
  }
  const results: ITodo[] = await Promise.all(promises);
  return results;
};

export const displayTodos = (todos: ITodo[]) => {
  // header for table
  const data = [[magenta('Id'), magenta('Title'), magenta('Completed')]];

  todos.forEach((todo) => {
    data.push([String(todo.id), todo.title, String(todo.completed)]);
  });

  console.log(table(data));
};

async function init() {
  try {
    console.log(cyan('\nStart Fetching todos...\n'));
    // By default, fetch even todos
    const todos = await fetchTodos(parseInt(options.number), options.even ?? true);
    displayTodos(todos);
  } catch (error) {
    console.error(red(`✖ Couldn't start the process. Error: ${error}`));
  }
}

// calling the main function
init();
