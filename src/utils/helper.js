export const validateEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};





export const getInitials = (name) => {
  if (!name) return "";
  const names = name.split(" "); 
  let initials=""
  for (let i = 0; i < Math.min(names.length,2); i++) {
    initials += names[i][0];
  }
  return initials.toUpperCase();
};
