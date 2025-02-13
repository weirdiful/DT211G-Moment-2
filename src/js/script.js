"use strict";

// Hämta modalen
let modal = document.getElementById("myModal");
let modalImg = document.getElementById("img01");
let captionText = document.getElementById("caption");

// Hämta alla bilder med klassen "myImg"
let images = document.querySelectorAll(".myImg, .myImg img");

// Lägg till klick-händelse på varje bild
images.forEach(function(img) {
    img.onclick = function() {
        modal.style.display = "block";

        if (this.tagName.toLowerCase() == "picture") {
          modalImg.src = this.querySelector("img").src;
          captionText.innerHTML = this.querySelector("img").alt;
        } else {
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
      }
    };
});

// Stäng modalen vid klick på stängningsknappen
let span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    modal.style.display = "none";
};

// Stäng modalen om användaren klickar utanför bilden
modal.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};



function openNav() {
  document.getElementById("menu").style.width = "250px";

}

function closeNav() {
  document.getElementById("menu").style.width = "0";
}


document.addEventListener("DOMContentLoaded", () => {
  fetch('.data/courses.json')
      .then(response => {
          if (!response.ok) {
              throw new Error("Nätverksfel vid hämtning");
          }
          return response.json();
      })
      .then(data => {
          displayCourses(data);
      })
      .catch(error => console.error("Fel vid hämtning:", error));
});

// Funktion för att visa kurser på sidan
function displayCourses(courses) {
  const courseContainer = document.getElementById("course-list");
  courseContainer.innerHTML = "";

  courses.forEach(course => {
      const courseElement = document.createElement("div");
      courseElement.classList.add("course");
      courseElement.innerHTML = `
          <h3>${course.coursename} (${course.code})</h3>
          <p>Progression: ${course.progression}</p>
          <a href="${course.syllabus}" target="_blank">Kursplan</a>
      `;
      courseContainer.appendChild(courseElement);
  });
}

