// //// USING LIVE SERVER

let numLoaded = 4;
let filterBySource = "all";
let numberOfColumns = "dynamic";

function generateCards(data, numCards) {
  const cardsContainer = document.getElementById("cards-container");

  numCards = 4;
  for (let i = 0; i < numCards; i++) {
    if (
      filterBySource === "all" ||
      filterBySource === data[i].source_type.toLowerCase()
    ) {
      const card = document.createElement("div");
      card.classList.add("card");

      const dateString = data[i].date;
      const date = new Date(dateString);

      const options = { day: "2-digit", month: "short", year: "numeric" };
      const formattedDate = date.toLocaleDateString("en-US", options);

      card.innerHTML = `
    <div class="layout-placeholder">
     <div class="product">
               <div class = "red">
                     <img id="profilna" src="${data[i].profile_image}">
                     <div class="ednakolona">
                        <p class="name">${data[i].name}</p>
                        <p class="date">${formattedDate}</p>
                     </div>
                     <img src="./icons/${data[i].source_type}.svg" id="logo">

               </div>
               <div class= "red">
               <img src="${data[i].image}" alt="${data[i].description}">
               <p class="caption"> ${data[i].caption}</p>
               </div>
               <hr>
               <div class="red">
                  <div> <img src="./icons/heart.svg" id="heart-icon1"></div>
                  <p id="likes-counter">${data[i].likes}</p>
               </div>
           </div>
        </div>
    `;
      /*
      const heartIcon = document.getElementById("heart-icon");
      const likesCounter = data[i].likes;
      console.log(likesCounter);
      let isLiked = false;
      let likesCount = 0;

      heartIcon.addEventListener("click", () => {
        if (isLiked) {
          likesCount--;
        } else {
          likesCount++;
        }
        likesCounter.textContent = likesCount;
        isLiked = !isLiked;
      });
*/
      cardsContainer.appendChild(card);
    }
  }
}

window.addEventListener("load", () => {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      generateCards(data, numLoaded + 4);
      numLoaded += 4;
    });
});

function loadMore() {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      generateCards(data, numLoaded + 4);
      numLoaded += 4;
      //   generateCards1(data, numLoaded + 4);
    });
}
const numberOfColumnsSelect = document.getElementById("numberOfColumns");
numberOfColumnsSelect.addEventListener("change", () => {
  numberOfColumns = numberOfColumnsSelect.value;
  generateCards(data, numLoaded);
});

const allRadio = document.getElementById("all");
allRadio.addEventListener("change", () => {
  filterBySource = "all";
  generateCards(data, numLoaded);
});

const instagramRadio = document.getElementById("instagram");
instagramRadio.addEventListener("change", () => {
  filterBySource = "instagram";
  generateCards(data, numLoaded);
});

const facebookRadio = document.getElementById("facebook");
facebookRadio.addEventListener("change", () => {
  filterBySource = "facebook";
  generateCards(data, numLoaded);
});

const twitterRadio = document.getElementById("twitter");
twitterRadio.addEventListener("change", () => {
  filterBySource = "twitter";
  generateCards(data, numLoaded);
});
let cardBackgroundColor = "#ffffff";
let cardSpaceBetween = "10px";
let isDarkTheme = false;

function updateCardBackgroundColor() {
  const inputField = document.getElementById("cardBackgroundColor");
  cardBackgroundColor = inputField.value;
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.style.backgroundColor = cardBackgroundColor;
}

function updateCardSpaceBetween() {
  const inputField = document.getElementById("cardSpaceBetween");
  cardSpaceBetween = inputField.value;
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => (card.style.margin = cardSpaceBetween));
}

const cardBackgroundColorInputField = document.getElementById(
  "cardBackgroundColor"
);
cardBackgroundColorInputField.addEventListener(
  "input",
  updateCardBackgroundColor
);

const cardSpaceBetweenInputField = document.getElementById("cardSpaceBetween");
cardSpaceBetweenInputField.addEventListener("input", updateCardSpaceBetween);

window.addEventListener("load", () => {
  const lightTheme = document.getElementById("lightTheme");
  const darkTheme = document.getElementById("darkTheme");
  const cardBackgroundColor = document.getElementById("cardBackgroundColor");
  const cardsContainer = document.getElementById("cards-container");

  // default theme
  cardsContainer.style.backgroundColor = "#fff";
  cardsContainer.style.color = "#000";

  // theme change handler
  function handleThemeChange() {
    if (lightTheme.checked) {
      cardsContainer.style.backgroundColor = "#fff";
      cardsContainer.style.color = "#000";
    } else if (darkTheme.checked) {
      cardsContainer.style.backgroundColor = "#000";
      cardsContainer.style.color = "#fff";
    }
  }

  handleThemeChange();

  lightTheme.addEventListener("change", handleThemeChange);
  darkTheme.addEventListener("change", handleThemeChange);

  cardsContainer.style.backgroundColor = cardBackgroundColor.value;

  function handleCardBackgroundColorChange() {
    cardsContainer.style.backgroundColor = cardBackgroundColor.value;
  }

  cardBackgroundColor.addEventListener(
    "input",
    handleCardBackgroundColorChange
  );
});
