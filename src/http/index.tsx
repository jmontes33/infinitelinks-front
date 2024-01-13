let controller;

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

const authHeaders = (token: string) => {
  return {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

const post = async (url: string, body: BodyInit) => {
  controller = new AbortController();
  const signal = controller.signal;
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body,
    credentials: 'include',
    signal,
  });

  return await response.json();
};

const authPost = async (url: string, body: BodyInit, token: string) => {
  controller = new AbortController();
  const signal = controller.signal;
  const response = await fetch(url, {
    method: 'POST',
    headers: authHeaders(token),
    body,
    credentials: 'include',
    signal,
  });

  return await response.json();
};

const authGet = async (url: string, token: string) => {
  controller = new AbortController();
  const signal = controller.signal;
  const response = await fetch(url, {
    method: 'GET',
    headers: authHeaders(token),
    credentials: 'include',
    signal,
  });

  return await response.json();
};

export const http = {
  authPost,
  authGet,
  post,
};
