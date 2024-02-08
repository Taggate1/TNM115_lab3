const serverUrl = "http://127.0.0.1:3000";
let oldPlanetKey = 11;

async function copyAllData(url) {
  const webPageURL = url;
  await fetch(serverUrl + "/data", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
        display(data, webPageURL);
        return data;
    });
}

async function copyPlanetData(url, planetKey) {
    const webPageURL = url;
    await fetch(serverUrl + "/data/" + planetKey, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }) .then((res) => res.json()).then((data) => {

        //let planetKey = webPageURL.searchParams.get("key");
        if (planetKey !== oldPlanetKey) {
          oldPlanetKey = planetKey;
          console.log(data);
          open(data, planetKey);
        }
    })
}

document.addEventListener("DOMContentLoaded", function () {
  console.log("HTML DOM tree loaded, and ready for manipulation.");
  const webPageURL = new URL(document.URL);
  console.log(webPageURL);
  let planetKey = webPageURL.searchParams.get("key");

  if (window.location.search == "") {
    copyAllData(webPageURL);
  } else {
    copyPlanetData(webPageURL, planetKey);
    // === YOUR FUNCTION CALL TO INITIATE THE GENERATION OF YOUR WEB PAGE SHOULD GO HERE ===
  }
});

// ===== PROVIDED JS SOURCE CODE --  ABOVE  =====
// ===== JS LAB 2 IMPLEMENTATION -- BENEATH =====

function display(solarSystemData, url) {
  async function getImgSource(planetName, imageTag) {
    const response = await fetch(serverUrl + "/image/" + planetName, {
      method: "GET",
      headers: {
        "Content-Type": "image/png",
      },
    });

    if (response.ok) {
      response.blob().then((blobBody) => {
        console.log(blobBody);
        const filepath = URL.createObjectURL(blobBody);
        imageTag.src = filepath;
      });
    } else {
      imageTag.src = "";
      imageTag.alt = planetName;
    }
  }

  document.body.innerHTML = "";
  const docBody = document.body;
  const allButton = document.createElement("button");
  allButton.innerHTML = "All";
  allButton.style.backgroundColor = "black";
  allButton.style.borderWidth = "0px";
  allButton.style.fontSize = "32px";
  allButton.style.color = "white";
  allButton.style.cursor = "pointer";
  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.justifyContent = "center";
  container.appendChild(allButton);
  container.style.marginBottom = "20px";
  docBody.appendChild(container);
  docBody.style.backgroundColor = "black";

  const grid = document.createElement("div");
  grid.style.display = "grid";
  grid.style.gridTemplateRows = "1fr 1fr 1fr";
  grid.style.gridTemplateColumns = "1fr 1fr 1fr";
  grid.style.gap = "10px";
  grid.style.alignItems = "center";
  grid.style.justifyContent = "center";

  const sunButton = document.createElement("button");
  const sun = document.createElement("div");
  sun.style.display = "flex";

  sunButton.innerHTML = solarSystemData.star.name;
  sunButton.style.backgroundColor = "black";
  sunButton.style.borderWidth = "0px";
  sunButton.style.fontSize = "24px";
  sunButton.style.color = "white";
  sunButton.style.cursor = "pointer";
  sun.appendChild(sunButton);

  const img = document.createElement("img");
  getImgSource(solarSystemData.star.name, img);
  img.style.width = "50%";
  sun.style.alignItems = "center";
  sun.style.justifyContent = "center";
  sun.style.flexDirection = "column";
  sun.appendChild(img);
  grid.appendChild(sun);
  const buttons = [];

  for (let i = 0; i < solarSystemData.planets.length; i++) {
    const tempButton = document.createElement("button");
    tempButton.innerHTML = solarSystemData.planets[i].name;
    tempButton.style.backgroundColor = "black";
    tempButton.style.borderWidth = "0px";
    tempButton.style.fontSize = "24px";
    tempButton.style.color = "white";
    tempButton.style.cursor = "pointer";
    buttons.push(tempButton);

    const planet = document.createElement("div");
    planet.style.display = "flex";
    planet.appendChild(tempButton);
    planet.style.alignItems = "center";
    planet.style.justifyContent = "center";
    planet.style.flexDirection = "column";

    const img = document.createElement("img");
    getImgSource(solarSystemData.planets[i].name, img);
    img.style.width = "50%";

    planet.appendChild(img);
    grid.appendChild(planet);
  }
  docBody.appendChild(grid);

  sunButton.onclick = function () {
    let param = new URLSearchParams(window.location.search);
    const key = 10;
    param.set("key", 10);
    window.location.search = param;
    copyPlanetData(url, 10);
  };
  buttons[0].onclick = function () {
    let param = new URLSearchParams(window.location.search);
    param.set("key", 0);
    window.location.search = param;
    copyPlanetData(url, 0);
  };
  buttons[1].onclick = function () {
    let param = new URLSearchParams(window.location.search);
    param.set("key", 1);
    window.location.search = param;
    copyPlanetData(url, 1);
  };
  buttons[2].onclick = function () {
    let param = new URLSearchParams(window.location.search);
    param.set("key", 2);
    window.location.search = param;
    copyPlanetData(url, 2);
  };
  buttons[3].onclick = function () {
    let param = new URLSearchParams(window.location.search);
    param.set("key", 3);
    window.location.search = param;
    copyPlanetData(url, 3);
  };
  buttons[4].onclick = function () {
    let param = new URLSearchParams(window.location.search);
    param.set("key", 4);
    window.location.search = param;
    copyPlanetData(url, 4);
  };
  buttons[5].onclick = function () {
    let param = new URLSearchParams(window.location.search);
    param.set("key", 5);
    window.location.search = param;
    copyPlanetData(url, 5);
  };
  buttons[6].onclick = function () {
    let param = new URLSearchParams(window.location.search);
    param.set("key", 6);
    window.location.search = param;
    copyPlanetData(url, 6);
  };
  buttons[7].onclick = function () {
    let param = new URLSearchParams(window.location.search);
    param.set("key", 7);
    window.location.search = param;
    copyPlanetData(url, 7);
  };
}

