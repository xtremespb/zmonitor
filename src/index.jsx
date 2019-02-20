import React from 'react';
import ReactDOM from 'react-dom';

import ZMTable from './components/ZMTable.jsx';
import ZMSystem from './components/ZMSystem.jsx';

import '../node_modules/mini.css/dist/mini-dark.min.css';

ReactDOM.render(
    (
        <>
            <h1>zMonitor GUI</h1>
            <ZMSystem />
            <ZMTable />
        </>
    ),
    document.getElementById('app')
);
