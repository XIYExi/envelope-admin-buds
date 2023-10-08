import i18next from 'i18next';
import React, {lazy} from 'react';
import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';
//import Example from './Example';

i18next.addResourceBundle('en', 'examplePage', en);
i18next.addResourceBundle('tr', 'examplePage', tr);
i18next.addResourceBundle('ar', 'examplePage', ar);

/*
const ExampleConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'example',
      element: <Example />,
    },
  ],
};

export default ExampleConfig;
*/

/**
 * Lazy load Example
 */


const Example = lazy(() => import('./Example').default);

const ExampleConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'example',
      element: <Example />,
    },
  ],
};

export default ExampleConfig;
