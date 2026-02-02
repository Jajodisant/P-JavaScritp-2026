export const store = {
    user: (() => {
        try {
            return JSON.parse(localStorage.getItem('user'));
        } catch {
            return null;
        }
    })(),
    
    // New property to save the event that the client wants to book

    selectedEvent: null, 

    setLogin(userData) {
        this.user = userData;
        localStorage.setItem('user', JSON.stringify(userData));
    },

    getUserId() {
        return this.user ? this.user.id : null;
    }
};