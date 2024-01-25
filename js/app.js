const trends = document.getElementById("trends");
const trendsTodayButton = document.querySelector("#btn-today");
const trendsWeeklyButton = document.querySelector("#btn-weekly");
const trendsScrollBtnL = document.getElementById("trends-scroll-btn-l");
const trendsScrollBtnR = document.getElementById("trends-scroll-btn-r");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNWM3ODU4MDgyMWI4ZDI5OGFmYTU4Zjk5MjljOWUxNCIsInN1YiI6IjY1ODIxZDFlMGU2NGFmMDg5NmE4MzY4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8XdqdbXKZw4Q_Rs9TyCQrlWHd3uBrUAWEPf14Hj8kJk",
  },
};

const getTrending = (type) => {
  trendsScrollBtnL.disabled = true;
  trendsScrollBtnR.disabled = false;

  while (trends.firstChild) {
    trends.removeChild(trends.firstChild);
  }

  fetch(
    `https://api.themoviedb.org/3/trending/all/${type}?language=en-US`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      response.results.forEach((data) => {
        const dataCard = document.createElement("div");
        dataCard.setAttribute("id", "data-card");
        dataCard.setAttribute("class", "data-card");

        const cardImg = document.createElement("img");

        cardImg.setAttribute(
          "src",
          `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${data.poster_path}`
        );

        const cardTitle = document.createElement("h4");
        cardTitle.textContent = data.title || data.name;
        cardTitle.title = data.title || data.name;

        const cardDate = document.createElement("span");
        cardDate.setAttribute("class", "card-date");
        cardDate.textContent = (data.release_date || data.first_air_date).slice(
          0,
          4
        );

        const mediaTypeIcon = document.createElement("i");

        const mediaType = document.createElement("span");
        mediaType.setAttribute("class", "media-type");
        if (data.media_type === "movie") {
          mediaTypeIcon.setAttribute(
            "class",
            "fa fa-film media-type-mediaTypeIcon"
          );
          mediaType.append(mediaTypeIcon);
          mediaType.insertAdjacentText("beforeend", "Movie");
        } else if (data.media_type === "tv") {
          mediaTypeIcon.setAttribute(
            "class",
            "fa fa-tv media-type-mediaTypeIcon"
          );
          mediaType.append(mediaTypeIcon);
          mediaType.insertAdjacentText("beforeend", "TV");
        }

        const rating = document.createElement("span");
        const ratingIcon = document.createElement("i");
        rating.setAttribute("class", "rating");
        ratingIcon.setAttribute("class", "fa fa-star rating-star");
        rating.append(ratingIcon);
        rating.insertAdjacentText("beforeend", data.vote_average);

        dataCard.append(cardImg);
        dataCard.append(cardTitle);

        if (data.release_date || data.first_air_date) {
          dataCard.append(cardDate);
        }

        const popularity = document.createElement("span");
        const popularityIcon = document.createElement("i");
        popularity.setAttribute("class", "popularity");
        popularityIcon.setAttribute("class", "fa fa-fire popularity-icon");
        popularity.append(popularityIcon);
        popularity.insertAdjacentText("beforeend", data.popularity);

        const dataCardInfo = document.createElement("div");
        dataCardInfo.setAttribute("class", "data-card-info");
        dataCardInfo.append(rating);
        dataCardInfo.append(popularity);

        dataCard.append(mediaType);
        dataCard.append(dataCardInfo);

        trends.append(dataCard);
      });
    })
    .catch((err) => console.error(err));
};

getTrending("day");
trendsTodayButton.classList.add("trends-control-btn-active");

trendsTodayButton.addEventListener("click", () => {
  getTrending("day");
  trendsWeeklyButton.classList.remove("trends-control-btn-active");
  trendsTodayButton.classList.add("trends-control-btn-active");
});

trendsWeeklyButton.addEventListener("click", () => {
  getTrending("week");
  trendsTodayButton.classList.remove("trends-control-btn-active");
  trendsWeeklyButton.classList.add("trends-control-btn-active");
});

const scrollCards = (direction) => {
  let container = document.getElementById("trends");
  let card = document.getElementById("data-card");

  let amount = container.offsetWidth - (card.offsetWidth + 50 + 20);

  if (direction === "left") {
    smoothScroll(container, container.scrollLeft - amount);
  } else if (direction === "right") {
    smoothScroll(container, container.scrollLeft + amount);
  }
};

const smoothScroll = (element, target) => {
  let start = element.scrollLeft;
  let change = target - start;
  let currentTime = 0;
  let increment = 20;
  let duration = 650;

  const animateScroll = () => {
    currentTime += increment;
    let val = easeInOutQuad(currentTime, start, change, duration);
    element.scrollLeft = val;

    // Verifica se atingiu o limite máximo à esquerda
    if (element.scrollLeft <= 0) {
      trendsScrollBtnL.disabled = true;
      return;
    }

    // Verifica se atingiu o limite máximo à direita
    if (element.scrollLeft >= element.scrollWidth - element.clientWidth) {
      trendsScrollBtnR.disabled = true;
      return;
    }

    if (currentTime < duration) {
      requestAnimationFrame(animateScroll);
    }
  };

  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  requestAnimationFrame(animateScroll);
};

trendsScrollBtnL.addEventListener("click", () => {
  scrollCards("left");
  trendsScrollBtnR.disabled = false;
});

trendsScrollBtnR.addEventListener("click", () => {
  scrollCards("right");
  trendsScrollBtnL.disabled = false;
});
