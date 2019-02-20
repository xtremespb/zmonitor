import React, { Component } from 'react';
import axios from 'axios';

export default class ZMSystem extends Component {
    state = {
        memoryTotal: '-',
        memoryFree: '-',
        averageCPU: [0, 0, 0],
        error: false
    }

    fetchSystemInfo = () => {
        axios({
            method: 'GET',
            url: '/system',
            responseType: 'json',
            data: {}
        }).then(response => {
            if (response.data.statusCode === 200 && response.data.data) {
                setTimeout(this.fetchSystemInfo, 1500);
                return this.setState({
                    memoryTotal: response.data.data.totalmem,
                    memoryFree: response.data.data.freemem,
                    averageCPU: response.data.data.loadavg,
                    error: false
                });
            }
            return this.setState({
                memoryTotal: '-',
                memoryFree: '-',
                averageCPU: [0, 0, 0],
                error: true
            });
        }).catch(() => {
            this.setState({
                memoryTotal: '-',
                memoryFree: '-',
                averageCPU: [0, 0, 0],
                error: true
            });
        });
    }

    componentDidMount = () => {
        this.fetchSystemInfo();
    }

    render = () => (
        <>
            {this.state.error ? <span className="toast">Could not fetch the system status!</span> : null}
            <div className="container" style={{ padding: '0.25rem' }}>
                <div className="row">
                    <div className="card">
                        <div className="section">
                            <h3 className="doc">Memory (Free/Total)</h3>
                            <p className="doc">{this.state.memoryFree}/{this.state.memoryTotal}</p>
                        </div>
                    </div>
                    <div className={`card${this.state.averageCPU.find(item => item >= 0.5) ? ' error' : ''}`}>
                        <div className="section">
                            <h3 className="doc">CPU Load Average</h3>
                            <p className="doc">{this.state.averageCPU.map(item => String(item).substr(0, 5)).join('/')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
