/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { hydrateRoot } from 'react-dom/client';

import App from './App';

hydrateRoot(document, <App />);
