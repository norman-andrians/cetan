import React, { useContext, useEffect, useRef, useState } from "react";
import { addDoc, arrayUnion, collection, doc, getDoc, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { AuthContext } from "../../../contexts/AuthContext";
import { db } from "../../../firebase/firebase";

import UserItem from "../UserItem";
import { ReactComponent as CloseIcon } from "../../svg/x.svg";

function AddContact ({ setVisible, users }) {
    const { currentUser } = useContext(AuthContext);
    const [filterUser, setFilter] = useState([]);
    const queryRef = useRef(null);

    const watchSearch = () => {
        const q = queryRef.current.value;
        const filtered = users.filter(({ username }) => {
            if (q.length > 0)
                return username.toLowerCase().includes(q.toLowerCase());
        });
        
        setFilter(filtered)
    }

    const handleAddContact = async (uid, setState) => {
        setState("loading")

        const chatColl = collection(db, "chats");
        const docRef = doc(db, "userChats", currentUser.uid);
        const targetRef = doc(db, "userChats", uid);
        const targetUser = doc(db, "users", uid);

        try {
            const docp = await getDoc(docRef);
            const user = await getDoc(targetUser);
            const targetChat = await getDoc(targetRef);

            // When user docs didn't exist
            if (!docp.exists()) await setDoc(docRef, {});
            // And when the target contact docs didn't exist
            if (!targetChat.exists()) await setDoc(targetRef, {});
            
            // Add chats for current user to contact
            if (!docp.data()[uid]) {
                const addContactsMsg = `${currentUser.displayName} Just added ${user.data().username}`;

                const chatRef = await addDoc(chatColl, {
                    conversation: [],
                    date: serverTimestamp(),
                    users: [currentUser.uid, uid]
                });

                await updateDoc(docRef, {
                    [uid]: {
                        uid,
                        date: serverTimestamp(),
                        lastMessage: addContactsMsg,
                        status: "ADDED",
                        chatId: chatRef.id
                    }
                });
                    
                const filteredUs = filterUser.filter((usr) => usr.uid !== uid);
                setFilter(filteredUs);

                // Add chats for contact for current user
                if (!targetChat.data()[currentUser.uid]) {
                    await updateDoc(targetRef, {
                        [currentUser.uid]: {
                            uid: currentUser.uid,
                            date: serverTimestamp(),
                            lastMessage: addContactsMsg,
                            status: "CLEAR",
                            chatId: chatRef.id
                        }
                    });
                }
            }
            
        }
        catch (error) {
            console.error(error);
        }

        setState("idle");
    }

    return (
        <div className="cover-bg">
            <div className="modal-add-contact">
                <button className="btn-close" onClick={() => { setVisible(false) }}>
                    <CloseIcon />
                </button>
                <h2>Add Contact</h2>
                <div className="search-bar">
                    <input type="email" ref={queryRef} onChange={watchSearch} placeholder="Find contact by email..." id="" />
                </div>
                <div className="result-field">
                    {filterUser.length > 0 ? filterUser.map(({ email, username, photoURL, uid }) => (
                        <UserItem
                            uid={uid}
                            img={photoURL}
                            username={username}
                            chat={email}
                            addBtnClick={handleAddContact}
                            key={uid}
                        />
                    )) : (
                        <div className="no-user">No User found</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AddContact;