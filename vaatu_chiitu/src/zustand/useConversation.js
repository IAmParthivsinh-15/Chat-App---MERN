import {create} from 'zustand'

const useConversation = create((set) => ({
    selectedConversation : null ,
    setSelectedConversation :(selectedConversation) => set({selectedConversation}),
    friendSearchUser : null ,
    setFriendSearchUser :(friendSearchUser) => set({friendSearchUser}),
    messages : [],
    setMessages : (messages) => set({messages}),
    pendingReqs : [],
    setPendingReq : (pendingReqs) => set({pendingReqs}),
}))

export default useConversation