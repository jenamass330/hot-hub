export const getUser = (email) => {
  fetch('/user/'+email)
  .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        return data;
      });
}

export const postUser = (email) => {

}

export const updateWatchlist = (email, newWatchlist) => {
  let postObject = {
    method: "POST",
    body: JSON.stringify({email: email, watchlist: newWatchlist}),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  fetch('/watchlist', postObject)
  .then((res) => res.json())
  .then((data) => {
    console.log(data)
    return data;
  })
}

export const updateWatchedlist = (email, newWatchedList) => {
  let postObject = {
    method: "POST",
    body: JSON.stringify({email: email, watchedList: newWatchedList}),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  fetch('/watchedlist', postObject)
  .then((res) => res.json())
  .then((data) => {
    console.log(data)
    return data;
  })
}