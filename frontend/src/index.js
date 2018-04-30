import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App {...window.props}/>,
    window.react_mount,
);
registerServiceWorker();
