import { useEffect } from "react";
import Chat from "./components/chat/Chat";
import Detail from "./components/details/Detail";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { auth } from "./lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useUserStore } from "./lib/userStore";
import { useChatStore } from "./lib/chatStore";

const App = () => {

  const {currentUser, isLoading, fetchUserInfo} = useUserStore()
  const {chatId,changeChat} = useChatStore()

  useEffect(()=>{
    const unSub = onAuthStateChanged(auth,(user)=>{
      fetchUserInfo(user?.uid)
    });

    return () => {
      unSub();
    };
  },[fetchUserInfo]);

  console.log(currentUser)

  if(isLoading) return <div className="loading">Loading...</div>

  return (
    <div className='container'>
      {currentUser ? (
        <>
          <List/>
          {chatId && <Chat/>}
          {chatId && <Detail/>}
        </>
      ) : (
        <Login/>
      )}
      <Notification/>
    </div>
  )
}

export default App