import Cookies from 'js-cookie';

const COOKIE_OPTIONS = {
  expires: 7,
  sameSite: 'strict' as const
};

export const saveAuthData = (accessToken: string, user: any) => {
  Cookies.set('token', accessToken, COOKIE_OPTIONS);
  Cookies.set('user', JSON.stringify(user), COOKIE_OPTIONS);
};

export const getAccessToken = (): string | undefined => {
  return Cookies.get('token');
};

export const getUser = () => {
  const userCookie = Cookies.get('user');
  if (!userCookie) return null;

  try {
    return JSON.parse(userCookie);
  } catch {
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};

export const clearAuth = () => {
  Cookies.remove('token');
  Cookies.remove('user');
};

