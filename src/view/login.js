import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
            <div class="d-flex h-100 justify-content-center align-items-center flex-column">
                <h1 class="display-4">StudySeat</h1>
                <form>
                    <div class="form-group">
                        <input type="email" class="form-control" id="login_user" placeholder="Username" />
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" id="login_user" placeholder="Password" />
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