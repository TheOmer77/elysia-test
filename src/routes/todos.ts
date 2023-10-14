import { Elysia } from 'elysia';
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from 'controllers/todos';
import {
  createTodoSchema,
  deleteTodoSchema,
  updateTodoSchema,
} from 'schemas/todos';

const todosRouter = new Elysia();

todosRouter.get('/', getTodos);
todosRouter.post('/', createTodo, createTodoSchema);
todosRouter.put('/:id', updateTodo, updateTodoSchema);
todosRouter.delete('/:id', deleteTodo, deleteTodoSchema);

export default todosRouter;
