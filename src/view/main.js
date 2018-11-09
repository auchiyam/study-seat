import React, { Component } from 'react';
import { fetch_status } from '../controller/main.js';
import TableRows from './tablerow.js';
import firebase from '../firestore'

class MainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tables: [],
            loading: true
        }

        this.db_ref = firebase.firestore().collection("chair")

        this.display_status = this.display_status.bind(this);
        this.initialize_status = this.initialize_status.bind(this);
        this.handle_resize = this.handle_resize.bind(this);
        this.draw_squares = this.draw_squares.bind(this);
        this.update_status = this.update_status.bind(this);
    }

    display_status(tables) {
        var rows = [];
        for (var i = 0; i < tables.length; i++) {
            rows.push(<TableRows tables={ tables[i] } key={i} index={ i } />);
        }
        return rows
    }

    initialize_status() {
        var this_main = this
        fetch_status(this).then(function (tables) {
            this_main.setState({
                tables: tables
            })
        }).then(function () {
            this_main.setState({
                loading: false
            })
        })
    }

    update_status = (ss) => {
        var tables = []
        var counter = -1

        ss.forEach(function(chair) {
            var chair_data = chair.data()
            var chair_status = chair_data['chair_status']
            var table_id = parseInt(chair_data['table_id'])
            var chair_id = chair.id

            //if the table id is further than the furthest point, fill the tables array with empty array until the table id is the last index
            if (counter < table_id) {
                var iter = table_id - counter

                for (var i = 0; i < iter; i++) {
                    tables.push([])
                }

                counter = table_id
            }

            tables[table_id].push({
                id: chair_id,
                status: chair_status
            })
        })

        this.setState({
            tables: tables
        })
    }

    draw_squares(height) {
        var squares = []
        var colors = ['#bbbbbb', '#ff2445', '#ffb129', '#8f26ff']
        var marg = height * .2
        for (var i = 0; i < 4; i++) {
            var square = <div style={ { width:height, height:height, marginLeft:marg, marginRight:marg, marginTop:marg, marginBottom:marg, 'backgroundColor':colors[i] } }></div>
            squares.push(square)
        }
        return squares
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
        this.initialize_status()
        this.unsubscribe = this.db_ref.onSnapshot(this.update_status)
    }

    render() {
        var height = this.state['height'] * .6

        var legend = (
            <div class="row" ref={ (divElement)=> this.divElement = divElement } >
                <div class="col">
                    <h3>Available: </h3>
                </div>
                <div class="col">
                    <h3>Taken: </h3>
                </div>
                <div class="col">
                    <h3>Semi-taken: </h3>
                </div>
                <div class="col">
                    <h3>Reserved: </h3>
                </div>
            </div>
        )

        if (this.state['mounted']) {
            var square = this.draw_squares(height)
            legend = (
                <div class="row" ref={ (divElement) => this.divElement = divElement } >
                    <div class="col">
                        <h3>Available: </h3>
                        {square[0]}
                    </div>
                    <div class="col">
                        <h3>Taken: </h3>
                        {square[1]}
                    </div>
                    <div class="col">
                        <h3>Semi-taken: </h3>
                        {square[2]}
                    </div>
                    <div class="col">
                        <h3>Reserved: </h3>
                        {square[3]}
                    </div>
                </div>
            )
        }

        var rows = <div />
        
        if (!this.state['loading']) {
            rows = this.display_status(this.state['tables']);
        }

        return (
            <div class="d-flex h-100 flex-column">
                {legend}
                {rows}
            </div>
        );
    }
}

export default MainPage;