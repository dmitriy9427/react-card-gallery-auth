export const URL = "https://domainname.ryabov1994.nomoredomains.icu";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

export function registerUser(email, password) {
  return fetch(`${URL}/signup`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

export function loginUser(email, password) {
  return fetch(`${URL}/signin`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

export function getToken(jwt) {
  return fetch(`${URL}/users/me`, {
    credentials: "include",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then(checkResponse);
}
