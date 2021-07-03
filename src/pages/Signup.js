import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signup, signInWithGoogle, signInWithGitHub } from "../helpers/auth";

export default class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            email: '',
            password: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.githubSignIn = this.githubSignIn.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ error: '' });
        try {
            await signup(this.state.email, this.state.password);
        } catch (error) {
            this.setState({ error: error.message });
        }
    }

    async googleSignIn() {
        try {
            await signInWithGoogle();
        } catch (error) {
            this.setState({ error: error.message });
        }
    }

    async githubSignIn() {
        try {
            await signInWithGitHub();
        } catch (error) {
            this.setState({error: error.message});
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1>
                        Únete a
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
                        <button type="submit">Inscribirse</button>
                    </div>
                    <p>También puede ingresar con: </p>
                    <button onClick={this.googleSignIn} type="button">
                        Google
                    </button>
                    <button className="btn btn-secondary" type="button" onClick={this.githubSignIn}>
                        GitHub
                    </button>
                    <hr />
                    <p>¿Tienes una cuenta? <Link to="/login">Iniciar sesión</Link></p>
                </form>
            </div>
        );
    }
}