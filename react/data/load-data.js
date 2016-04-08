export function loadList(path, sort, reverse, page) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, location.origin);
    let params = "";

    if (page) {
      params = `?page=${page}`;
    }

    if (reverse) {
      params += '&order=desc';
    }

    if (sort) {
      params += `&sort=${sort}`;
    }

    url.search = params;

    fetch(url).then((response) => {
      if (response.status >= 400) {
        reject("Bad response from server");
      }
      return response.json();
    }).then(({ data }) => {
      resolve(data);
    });
  });
}

export function loadSingular(path) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, location.origin);

    fetch(url).then((response) => {
      if (response.status >= 400) {
        reject("Bad response from server");
      }
      return response.json();
    }).then(({ data }) => {
      resolve(data);
    });
  });
}
