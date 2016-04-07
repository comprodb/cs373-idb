export function loadList(path, sort, reverse) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, location.origin);
    let params = new URLSearchParams();

    if (reverse) {
      params.append('order', 'desc');
    }

    if (sort) {
      params.append('sort', sort);
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
