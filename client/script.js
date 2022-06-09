let loading = false;

//There are way to hide this but too lazy for now
//https://answers.netlify.com/t/uncaught-referenceerror-process-is-not-defined-how-to-use-environment-variables-in-html/1726/5
const API_KEY = "60b77d80b6msh38935893ac98d64p18f42fjsn3bb96f0430a1";

const display = document.querySelector("#display");
const displayTitle = document.querySelector("#displayTitle");
const searchInput = document.querySelector("#searchForm");
const searchButton = document.querySelector("#store_search_link");
const categoryGroup = document.querySelector(".categoryGroup");

const fetchData = async (endpoint, value = " ") => {
  if (loading) return;
  display.innerHTML = `<div class="loader"> Loading ...</div>`;
  let data = {};

  let url = `https://steam2.p.rapidapi.com/${endpoint}/${value}`;
  if (endpoint === "search") url += "/page/1";
  try {
    loading = true;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "steam2.p.rapidapi.com",
        "x-rapidapi-key": API_KEY,
      },
    });
    data = await response.json();

    loading = false;
    return data;
  } catch (error) {
    renderDisplay(error.msg);
  }
};

//Image on click
const renderDetail = (data) => {
  display.innerHTML = "";
  displayTitle.innerHTML = data.title;

  const newDiv = document.createElement("div");
  newDiv.innerHTML = `<div class="showing_game show_detail">
    <div class="title_contain ">
    <div class="title">${data.title}</div>
    <div class="price">${data.price}</div>
    </div>
    <div class="img_detail">
    <img
    src="${data.imgUrl}"
    alt="${data.title}"
    />
    <div class="game_details">
    <div class="game_description">${data.description}</div>
    <div class="game_informations">
    <p>RECENT REVIEWS: ${data.allReviews.summary}</p>
    <p>RELEASE DATE:  ${data.released}</p>
    <p>DEVELOPER:  <a href="${data.developer.link}">${
    data.developer.name
  }</a></p>
    <p>PUBLISHER:  <a href="${data.publisher.link}">${
    data.publisher.name
  }</a></p>
    </div>
    </div>
    </div>
    <div class="tags_contain">
    Popular user-defined tags for this product:
    <div class="tags">
    ${data?.tag
      ?.map((e) => `<div class="tag"><a href="${e.url}">${e.name}</a></div>`)
      .join("")}
    
    </div>
    </div>
    </div>
    `;
  display.appendChild(newDiv);
};

const appDetail = async (appId) => {
  const data = await fetchData("appDetail", appId);
  renderDetail(data);
};
const renderGame = (el) => {
  const newDiv = document.createElement("div");
  newDiv.innerHTML = `<div class="game_wrapper">
    <div class="cover" onClick="appDetail(${el["appId"]})">
    <img
    src="${el["imgUrl"]}" data-id="${el["appId"]}"
    />
    <div class="game_info">
    <p>${el["title"]}</p>
    <p>${el["price"]}</p>
    </div>
    </div>
    </div>`;
  display.appendChild(newDiv);
};

const renderDisplay = async (endpoint, value) => {
  const data = await fetchData(endpoint, value);
  display.innerHTML = "";
  displayTitle.innerText = value;
  data?.map((game) => renderGame(game));
};

//Category click (API search by Category term)
categoryGroup.addEventListener("click", (e) => {
  const value = e.target.innerText;
  renderDisplay("search", value);
});
//Search input (API search by input term)
searchButton.addEventListener("click", (e) => {
  const value = searchInput.value;
  renderDisplay("search", value);
});

//First load
renderDisplay("search", "Best");
