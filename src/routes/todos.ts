import { Elysia } from 'elysia';
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from 'controllers/todos';
import {
  createTodoHook,
  deleteTodoHook,
  todosSwaggerTags,
  updateTodoHook,
} from 'hooks/todos';

const todosRouter = new Elysia();

todosRouter.get('/', getTodos, todosSwaggerTags);
todosRouter.post('/', createTodo, createTodoHook);
todosRouter.put('/:id', updateTodo, updateTodoHook);
todosRouter.delete('/:id', deleteTodo, deleteTodoHook);

export default todosRouter;
