import { t } from 'elysia';

export const createTodoSchema = {
  body: t.Object({ text: t.String() }),
};
export const updateTodoSchema = {
  params: t.Object({ id: t.Numeric() }),
  body: t.Object({
    text: t.Optional(t.String()),
    checked: t.Optional(t.Boolean()),
  }),
};
export const deleteTodoSchema = {
  params: t.Object({ id: t.Numeric() }),
};
