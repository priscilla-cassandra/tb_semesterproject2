//Get accessToken that is saved in local storage when user is logged in
export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

//Check if a user is logged in, by checking if there is an accessToken
export function isLoggedIn() {
  return !!getAccessToken();
}

export function getName() {
  return localStorage.getItem("name");
}

//Logout function
export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("name");
}
