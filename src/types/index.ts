export interface Todo {
  id: number;
  text: string;
  checked: boolean;
}
export interface RawTodo extends Omit<Todo, 'checked'> {
  checked: 0 | 1;
}
