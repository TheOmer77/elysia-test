import db from 'db';
import type { RawTodo, Todo } from 'types';

const transformRawTodo = ({ checked, ...rest }: RawTodo): Todo => ({
  ...rest,
  checked: Boolean(checked),
});

export const getTodos = () =>
  (db.query('SELECT * FROM todos').all() as RawTodo[]).map(transformRawTodo);

export const createTodo = ({
  body: { text },
}: {
  body: Pick<Todo, 'text'>;
}) => {
  const newTodo = db
    .query(
      `INSERT INTO todos (text)
VALUES($text)
RETURNING *;`
    )
    .get(text) as RawTodo;
  return { success: !!newTodo, newTodo: transformRawTodo(newTodo) };
};

export const updateTodo = ({
  params: { id },
  body: { text, checked },
}: {
  params: Pick<Todo, 'id'>;
  body: Partial<Omit<Todo, 'id'>>;
}) => {
  const hasText = typeof text === 'string',
    hasChecked = typeof checked === 'boolean';

  if (!hasText && !hasChecked)
    throw new Error('No updated values were provided.');
  const updatedTodo = db
    .query(
      `UPDATE todos
SET ${[
        typeof text === 'string' && 'text = $text',
        typeof checked === 'boolean' && 'checked = $checked',
      ]
        .filter(Boolean)
        .join(', ')}
WHERE id = $id
RETURNING *;`
    )
    .get({
      $id: id,
      ...(hasText ? { $text: text } : {}),
      ...(hasChecked ? { $checked: Number(checked) } : {}),
    }) as RawTodo;
  return { success: !!updatedTodo, updatedTodo: transformRawTodo(updatedTodo) };
};

export const deleteTodo = ({
  params: { id },
}: {
  params: Pick<Todo, 'id'>;
}) => {
  const deletedTodo = db
    .query(
      `DELETE FROM todos
WHERE id = $id
RETURNING *;`
    )
    .get(id) as RawTodo;
  return { success: !!deletedTodo, deletedTodo: transformRawTodo(deletedTodo) };
};
