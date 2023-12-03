export function getCookie( cookie_name ) {
  const cookieString = document.cookie;
  const cookies = cookieString.split('; ').reduce((res, c) => {
    const [name, val] = c.split('=');
    res[name] = val;
    return res;
  }, {});
  const token = cookies['elearn_token'];
  if (!token) {
    return null;
  }
  return token;
}

export function getUserIdFromCookie() {
  const cookieString = document.cookie;
  const cookies = cookieString.split('; ').reduce((res, c) => {
    const [name, val] = c.split('=');
    res[name] = val;
    return res;
  }, {});

  const token = cookies['elearn_token'];
  if (!token) {
    return null;
  }

  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload).id;
}

// Example usage:
// const userId = getUserIdFromCookie();
