import React, { Component } from 'react';
import { authenticate } from '../controller/login.js';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = { user: '', pass: '', type: 1 }

        this.handle_submitted = this.handle_submitted.bind(this);
        this.handle_change = this.handle_change.bind(this);
    }

    handle_submitted(event) {
        var user = this.state['user'];
        var pass = this.state['pass'];
        var auth = authenticate(user, pass);

        var type;
        if (event.target[2].checked) {
            type = 1
        } else {
            type = 2
        }

        if (auth) {
            this.props.change_state(type);

        }
    }

    handle_change(event) {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    render() {
        return (
            <div class="d-flex h-100 justify-content-center align-items-center flex-column">
                <h1 class="display-4">StudySeat</h1>
                <form onSubmit={ this.handle_submitted }>
                    <div class="form-group">
                        <input type="email" class="form-control" id="user" placeholder="Username" onChange = { this.handle_change }/>
                    </div>

                    <div class="form-group">
                        <input type="password" class="form-control" id="pass" placeholder="Password" onChange = { this.handle_change } />
                    </div>

                    <div class="form-group btn-group btn-group-toggle d-flex justify-content-center" data-toggle="buttons">
                        <label class="btn btn-secondary active">
                            <input type="radio" name="options" id="option1" autocomplete="off" checked/> Student
                        </label>
                        <label class="btn btn-secondary">
                            <input type="radio" name="options" id="option2" autocomplete="off"/> Staff
                        </label>
                    </div>

                    <div class="form-group d-flex justify-content-center">
                        <button type="submit" id="login" class="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        );
    }

    
}

export default Login;