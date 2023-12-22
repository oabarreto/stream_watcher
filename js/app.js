const trends = document.getElementById("trends");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNWM3ODU4MDgyMWI4ZDI5OGFmYTU4Zjk5MjljOWUxNCIsInN1YiI6IjY1ODIxZDFlMGU2NGFmMDg5NmE4MzY4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8XdqdbXKZw4Q_Rs9TyCQrlWHd3uBrUAWEPf14Hj8kJk",
  },
};

fetch("https://api.themoviedb.org/3/trending/all/day?language=en-US", options)
  .then((response) => response.json())
  .then((response) => {
    const top5trends = response.results.slice(0, 5);

    top5trends.forEach((data) => {
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

      const cardDate = document.createElement("span");
      cardDate.setAttribute("class", "card-date");
      cardDate.textContent = (
        data.release_date || data.first_air_date
      ).replaceAll("-", ".");

      const icon = document.createElement("i");

      const mediaType = document.createElement("span");
      mediaType.setAttribute("class", "media-type");
      if (data.media_type === "movie") {
        icon.setAttribute("class", "fa fa-film media-type-icon");
        mediaType.appendChild(icon);
        mediaType.insertAdjacentText("beforeend", "Movie");
      } else if (data.media_type === "tv") {
        icon.setAttribute("class", "fa fa-tv media-type-icon");
        mediaType.appendChild(icon);
        mediaType.insertAdjacentText("beforeend", "TV");
      }

      dataCard.append(cardImg);
      dataCard.append(cardTitle);
      dataCard.append(cardDate);
      dataCard.append(mediaType);
      trends.append(dataCard);
    });
  })
  .catch((err) => console.error(err));
