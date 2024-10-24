"use strict";
const input = document.getElementById("filter");
const result = document.getElementById("result");
let list = [];
async function asyncFnc() {
  const response = await fetch(
    "https://www.episodate.com/api/most-popular?page=1"
  );
  try {
    if (!response.ok) {
      throw new Error("CannT FIND");
    }
    const cmback = await response.json();
    cmback.tv_shows.forEach(function (element) {
      const li = document.createElement("li");
      const p = document.createElement("p");
      p.textContent = `${element.name}`;
      const img = document.createElement("img");
      img.classList.add("searchimg");
      img.src = element.image_thumbnail_path;

      li.appendChild(p);
      li.appendChild(img);

      list.push(li);
      result.appendChild(li);
    });
  } catch (e) {}
}
asyncFnc();
function filt(search) {
  list.forEach(function (item) {
    if (
      item.innerText.toLowerCase().trim().includes(search.toLowerCase().trim())
    ) {
      item.classList.add("hide");
    } else {
      item.classList.remove("hide");
    }
  });
}
input.addEventListener("keyup", function () {
  filt(this.value);
});

//
const imgDV = document.getElementById("imgs");
let currentImage;
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};
const imageEL = function (images) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement("img");
    img.src = images;
    img.addEventListener("load", function () {
      imgDV.appendChild(img);
      resolve(img);
    });
    img.addEventListener("error", function () {
      reject(new Error("IMG NT FOUND"));
    });
  });
};
imageEL("imgs/1.jpg")
  .then(function (newImage) {
    currentImage = newImage;
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = "none";
    return imageEL("imgs/2.jpg");
  })
  .then(function (newImage2) {
    currentImage = newImage2;
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = "none";
    return imageEL("imgs/3.jpeg");
  })
  .then((newImage3) => {
    currentImage = newImage3;
    return wait(1);
  })
  .then(() => {
    currentImage.style.display = "none";
  })
  .catch(function (error) {
    const pError = document.createElement("p");
    imgDV.appendChild(pError);
  });
