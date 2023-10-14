import { Elysia } from 'elysia';
import { createElement } from 'react';
import { renderToReadableStream } from 'react-dom/server';

import todosRouter from './todos';
import App from 'frontend/App';

const router = new Elysia();

router.get('/', async () => {
  const page = createElement(App);
  const stream = await renderToReadableStream(page, {
    bootstrapScripts: ['/public/index.js'],
  });

  return new Response(stream, { headers: { 'Content-Type': 'text/html' } });
});
router.group('/todos', (group) => group.use(todosRouter));

export default router;
