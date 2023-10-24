import React, { useContext } from "react";
import UserItem from "./UserItem";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { AuthContext } from "../../contexts/AuthContext";
import { ChatContext } from "../../contexts/ChatContext";

function UserList ({ contacts }) {
    const { currentUser } = useContext(AuthContext);
    const chatCtx = useContext(ChatContext);

    const handleClickChat = async (e) => {
        try {
            const replierRef = doc(db, "users", e.uid);
            const replier = await getDoc(replierRef);
            
            const chatRef = doc(db, "userChats", currentUser.uid);
            const userChat = await getDoc(chatRef);

            if (!replier.exists())
                throw new Error("Replier user not found");
            
            chatCtx.dispatch({
                type: "CHANGE_USER",
                payload: {
                    replier: replier.data(),
                    chatId: userChat.data()[replier.id].chatId
                }
            });
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="user-list">
            {contacts && contacts.length > 0 ? contacts.map(({ photoURL, username, uid, lastMessage }, key) => (
                <UserItem
                    img={photoURL}
                    username={username}
                    chat={lastMessage}
                    uid={uid}
                    key={uid}
                    onClick={handleClickChat}
                />
            )) : (
                <div className="no-user">
                    You didn't have any contact yet<br />
                </div>
            )}
        </div>
    )
}

export default UserList;