import React, { useContext, useEffect, useState } from "react";

import { ReactComponent as LeftArrow } from "../svg/left-arrow.svg";

import DummyPfp from "../img/person.png";
import ChatSender from "./chat/ChatSender";
import ChatReceiver from "./chat/ChatReceiver";
import LoadingAnim from "./LoadingAnim";

import { ChatContext } from "../../contexts/ChatContext";
import { arrayRemove, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { ModalContext } from "../../contexts/ModalContext";

function ExampleChat () {
    return <>
        <ChatSender
            img={DummyPfp}
            username={"You"}
            msg={"Hi"}
        />
        <ChatReceiver
            img={DummyPfp}
            username={"Frea"}
            msg={"Hi"}
        />
        <ChatSender
            img={DummyPfp}
            username={"You"}
            msg={"Hello eburiyan how are you, fine thank you"}
        />
        <ChatReceiver
            img={DummyPfp}
            username={"Frea"}
            msg={"Omaagaaa"}
        />
        <ChatSender
            img={DummyPfp}
            username={"You"}
            msg={"I wish i was a bird fr ngl fr frr"}
        />
        <ChatReceiver
            img={DummyPfp}
            username={"Frea"}
            msg={"Why are you speaking english"}
        />
        <ChatSender
            img={DummyPfp}
            username={"You"}
            msg={"What do you mean"}
        />
        <ChatSender
            img={DummyPfp}
            username={"You"}
            msg={"We all speaking english at whole time you fucking idiot"}
        />
        <ChatReceiver
            img={DummyPfp}
            username={"Frea"}
            msg={"Shit ma bad home"}
        />
        <ChatSender
            img={DummyPfp}
            username={"You"}
            msg={"Shut yo bicth ass bullshit nigga"}
        />
        <ChatReceiver
            img={DummyPfp}
            username={"Frea"}
            msg={">:("}
        />
        <ChatSender
            img={DummyPfp}
            username={"You"}
            msg={"🤨😏"}
        />
        <ChatReceiver
            img={DummyPfp}
            username={"Frea"}
            msg={"Fuck you nigga"}
        />
        <ChatSender
            img={DummyPfp}
            username={"You"}
            msg={"Yo"}
        />
        <ChatSender
            img={DummyPfp}
            username={"You"}
            msg={"Do you have a brother named Joe?"}
        />
        <ChatReceiver
            img={DummyPfp}
            username={"Frea"}
            msg={"Who the fuck is Joe?"}
        />
        <ChatSender
            img={DummyPfp}
            username={"You"}
            msg={"Joe mama🤣🤣🤣🤣"}
        />
        <ChatReceiver
            img={DummyPfp}
            username={"Frea"}
            msg={"What?"}
        />
        <ChatReceiver
            img={DummyPfp}
            username={"Frea"}
            msg={"Wait What the fuck?!"}
        />
        <ChatReceiver
            img={DummyPfp}
            username={"Frea"}
            msg={"Eyo fuck you bitch you mama is so fat until she can even drive in ohio with yo family even they are have a bodyguard"}
        />
    </>
}

function ChatConsole (chats) {
    chats.forEach(({ message, username }, index) => {
        console.log(`${index}. (${username}): ${message}`)
    })
}

function ChatsBody ({ triggerChange }) {
    const [messages, setMessages] = useState(null);
    const [replier, setReplier] = useState({});
    const [sender, setSender] = useState({});

    const { state } = useContext(ChatContext);
    const { setDeleteChat } = useContext(ModalContext);

    const deleteChat = async (id) => {
        const chatRef = doc(db, "chats", state.chatId);

        try {
            const chats = await getDoc(chatRef);
            const { conversation } = chats.data();

            const newConversation = conversation.filter((chat) => chat.id !== id);

            await updateDoc(chatRef, {
                conversation: newConversation
            });

            setDeleteChat({
                state: false,
                payload: () => {}
            })
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = (id) => {
        console.log(id);
        setDeleteChat({
            state: true,
            payload: () => deleteChat(id)
        });
    }

    useEffect(() => {
        const isSelected = state.sender && state.replier && state.chatId;

        if (isSelected) {
            setMessages(null);
            setReplier(state.replier);
            setSender(state.sender);

            const chatRef = doc(db, "chats", state.chatId);
            const unSubrek = onSnapshot(chatRef, (data) => {
                const chats = data.data().conversation;
                setMessages(chats);
            })
    
            return () => {
                isSelected && unSubrek();
            }
        }
    }, [state.replier]);

    return (
        <div className="chats-body">
            <button className="back-btn" onClick={() => { triggerChange(false) }}>
                <LeftArrow />
            </button>
            {messages ? (
                messages.length < 1 ? (
                    <div className="no-msg">Start the conversation by saying hi to <b>{replier.username}</b></div>
                ) : (messages.map(({ message, uid, imgURL, id }, key) => {
                    const isSelected = state.sender && state.replier && state.chatId;
    
                    if (!isSelected) {
                        return (
                            <></>
                        )
                    }
    
                    switch (uid) {
                        case state.sender.uid:
                            return (
                                <ChatSender
                                    profile={sender.photoURL}
                                    username={"You"}
                                    msg={message}
                                    img={imgURL}
                                    key={id || key}
                                    id={id}
                                    deleteChat={handleDelete}
                                />
                            );
                        case state.replier.uid:
                            return (
                                <ChatReceiver
                                    profile={replier.photoURL}
                                    username={replier.username}
                                    msg={message}
                                    img={imgURL}
                                    key={id || key}
                                />
                            )
                    }
                }))
            ) : (
                <div className="loading">
                    <LoadingAnim />
                    <p>Please Wait...</p>
                </div>
            )}
        </div>
    )
}

export default ChatsBody;