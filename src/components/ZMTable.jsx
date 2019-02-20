import React, { Component } from 'react';
import axios from 'axios';

export default class ZMTable extends Component {
    state = {
        processes: []
    }

    fetchProcessList = () => {
        axios({
            method: 'GET',
            url: '/process/list',
            responseType: 'json',
            data: {}
        }).then(response => {
            if (response.data.statusCode === 200 && response.data.data) {
                setTimeout(this.fetchProcessList, 1500);
                return this.setState({
                    processes: response.data.data
                });
            }
            this.setState({
                processes: []
            });
        }).catch(error => {
            console.error(error);
            this.setState({
                processes: []
            });
        });
    }

    componentDidMount = () => {
        this.fetchProcessList();
    }

    getProcesses = () => this.state.processes.map(item => (
        <tr key={item.pid}>
            <td>{item.name}</td>
            <td>{item.pid}</td>
            <td>{item.ppid}</td>
        </tr>
    ));

    render = () => (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>PID</th>
                    <th>PPID</th>
                </tr>
            </thead>
            <tbody>
                {this.getProcesses()}
            </tbody>
        </table>
    );
}
