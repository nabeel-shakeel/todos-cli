import fetch from 'node-fetch';
import { fetchTodos, displayTodos } from '../src/index';

jest.mock('node-fetch', () => jest.fn());

describe('fetchTodos', () => {
  it('should fetch 20 even numbered todos', async () => {
    const mockData = Array.from({ length: 20 }, (_, i) => ({
      id: (i + 1) * 2,
      userId: 1,
      title: `Todo ${(i + 1) * 2}`,
      completed: i % 2 === 0,
    }));

    (fetch as jest.Mock).mockImplementation((url) => {
      const id = parseInt(url.split('/').pop(), 10);
      return Promise.resolve({
        json: () => mockData.find((todo) => todo.id === id),
      });
    });

    const todos = await fetchTodos(20, true);
    expect(todos).toHaveLength(20);
    expect(todos[0].id).toBe(2);
    expect(todos[19].id).toBe(40);
  });

  it('should fetch 20 odd numbered todos', async () => {
    const mockData = Array.from({ length: 20 }, (_, i) => ({
      id: i * 2 + 1,
      title: `Todo ${i + 1}`,
      completed: i % 2 !== 0,
    }));

    (fetch as jest.Mock).mockImplementation((url) => {
      const id = parseInt(url.split('/').pop(), 10);
      return Promise.resolve({
        json: () => mockData.find((todo) => todo.id === id),
      });
    });

    const todos = await fetchTodos(20, false);
    expect(todos).toHaveLength(20);
    expect(todos[0].id).toBe(1);
    expect(todos[19].id).toBe(39);
  });
});

describe('displayTodos', () => {
  it('should display todos in table format', () => {
    console.log = jest.fn();

    const todos = [
      { id: 2, userId: 1, title: 'Todo 1', completed: false },
      { id: 4, userId: 1, title: 'Todo 2', completed: true },
    ];

    displayTodos(todos);
    expect(console.log).toHaveBeenCalled();
  });
});
