export const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  export const validatePassword = (password) => {
    // Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(password);
    
  };