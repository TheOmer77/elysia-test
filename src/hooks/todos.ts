import { t } from 'elysia';

export const todosSwaggerTags = { detail: { tags: ['TODOs'] } };

export const createTodoHook = {
  ...todosSwaggerTags,
  body: t.Object({ text: t.String() }),
};
export const updateTodoHook = {
  ...todosSwaggerTags,
  params: t.Object({ id: t.Numeric() }),
  body: t.Object({
    text: t.Optional(t.String()),
    checked: t.Optional(t.Boolean()),
  }),
};
export const deleteTodoHook = {
  ...todosSwaggerTags,
  params: t.Object({ id: t.Numeric() }),
};
