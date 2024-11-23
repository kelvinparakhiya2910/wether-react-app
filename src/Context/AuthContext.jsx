import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [users, setUsers] = useState(() => {
        const savedUsers = localStorage.getItem("users");
        return savedUsers ? JSON.parse(savedUsers) : [];
    });
    const [currentUser, setCurrentUser] = useState(() => {
        const savedUser = localStorage.getItem("currentUser");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        localStorage.setItem("users", JSON.stringify(users));
    }, [users]);

    const addUser = (newUser) => {
        setUsers((prev) => [...prev, newUser]);
    };

    const loginUser = (userName, password) => {
        const user = users.find((u) => u.userName === userName && u.password === password);
        if (user) {
            setCurrentUser(user);
            localStorage.setItem("currentUser", JSON.stringify(user));
        }
        return user;
    };

    const value = {
        users,
        currentUser,
        isAuthenticated: !!currentUser,
        addUser,
        loginUser,
        setCurrentUser
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
