import { useCallback, useEffect, useState } from 'react';

import Page from './components/Page';
import PageHeading from './components/Heading';
import TodoList from './components/TodoList';
import AddTodoForm, { AddTodoFormProps } from './components/AddTodoForm';
import type { Todo } from 'types';

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const handleNewTodo = useCallback<AddTodoFormProps['onSubmit']>(
    async (value) => {
      const { success, newTodo, message } = await fetch('/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: value }),
      }).then((res) => res.json());

      if (!success) return alert(message);
      setTodos((prev) => [...prev, newTodo as Todo]);
    },
    []
  );

  const handleTodoChange = useCallback(
    async ({
      id,
      ...updatedTodo
    }: Pick<Todo, 'id'> & Omit<Partial<Todo>, 'id'>) => {
      const { success, message } = await fetch(`/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodo),
      }).then((res) => res.json());
      if (!success) return alert(message);
      setTodos((prev) =>
        prev.map((todo) =>
          id === todo.id ? { ...todo, ...updatedTodo } : todo
        )
      );
    },
    []
  );

  const handleTodoDelete = useCallback(async (todoId: Todo['id']) => {
    const { success, message } = await fetch(`/todos/${todoId}`, {
      method: 'DELETE',
    }).then((res) => res.json());
    if (!success) return alert(message);
    setTodos((prev) => prev.filter(({ id }) => id !== todoId));
  }, []);

  useEffect(() => {
    const getTodos = async (): Promise<Todo[]> =>
      await (await fetch('/todos')).json();

    getTodos().then((todos) => {
      setLoading(false);
      setTodos(todos);
    });
  }, []);

  return (
    <Page>
      <PageHeading />
      <div className='todos-container'>
        <TodoList
          value={todos}
          onItemChange={handleTodoChange}
          onItemDelete={handleTodoDelete}
          loading={loading}
        />
        <AddTodoForm onSubmit={handleNewTodo} />
      </div>
    </Page>
  );
};

export default App;
