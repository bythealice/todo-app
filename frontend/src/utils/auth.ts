import Cookies from 'js-cookie';

/**
 * Recupera o token de autenticação dos cookies
 */
export const getAccessToken = (): string | undefined => {
  return Cookies.get('accessToken');
};

/**
 * Recupera as informações do usuário dos cookies
 */
export const getUser = () => {
  const userCookie = Cookies.get('user');
  if (!userCookie) return null;

  try {
    return JSON.parse(userCookie);
  } catch {
    return null;
  }
};

/**
 * Verifica se o usuário está autenticado
 */
export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};

/**
 * Remove todos os dados de autenticação
 */
export const clearAuth = () => {
  Cookies.remove('accessToken');
  Cookies.remove('user');
};

