import React, { Component } from 'react';

class TableRows extends Component {
    constructor(props) {
        super(props);

        this.state = {
            height: 0,
            mounted: false
        };

        this.draw_tables = this.draw_tables.bind(this);
        this.handle_resize = this.handle_resize.bind(this);
    }

    draw_tables(height, button_color) {
        var tab = [];
        var marg = height * .2
        var btn_color;
        if (button_color == 0) {
            btn_color = 'btn-light'
        } else {
            btn_color = 'btn-dark'
        }
        var active = ''

        for (var i = 0; i < this.props.tables.length; i++) {
            var color = '';
            switch (this.props.tables[i]['status']) {
                //available
                case("0"):
                    color = '#bbbbbb';
                    break;
                //unavailable
                case("1"):
                    color = '#ff2445';
                    break;
                //reserved
                case("2"):
                    color = '#8f26ff';
                    break;
                //semi-taken
                case("3"):
                    color = '#ffb129';
                    break;
                default:
                    color = '#000000';
                    break;
            }
            var square = (
                <div class="d-flex align-item-center flex-column" >
                    <div style={ { width:height, height:height, marginLeft:marg, marginRight:marg, marginTop:marg, 'backgroundColor':color } }></div>
                    <button class={`btn ${btn_color}`} style={ { marginLeft: marg, marginRight: marg } } >reserve</button>
                </div>
            );

            tab.push(square);
        }

        return tab;
    }

    handle_resize() {
        var height = this.divElement.clientHeight
        this.setState({
            height: height,
            mounted: true
        });
    }

    componentDidMount() {
        this.handle_resize()

        window.addEventListener('resize', this.handle_resize)
    }

    render() {
        var color
        var color_button
        if (this.props.index % 2 === 0) {
            color = '#444444'
            color_button = 0
        }
        else {
            color = '#ffffff'
            color_button = 1
        }

        var height = this.state['height'] * .6;
        var t;
        if (this.state['mounted']) {
            t = this.draw_tables(height, color_button);
        }

        return (
            <div class="d-flex h-25 justify-content-center align-item-center" ref={ (divElement)=> this.divElement = divElement } style={ { 'backgroundColor': color } } >
                {t}
            </div>
        );
    }
}

export default TableRows;