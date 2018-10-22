import React, { Component } from 'react';
import { authenticate } from '../controller/login.js';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = { user: '', pass: '' }

        this.handle_submitted = this.handle_submitted.bind(this);
        this.handle_change = this.handle_change.bind(this);
    }

    handle_submitted(event) {
        var user = this.state['user'];
        var pass = this.state['pass'];
        var auth = authenticate(user, pass);

        if (auth) {
            this.props.change_state(1);
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

                    <div class="form-group d-flex justify-content-center">
                        <button type="submit" id="login" class="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        );
    }

    
}

export default Login;