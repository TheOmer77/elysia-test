import { Elysia, type ErrorHandler } from 'elysia';
import { staticPlugin } from '@elysiajs/static';
import { swagger } from '@elysiajs/swagger';
import type { ElysiaSwaggerConfig } from '@elysiajs/swagger/src/types';

import router from './routes';

await Bun.build({
  entrypoints: ['./src/frontend/index.tsx'],
  outdir: './public',
});

const swaggerConfig: ElysiaSwaggerConfig = {
  documentation: {
    info: { title: 'Bun + Elysia + React test TODO app', version: '1.0.0' },
    tags: [
      { name: 'Frontend', description: 'Frontend React app' },
      {
        name: 'TODOs',
        description: 'Routes for interacting with the TODOs DB',
      },
    ],
  },
};

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

const app = new Elysia();

app.onError(errorHandler);

app.use(staticPlugin());
app.use(swagger(swaggerConfig));

app.use(router);

app.listen(3000, ({ hostname, port }) =>
  console.log(`Server is running at ${hostname}:${port}`)
);
