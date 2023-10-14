import { Elysia, type ErrorHandler } from 'elysia';
import { staticPlugin } from '@elysiajs/static';

import router from './routes';

await Bun.build({
  entrypoints: ['./src/frontend/index.tsx'],
  outdir: './public',
});

const app = new Elysia();

const errorHandler: ErrorHandler = ({
  error,
  set,
  code,
  path,
  request: { method },
}) => {
  switch (code) {
    case 'VALIDATION':
      set.status = 400;
      break;
    case 'PARSE':
    case 'INVALID_COOKIE_SIGNATURE':
      set.status = 401;
      break;
    case 'NOT_FOUND':
      set.status = 404;
      break;
    default:
      set.status = 500;
  }

  console.error(method, path, set.status);
  error.stack && console.error(error.stack);

  return { success: false, message: error.message };
};

app.onError(errorHandler);

app.use(staticPlugin());

app.use(router);

app.listen(3000, ({ hostname, port }) =>
  console.log(`Server is running at ${hostname}:${port}`)
);
