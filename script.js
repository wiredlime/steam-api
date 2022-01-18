fetch("https://steam2.p.rapidapi.com/search/ /page/1", {
  method: "GET",
  headers: {
    "x-rapidapi-host": "steam2.p.rapidapi.com",
    "x-rapidapi-key": "60b77d80b6msh38935893ac98d64p18f42fjsn3bb96f0430a1",
  },
})
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.error(err);
  });
