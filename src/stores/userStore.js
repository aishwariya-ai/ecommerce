import { defineStore } from "pinia";
import api from '../api/api.js'
export const useUserStore = defineStore("user", 
    {
    state:()=>({
        currentUser: null,
        users: []
    }),
    getters: {
    },
    actions: {
        async login(username, password) {
    const response = await api.get(`/users?username=${username}&password=${password}`
    );

    if (response.data.length > 0) 
        {
        this.currentUser = response.data[0];
            localStorage.setItem("currentUser",JSON.stringify(this.currentUser));

                return true;
            }
            return false;
        },

        logout() {
            localStorage.removeItem("currentUser")
            this.currentUser = null;
        },
        restoreUser()
        {
            const savedUser=localStorage.getItem("currentUser")
            if(savedUser)
            {
                this.currentUser=JSON.parse(savedUser);
            }
        },

        async registerUser(user) {
    try {
        console.log("Sending:", user);

        const response = await api.post("/users", user);

        console.log("Success:", response.data);

        this.users.push(response.data);
    } catch (error) {
        console.log("Status:", error.response?.status);
        console.log("Data:", error.response?.data);
        console.log("Message:", error.message);
    }
}
    }
});