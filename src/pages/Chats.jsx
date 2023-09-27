import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

import { AuthContext } from "../contexts/AuthContext";

import TopBar from "../assets/components/TopBar";
import SearchBar from "../assets/components/SearchBar";
import UserList from "../assets/components/UserList";
import TopChat from "../assets/components/TopChat";
import ChatsBody from "../assets/components/ChatsBody";
import MsgInput from "../assets/components/MsgInput";
import AddContact from "../assets/components/modal/AddContact";
import SideAdd from "../assets/components/button/SideAdd";

function Chats() {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const [users, setUsers] = useState([]);

    const [countdown, setCount] = useState(10);

    const [showAdd, setShowAdd] = useState(false);

    useEffect(() => {
        if (currentUser.uid) {
            const result = query(
                collection(db, "users"),
                where("username", "!=", currentUser.displayName)
            );
        
            getDocs(result).then((qs) => {
                const usrs = [];
                qs.forEach((doc) => {
                    usrs.push(doc.data());
                });
                setUsers(usrs);
                console.log(usrs);
            });
        }
    }, [currentUser])

    useEffect(() => {
        if (currentUser) return;

        const down = setInterval(() => {
            if (countdown < 1) {
                navigate("/login");
                return;
            }
            setCount(countdown - 1);
        }, 1000);

        return () => {
            clearInterval(down);
        };
    }, [countdown]);

    return (
        <>
            {showAdd == true && (
                <AddContact setVisible={setShowAdd} users={users} />
            )}
            <div className="chats">
                <div className="side-chats">
                    {currentUser ? (
                        <>
                            <TopBar
                                img={currentUser.photoURL}
                                username={currentUser.displayName}
                            />
                            <SearchBar />
                            <UserList />
                        </>
                    ) : (
                        <div className="no-user">No Signed yet</div>
                    )}
                    <SideAdd
                        onClick={() => {
                            setShowAdd(true);
                        }}
                    />
                </div>
                <div className="main-chat">
                    {currentUser ? (
                        <>
                            <ChatsBody />
                            <MsgInput />
                        </>
                    ) : (
                        <div className="no-user">
                            <h3>
                                You need to login first before using the app
                            </h3>
                            <p>
                                you will be redirected to the login page in{" "}
                                {countdown} seconds
                            </p>
                            <button
                                onClick={() => {
                                    navigate("/login");
                                }}
                            >
                                Login
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Chats;
