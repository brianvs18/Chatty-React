import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signin, signInWithGoogle, signInWithGitHub } from "../helpers/auth";

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            email: "",
            password: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ error: "" });
        try {
            await signin(this.state.email, this.state.password);
        } catch (error) {
            this.setState({ error: error.message });
        }
    }

    render(){
        return(
            <div>
                <form autoComplete="off" onSubmit={this.handleSubmit}>
                    <h1>
                        Inicia sesión en
                        <Link to="/">Chatty</Link>
                    </h1>
                    <p>Ingrese el siguiente formulario para crear una cuenta.</p>
                    <div>
                    <input placeholder="Email" name="email" type="email" onChange={this.handleChange} value={this.state.email} />
                    </div>
                    <div>
                        <input placeholder="Contraseña" name="password" onChange={this.handleChange} value={this.state.password} type="password" />
                    </div>
                    <div>
                        {this.state.error ? <p>{this.state.error}</p> : null}
                        <button type="submit">Iniciar sesión</button>
                    </div>
                    <hr />
                    <p>¿No tienes una cuenta? <Link to="/login">Regístrate</Link></p>
                </form>
            </div>
        );
    }
}