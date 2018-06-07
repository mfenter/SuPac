import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import Root from './containers/Root';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Root/>,
    document.getElementById('root'),
);
registerServiceWorker();