async function getImgSource(planetName, imageTag) {
  const response = await fetch(serverUrl + "/image/" + planetName, {
    method: "GET",
    headers: {
      "Content-Type": "image/png",
    },
  });

  if (response.ok) {
    response.blob().then((blobBody) => {
      console.log(blobBody);
      const filepath = URL.createObjectURL(blobBody);
      imageTag.src = filepath;
    });
  } else {
    imageTag.src = "";
    imageTag.alt = planetName;
  }
}

async function getNeighbors(planetKey) {
  const response = await fetch(serverUrl + "/neighbor/" + planetKey, {
    method: "GET",
    headers: {
      "Content-Type": "text/plain",
    },
  });
  return response.text();
}


async function open(solarSystemData, x) {
  // console.log(solarSystemData.planets[1].name);
  x = parseInt(x);
  console.log(x);
  const planetNeighbors = await getNeighbors(x);
  console.log(planetNeighbors);
  document.body.innerHTML = "";
  const docBody = document.body;
  const allButton = document.createElement("button");
  allButton.innerHTML = "All";
  allButton.style.backgroundColor = "black";
  allButton.style.borderWidth = "0px";
  allButton.style.fontSize = "32px";
  allButton.style.color = "white";
  allButton.style.cursor = "pointer";
  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.justifyContent = "center";
  container.appendChild(allButton);
  container.style.marginBottom = "20px";
  docBody.appendChild(container);
  docBody.style.backgroundColor = "black";

  const inf = document.createElement("div");
  inf.style.display = "flex";
  inf.style.alignItems = "center";
  inf.style.justifyContent = "center";
  inf.style.flexDirection = "row";
  inf.style.gap = "20px";

  if (x == 10) {
    const imgs = document.createElement("img");
    getImgSource(solarSystemData.name, imgs);
    imgs.style.width = "40%";
    inf.appendChild(imgs);
    const info = document.createElement("div");
    const text = document.createElement("p");
    text.innerHTML = solarSystemData.description;
    info.style.color = "white";
    info.appendChild(text);
    const list = document.createElement("ul");
    const neighbors = document.createElement("li");
    neighbors.innerHTML = "Neighbor: " + planetNeighbors + ".";
    list.appendChild(neighbors);
    info.appendChild(list);
    inf.appendChild(info);
    inf.style.marginLeft = "200px";
    inf.style.marginRight = "200px";
    docBody.appendChild(inf);
  } else {
    const imgp = document.createElement("img");
    getImgSource(solarSystemData.name, imgp);
    imgp.style.width = "40%";
    inf.appendChild(imgp);
    const info = document.createElement("div");
    const text = document.createElement("p");
    text.innerHTML = solarSystemData.description;
    text.style.color = "white";
    info.appendChild(text);
    const list = document.createElement("ul");
    const day = document.createElement("li");
    const year = document.createElement("li");
    const neighbors = document.createElement("li");
    const moons = document.createElement("li");
    if (solarSystemData.time_day < 1) {
      day.innerHTML = "A day on " + solarSystemData.name + " is " + solarSystemData.time_day * 24 + " hours on earth.";
      year.innerHTML = "A year on " + solarSystemData.name + " is " + solarSystemData.time_year + " years on earth.";
    } else {
      day.innerHTML = "A day on " + solarSystemData.name + " is " + solarSystemData.time_day + " days on earth.";
      year.innerHTML = "A year on " + solarSystemData.name + " is " + solarSystemData.time_year + " days on earth.";
    }
    neighbors.innerHTML = "Neighbors: " + planetNeighbors + ".";
    if (solarSystemData.moons != null) {
      moons.innerHTML = solarSystemData.name + "'s moons: " + solarSystemData.moons;
    }
    list.appendChild(day);
    list.appendChild(year);
    list.appendChild(neighbors);
    list.appendChild(moons);
    list.style.color = "white";
    info.appendChild(list);
    inf.appendChild(info);
    inf.style.marginLeft = "200px";
    inf.style.marginRight = "200px";
    docBody.appendChild(inf);
  }
  allButton.onclick = function () {
    copyAllData();
  };
}
