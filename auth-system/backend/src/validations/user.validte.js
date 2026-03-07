const verifyUserData = (body) => {
  let { name, email, password } = body;

  if (!name || !email || !password) {
    return "All fields are required";
  }

  name = name.trim();
  email = email.trim();
  password = password.trim();

  if (name.length < 3 || name.length > 50) {
    return "Name should be between 3 and 50 characters";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return "Invalid email format";
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  if (!passwordRegex.test(password)) {
    return "Password must contain uppercase, lowercase, number and special character";
  }

  return null; 
};


module.exports = {
  verifyUserData
}