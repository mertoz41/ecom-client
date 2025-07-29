import Cookies from "js-cookie";


export const getUserTokenFromCookie = (tokenKey: string) => {
  return Cookies.get(tokenKey);
};

export const saveUserTokenToCookie = (token: string, tokenKey: string) => {
  Cookies.set(tokenKey, token, {
    expires: 7, // days
    path: "/", // available site-wide
    // secure: true, // uncomment if using HTTPS only
    // sameSite: "strict", // adjust based on your needs
  });
};

export const removeUserTokenCookie = (tokenKey: string) => {
  Cookies.remove(tokenKey, { path: "/" });
};
