import { projectService } from "../services/services.js";

// --- register view ---
export function registerView() {
    return `
        <div class="auth-container">
            <div class="auth-card">
                <h2>Create account</h2>
                <p> Join the academic performance platform today </p>
                <form id="register-form">
                    <div class="form-group">
                        <label>Full Name</label>
                        <input type="text" name="name" required placeholder="John Doe">
                    </div>

                    <div class="form-group">
                        <label>Email address</label>
                        <input type="email" name="email" required placeholder="student@university.edu">
                    </div>

                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" name="password" required placeholder="********">
                    </div>

                    <div class="form-group">
                        <label>Rol</label>
                        <select name="role">
                            <option value="Employees">Employees</option>
                            <option value="Manager">Manager</option>
                        </select>
                    </div>

                    <button type="submit" class="btn-auth">Register</button>
                </form>
            </div>
        </div>
    `;
}

export async function registerLogic() {
    const form = document.getElementById("register-form");

    form.addEventListener("submit", async (e) => {        
        e.preventDefault();
        
        const formData = new FormData(form);        
        
        const newUser = {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
            role: formData.get("role")
        };

        try {
            
            await projectService.postUser(newUser);
            
            alert("¡Successfully registered user!");
            window.location.hash = "#/login";
        } catch (error) {
            alert("Error trying to register user");
        }
    });
}