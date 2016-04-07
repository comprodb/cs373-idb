export function loadList(path, sort, reverse, page) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, location.origin);
    let params = new URLSearchParams();

    if (reverse) {
      params.append('order', 'desc');
    }

    if (sort) {
      params.append('sort', sort);
    }

    if (page) {
      params.append('page', page);
    }

    url.search = params.toString();

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
