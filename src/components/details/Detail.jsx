import { arrayRemove, arrayUnion, updateDoc } from "firebase/firestore"
import { useChatStore } from "../../lib/chatStore"
import { auth } from "../../lib/firebase"
import { useUserStore } from "../../lib/userStore"
import "./detail.css"
import { doc } from "firebase/firestore"
import { db } from "../../lib/firebase"

const Details = () => {
  const {chatId,user,isCurrentUserBlocked, isReceiverBlocked, changeBlock } = useChatStore()
  const {currentUser} = useUserStore()

  const handleBlock = async() => {
    if(!user) return;

    const userDocRef = doc(db,"users", currentUser.id)

    try {
      await updateDoc(userDocRef,{
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="detail">
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="" />
        <h2>{user?.username}</h2>
        <p>This is the description, blablabla behehebehhebdfdfej</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://images.pexels.com/photos/18900093/pexels-photo-18900093/free-photo-of-white-buildings-with-yellow-roofs-under-clear-blue-sky.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                <span>photo_2024_2.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://images.pexels.com/photos/18900093/pexels-photo-18900093/free-photo-of-white-buildings-with-yellow-roofs-under-clear-blue-sky.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                <span>photo_2024_2.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://images.pexels.com/photos/18900093/pexels-photo-18900093/free-photo-of-white-buildings-with-yellow-roofs-under-clear-blue-sky.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                <span>photo_2024_2.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://images.pexels.com/photos/18900093/pexels-photo-18900093/free-photo-of-white-buildings-with-yellow-roofs-under-clear-blue-sky.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                <span>photo_2024_2.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
      </div>
      <button onClick={handleBlock}>
        {isCurrentUserBlocked
          ? "You are blocked!" 
          : isReceiverBlocked
          ? "User Blocked" 
          : "Block User"}
      </button>
      <button className="logout" onClick={()=>auth.signOut()}>Log Out</button>
    </div>
  )
}

export default Details