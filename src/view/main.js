import React, { Component } from 'react';
import { fetch_status } from '../controller/main.js';
import TableRows from './tablerow.js';

class MainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tables: []
        }

        this.display_status = this.display_status.bind(this);
        this.update_status = this.update_status.bind(this);
    }

    display_status(tables) {
        var rows = [];
        for (var i = 0; i < tables.length; i++) {
            rows.push(<TableRows tables={ tables[i] } index={ i } />);
        }
        return rows
    }

    update_status() {
        fetch_status(this);
    }

    render() {
        setTimeout(this.update_status, (1000));

        var rows = this.display_status(this.state['tables']);

        return (
            <div class="d-flex h-100 justify-content-center align-items-center flex-column">
                {rows}
            </div>
        );
    }
}

export default MainPage;