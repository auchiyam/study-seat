import React, { Component } from 'react'
import { reserve_seat } from '../controller/db_handler'

export default class Square extends Component {
    constructor(props) {
        super(props)

        this.reserve = this.reserve.bind(this);
    }
    
    reserve(id) {
        console.log(id, " clicked")
        reserve_seat(id)
    }

    render() {
        var height = this.props.height
        var marg = this.props.marg
        var color = this.props.color
        var btn_color = this.props.btn_color
        var id = this.props.id
        return (
            <div class="d-flex align-item-center flex-column" >
                <div style={ { width:height, height:height, marginLeft:marg, marginRight:marg, marginTop:marg, 'backgroundColor':color } }></div>
                <button class={`btn ${btn_color}`} style={ { marginLeft: marg, marginRight: marg } } onClick={ () => { this.reserve(id) } } >reserve</button>
            </div>
        );
    }
}