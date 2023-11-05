import React from "react";

import ConnectedPPL from "../assets/svg/homepage/connected-ppl.svg";
import SyncFeature from "../assets/svg/homepage/sync-feature.svg";
import FilesConnected from "../assets/svg/homepage/files-connected.svg";
import AIAssistant from "../assets/svg/homepage/ai-assistant.svg";

import { ReactComponent as Interconnected1 } from "../assets/svg/homepage/interconnected-1.svg";
import { ReactComponent as Interconnected2 } from "../assets/svg/homepage/interconnected-2.svg";

import { ReactComponent as Logo } from "@/public/cetan.svg";

import Lain from "../assets/img/lain-iwakura.jpg";

import { Link } from "react-router-dom";

function Feature({ gap, reverse, className, id, children }) {
    return (
        <section
            className={`container feature ${className}`}
            id={id}
            style={{ gap, flexDirection: reverse ? "row-reverse" : "row" }}
        >
            {children}
        </section>
    );
}

function Home() {
    return (
        <main className="home-body">
            <main className="home-main-container">
                <section className="container hero">
                    <div className="image">
                        <img src={ConnectedPPL} alt="" />
                    </div>
                    <div className="contain">
                        <header>
                            <h1 className="header">
                                Start your private chat with cetan -
                            </h1>
                            <p className="content">idk what content need to show</p>
                        </header>
                        <div className="buttons">
                            <Link to={"/signup"}>
                                <div className="btn-primary">
                                    Start Chating
                                </div>
                            </Link>
                            <Link to={"/"}>
                                <div className="btn-secondary">
                                    Learn more
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>
                <Feature className="feature-sync" id={"sync-chat"}>
                    <div className="image">
                        <picture>
                            <img src={SyncFeature} alt="Sync Feature" />
                        </picture>
                    </div>
                    <div className="contain">
                        <h1 className="header">Synchronize chats in real-time</h1>
                        <p className="content">When you successfully send a message, your message will instantly appear to the receiver</p>
                    </div>
                </Feature>
                <Feature className="feature-sync" reverse={true}>
                    <div className="image">
                        <picture>
                            <img src={FilesConnected} alt="File Connected"/>
                        </picture>
                    </div>
                    <div className="contain">
                        <h1 className="header">Send images and documents</h1>
                        <p className="content">Cetan is capable of sending pictures and documents, share your moments with your friends and family. Also share your work with your coworkers or teachers.</p>
                    </div>
                </Feature>
                <Feature className="feature-sync">
                    <div className="image">
                        <picture>
                            <img src={AIAssistant} alt="AI Assistant" />
                        </picture>
                    </div>
                    <div className="contain">
                        <h1 className="header">Ask the AI Assistant (GPT-3.5) (Coming soon)</h1>
                        <p className="content">Cetan is capable of sending pictures and documents, share your moments with your friends and family. Also share your work with your coworkers or teachers.</p>
                    </div>
                </Feature>
                <section className="qoutes lain-qoutes">
                    <div className="text">
                        <header className="container">
                            <h1 className="header">“No matter where you are, everyone is always connected”</h1>
                            <p>- Iwakura Lain</p>
                        </header>
                    </div>
                    <div className="lain-bg" style={{ backgroundImage: `url(${Lain})` }}></div>
                </section>
                <section className="last">
                    <div className="contain">
                        <h1 className="header">
                            Now let's start your first conversation
                        </h1>
                        <Link to={"/signup"}>
                            <div className="btn-primary">
                                Get Started
                            </div>
                        </Link>
                    </div>
                    <Interconnected1 />
                    <Interconnected2 />
                </section>
                <footer className="end">
                    <div className="container">
                        <header className="name">
                            <Logo />
                            <h2>Cetan</h2>
                        </header>
                        <div className="desc">
                            A open-source real-time private chat app for study case, made with React and Firebase. <a href="https://github.com/norman-andrians/cetan.git">See source code</a>
                        </div>
                        <div className="copy">
                            Copyright © 2023 Norman Andrians
                        </div>
                    </div>
                </footer>
            </main>
        </main>
    );
}

export default Home;