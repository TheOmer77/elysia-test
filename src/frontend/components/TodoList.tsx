import { Todo } from 'types';
import TodoListItem, { TodoListItemProps } from './TodoListItem';

interface TodoListProps {
  value: Todo[];
  onItemChange?: TodoListItemProps['onChange'];
  onItemDelete?: TodoListItemProps['onDelete'];
  loading?: boolean;
}

const TodoList = ({
  value = [],
  onItemChange,
  onItemDelete,
  loading = false,
}: TodoListProps) =>
  value.length > 0 ? (
    <ul className='todo-list'>
      {value.map((todo) => (
        <TodoListItem
          key={todo.id}
          value={todo}
          onChange={onItemChange}
          onDelete={onItemDelete}
        />
      ))}
    </ul>
  ) : (
    <span className='info-text'>
      {loading
        ? 'Loading...'
        : 'No TODOs added. You can add a TODO using the field below.'}
    </span>
  );

export default TodoList;
