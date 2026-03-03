import {create} from 'zustand'
import {persist} from 'zustand/middleware'
const useAuthStore = create(persist((set) => ({
    user:null,
    setUser:(user) => set({user:user})
}),
{
    name:'user',
    partialize:(state)=>({user:state.user})
}))
export default useAuthStore;