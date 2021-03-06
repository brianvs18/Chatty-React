import React, { Component } from "react";
import Header from "../components/Header";
import { auth, db } from "../services/firebase";

export default class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: auth().currentUser,
            chats: [],
            content: '',
            readError: null,
            writeError: null,
            loadingChats: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.myRef = React.createRef();
    }

    async componentDidMount() {
        this.setState({ readError: null, loadingChats: true });
        const chatArea = this.myRef.current;
        try {
            db.ref("chats").on("value", snapshot => {
                let chats = [];
                snapshot.forEach((snap) => {
                    chats.push(snap.val());
                });
                chats.sort(function (a, b) { return a.timestamp - b.timestamp })
                this.setState({ chats });
                chatArea.scrollBy(0, chatArea.scrollHeight);
                this.setState({ loadingChats: false });
            });
        } catch (error) {
            this.setState({ readError: error.message, loadingChats: false });
        }
    }

    handleChange(event) {
        this.setState({
            content: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ writeError: null });
        const chatArea = this.myRef.current;
        try {
            await db.ref("chats").push({
                content: this.state.content,
                timestamp: Date.now(),
                uid: this.state.user.uid,
                image: this.state.user.photoURL,
                nameUser: this.state.user.displayName,
                email: this.state.user.email
            });
            this.setState({ content: '' });
            chatArea.scrollBy(0, chatArea.scrollHeight);
        } catch (error) {
            this.setState({ writeError: error.message });
        }
    }

    formatTime(timestamp) {
        const date = new Date(timestamp);
        return `${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;        
    }

    render() {
        return (
            <div className="container-sm">
                <Header />
                <div className="chat-area" ref={this.myRef}>
                    {this.state.loadingChats ? <div className="spinner-border text-success" role="status">
                        <span className="sr-only">Cargando...</span>
                    </div> : ""}

                    {/* Chat */}
                    {this.state.chats.map(chat => {
                        return <p key={chat.timestamp} className={"chat-bubble " + (this.state.user.uid === chat.uid ? "current-user" : "")}>
                            <span className="chat-time float-right">{`${chat.nameUser} `}</span>
                            <span className="chat-time float-left">{`${chat.email} `}</span>
                            <br></br>
                            <img src={chat.image} className={"image-photo"} alt="" />
                            {chat.content}
                            <br />
                            <span className="chat-time float-right">{this.formatTime(chat.timestamp)}</span>
                        </p>
                    })}
                </div>

                {/* formulario mensajes */}
                <form onSubmit={this.handleSubmit} className="mx-3">
                    <input className="form-control txtSend" name="content" onChange={this.handleChange} value={this.state.content}></input>
                    {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button type="submit" className="btn btn-success">
                        Enviar
                    </button>
                    </div>
                </form>
                <div className="py-5 mx-3">
                    Sesi??n iniciada por: <strong className="text-info">{this.state.user.email}</strong>
                </div>
            </div>
        );
    }
}