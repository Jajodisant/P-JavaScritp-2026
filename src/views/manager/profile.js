export function profileView(user) {
    return `
        <div class="container">
            <div class="profile-card">
                <div class="profile-header">
                    <h1>Account Information</h1>
                </div>
                
                <div class="profile-details">
                    <div class="detail-group">
                        <label>ID User:</label>
                        <p>#${user.id}</p>
                    </div>
                    
                    <div class="detail-group">
                        <label>Name Full:</label>
                        <p>${user.name}</p>
                    </div>

                    <div class="detail-group">
                        <label>Email:</label>
                        <p>${user.email}</p>
                    </div>

                    <div class="detail-group">
                        <label>Number Phone:</label>
                        <p>${user.phone || "Unregistered"}</p>
                    </div>

                    <div class="detail-group">
                        <label>Role in the company:</label>
                        <p><span class="role-tag">${user.role}</span></p>
                    </div>
                </div>
            </div>
        </div>
    `;
}


export async function profileLogic() {
    const user = JSON.parse(localStorage.getItem("user"));

    return `
        <div class="profile-container">
            <h1>Profile of${user.name}</h1>
            <p>ID: ${user.id}</p>
            <p>Email: ${user.email}</p>
            <p>Number Phone: ${user.phone || 'Unassigned'}</p>
        </div>
    `;
}