import { createContext, useState, useEffect, useContext } from "react";
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router";
import { ID } from "appwrite";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getUserOnLoad();
    }, []);

    const getUserOnLoad = async () => {
        try {
            let accountDetails = await account.get();
            setUser(accountDetails);
        } catch (error) {
            console.error("Failed to fetch user:", error);
            setError("Failed to fetch user");
        } finally {
            setLoading(false);
        }
    };

    const handleUserLogin = async (e, credentials) => {
        e.preventDefault();
        console.log("CREDS:", credentials);

        try {
            await account.createEmailPasswordSession(credentials.email, credentials.password);
            let accountDetails = await account.get();
            setUser(accountDetails);
            navigate("/");
        } catch (error) {
            console.error("Login failed:", error);
            setError("Login failed. Please check your credentials.");
        }
    };

    const handleLogout = async () => {
        try {
            await account.deleteSession("current");
            setUser(null);
            navigate("/login"); // Redirect to login after logout
        } catch (error) {
            console.error("Logout failed:", error);
            setError("Logout failed.");
        }
    };

    const handleRegister = async (e, credentials) => {
        e.preventDefault();
        console.log("Handle Register triggered!", credentials);

        if (credentials.password1 !== credentials.password2) {
            alert("Passwords did not match!");
            return;
        }

        try {
            await account.create(
                ID.unique(),
                credentials.email,
                credentials.password1,
                credentials.name
            );
            await account.createEmailPasswordSession(credentials.email, credentials.password1);
            let accountDetails = await account.get();
            setUser(accountDetails);
            navigate("/");
        } catch (error) {
            console.error("Registration failed:", error);
            setError("Registration failed. Please try again.");
        }
    };

    const isAuthenticated = () => {
        return user !== null;
    };

    const contextData = {
        user,
        handleUserLogin,
        handleLogout,
        handleRegister,
        isAuthenticated,
        error,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;
