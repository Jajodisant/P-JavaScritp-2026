import { projectService } from "../services/services.js";
import { store } from "../state/store.js";

// --- login view ---
export function loginView() {
    return `
        <div class="auth-container">
            <div class="auth-card">
                <h2>Welcome back</h2>
                <p>Enter your credentials to access the platform</p>
                
                <div class="form-group">
                    <label>Email or username</label>
                    <input type="email" id="login-email" placeholder="student@university.edu">
                </div>

                <div class="form-group">
                    <label>Password</label>
                    <input type="password" id="login-password" placeholder="********">
                </div>

                <button id="btn-login" class="btn-auth">Sing In</button>
                
                <p class="auth-footer">
                    Don't you have an account? <a href="#/register"> Register here</a>
                </p>
            </div>
        </div>
    `;
}

// --- logic login ---
export async function loginLogic() {
    const btnLogin = document.getElementById("btn-login");

    btnLogin.addEventListener("click", async (e) => {
        e.preventDefault();
       
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        // We validate that there are no empty fields --- It was possible to validate from the input using the "required" method
        if (email === "" || password === "") {
            alert("Por favor, completa todos los campos");
            return;
        }

        try {
            const users = await projectService.getUsers();            
            const userFound = users.find(u => u.email === email && u.password === password);

            if (userFound) {
               
                store.user = userFound;
                localStorage.setItem("user", JSON.stringify(userFound));

                alert("¡Hi, " + userFound.name + "!");
                
                if (userFound.role === "Manager") {
                    window.location.hash = "#/dashboard"; 
                } else {
                    window.location.hash = "#/myTask"; 
                }
            } else {
                
                alert("Email or password invalid");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Unable to connect to the server.");
        }
    });
}
