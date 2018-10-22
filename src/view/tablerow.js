import React, { Component } from 'react';
import { render } from 'react-dom';

class TableRows extends Component {
    constructor(props) {
        super(props);

        this.state = {
            height: 0,
            mounted: false
        };

        this.draw_tables = this.draw_tables.bind(this);
    }

    draw_tables(height) {
        var tab = [];
        for (var i = 0; i < this.props.tables.length; i++) {
            var color = '';
            switch (this.props.tables[i]) {
                //available
                case(0):
                    color = '#bbbbbb';
                    break;
                //unavailable
                case(1):
                    color = '#ff2445';
                    break;
                //reserved
                case(2):
                    color = '#8f26ff';
                    break;
                //semi-taken
                case(3):
                    color = '#ffb129';
                    break;
                default:
                    color = '#000000';
                    break;
            }
            var square = (
                <div style={ { width:height, height:height, marginLeft:'20px', marginRight:'20px', marginTop:'20px', marginBottom:'20px', 'background-color':color } }></div>
            );

            tab.push(square);
        }

        return tab;
    }

    componentDidMount() {
        var height = this.divElement.clientHeight
        this.setState({
            height: height,
            mounted: true
        });
    }

    render() {
        var color = 0
        if (this.props.index % 2 === 0) {
            color = '#444444'
        }
        else {
            color = '#ffffff'
        }

        var height = this.state['height'] - 40;
        var t;
        if (this.state['mounted']) {
            var t = this.draw_tables(height);
        }

        return (
            <div class="d-flex h-25 justify-content-center align-item-center" ref={ (divElement)=> this.divElement = divElement } style={ { 'background-color': color } } >
                {t}
            </div>
        );
    }
}

export default TableRows;