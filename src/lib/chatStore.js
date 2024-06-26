import { create } from 'zustand'
import { doc,getDoc  } from 'firebase/firestore';
import { db } from './firebase';
import { useUserStore } from './userStore';

export const useChatStore = create((set) => ({
  chatId: null,
  user: null,
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,
  changeChat: (chatId,user) => {
    const currentUser = useUserStore.getState().currentUser

    //CHECK IF CURRENT USER IS BLOCKED 

    if(Array.from(user.blocked).includes(currentUser.id)){
      return set({
        chatId,
        user:null,
        isCurrentUserBlocked:true,
        isReceiverBlocked:false,
      });
    }

    //CHECK IF RECEIVER USER IS BLOCKED
    else if(Array.from(currentUser.blocked).includes(user.id)){
      return set({
        chatId,
        user:null,
        isCurrentUserBlocked:false,
        isReceiverBlocked:true,
      });
    }
    else{
      return set({
        chatId,
        user,
        isCurrentUserBlocked:false,
        isReceiverBlocked:false,
      });
    }
    

  },

  changeBlock: () => {
    set(state=>({...state,isReceiverBlocked: !state.isReceiverBlocked}))
  }

}))

