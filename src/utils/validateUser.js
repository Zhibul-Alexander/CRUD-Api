export const validateUser = (user) => {
  if (
    typeof user.username === "string" &&
    typeof user.age === "number" &&
    Array.isArray(user.hobbies)
  ) {
    return true;
  } else return false;
};
