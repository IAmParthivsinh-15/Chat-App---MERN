import {create} from 'zustand'

const useConversation = create((set) => ({
    selectedConversation : null ,
    setSelectedConversation :(selectedConversation) => set({selectedConversation}),
    friendSearchUser : null ,
    setFriendSearchUser :(friendSearchUser) => set({friendSearchUser}),
    messages : [],
    setMessages : (messages) => set({messages}),
}))

export default useConversation