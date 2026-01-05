export interface User {
    name: string;
    email: string;
    phone: string;
}

export const saveUser = (user: User) => {
    localStorage.setItem('lms_user', JSON.stringify(user));
    localStorage.setItem('lms_user_name', user.name); // Compatibility with existing logic
    window.dispatchEvent(new Event('storage'));
};

export const getUser = (): User | null => {
    const user = localStorage.getItem('lms_user');
    return user ? JSON.parse(user) : null;
};

export const logout = () => {
    localStorage.removeItem('lms_user');
    window.location.href = '/login';
};
