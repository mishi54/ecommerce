const mockUsers = JSON.parse(localStorage.getItem("users")) ||  [
    {
      id: 1,
      username: "admin",
      password: "admin123",
      email: "admin@gmail.com",
      role: "admin",
    },
    {
      id: 2,
      username: "user",
      password: "user123",
      email: "xyz@gmail.com",
      role: "user",
    },
  ];
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(mockUsers));
  }
  
  export default mockUsers;
  