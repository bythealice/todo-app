import Cookies from 'js-cookie';

const COOKIE_OPTIONS = {
  expires: 7,
  sameSite: 'strict' as const
};

export const saveAuthData = (accessToken: string, user: any) => {
  Cookies.set('accessToken', accessToken, COOKIE_OPTIONS);
  Cookies.set('user', JSON.stringify(user), COOKIE_OPTIONS);
};

export const getAccessToken = (): string | undefined => {
  return Cookies.get('accessToken');
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
  Cookies.remove('accessToken');
  Cookies.remove('user');
};

