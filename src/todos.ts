import { table } from 'table';
import { magenta } from 'kolorist';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const fetchTodos = async (number: number, even: boolean) => {
  const promises = [];
  for (let i = 1; promises.length < number; i++) {
    if ((even && i % 2 === 0) || (!even && i % 2 !== 0)) {
      promises.push(fetch(`${API_URL}/${i}`).then((res) => res.json()));
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
