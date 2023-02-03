const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка ${res.status}`);
};
const request = (url, options) => fetch(url, options).then(checkResponse);

export {request}
