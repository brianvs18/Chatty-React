import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signin, signInWithGoogle, signInWithGitHub } from "../helpers/auth";

export default class Login extends Component {

    constructor() {
        super();
        this.state = {
            error: null,
            email: "",
            password: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.githubSignIn = this.githubSignIn.bind(this);
        this.githubSignIn = this.githubSignIn.bind(this);
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
            <div className="container">
                <form autoComplete="off" onSubmit={this.handleSubmit} className="mt-5 py-5 px-5">
                    <h1>
                        Inicia sesión en 
                        <Link to="/" className="title ml-2"> Chatty</Link>
                    </h1>
                    <p className="lead">Ingrese el siguiente formulario para crear una cuenta.</p>
                    <div className="form-group">
                        <input placeholder="Email" name="email" type="email" onChange={this.handleChange} value={this.state.email} className="form-control" />
                    </div>
                    <div className="form-group">
                        <input placeholder="Contraseña" name="password" onChange={this.handleChange} value={this.state.password} type="password"  className="form-control" />
                    </div>
                    <div className="form-group">
                        {this.state.error ? (<p className="text-danger">{this.state.error}</p>) : null}
                        <button type="submit" className="btn btn-primary px-5">Iniciar sesión</button>
                    </div>
                    <p>También puede ingresar con: </p>
                    <button onClick={this.googleSignIn} type="button" className="btn btn-danger mr-2">
                        Google
                    </button>
                    <button className="btn btn-secondary" type="button" onClick={this.githubSignIn}>
                        GitHub
                    </button>
                    <hr />
                    <p>¿No tienes una cuenta? <Link to="/signup">Regístrate</Link></p>
                </form>
            </div>
        );
    }
}