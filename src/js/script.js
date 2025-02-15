"use strict";

// // Hämta modalen
// let modal = document.getElementById("myModal");
// let modalImg = document.getElementById("img01");
// let captionText = document.getElementById("caption");

// // Hämta alla bilder med klassen "myImg"
// let images = document.querySelectorAll(".myImg, .myImg img");

// // Lägg till klick-händelse på varje bild
// images.forEach(function(img) {
//     img.onclick = function() {
//         modal.style.display = "block";

//         if (this.tagName.toLowerCase() == "picture") {
//            modalImg.src = this.querySelector("img").src;
//           captionText.innerHTML = this.querySelector("img").alt;
//         } else {
//         modalImg.src = this.src;
//         captionText.innerHTML = this.alt;
//       }
//     };
// });

// // Stäng modalen vid klick på stängningsknappen
// let span = document.getElementsByClassName("close")[0];
// span.onclick = function() {
//     modal.style.display = "none";
// };

// // Stäng modalen om användaren klickar utanför bilden
// modal.onclick = function(event) {
//     if (event.target === modal) {
//         modal.style.display = "none";
//     }
// };






document.addEventListener("DOMContentLoaded", () => {
  let courses = [];
  let currentSort = { column: null, ascending: true };

  // Hämta JSON-data
  fetch('https://webbutveckling.miun.se/files/ramschema_ht24.json')
      .then(response => {
          if (!response.ok) throw new Error("Nätverksfel vid hämtning");
          return response.json();
      })
      .then(data => {
          courses = data;
          displayCourses(courses);
      })
      .catch(error => console.error("Fel vid hämtning:", error));

  // Visa kurser 
  function displayCourses(data) {
      const courseContainer = document.getElementById("course-list");
      courseContainer.innerHTML = "";

      data.forEach(course => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td>${course.coursename}</td>
              <td>${course.code}</td>
              <td>${course.progression}</td>
              <td><a href="${course.syllabus}" target="_blank">Kursplan</a></td>
          `;
          courseContainer.appendChild(row);
      });
  }

  //Sorteringsfunktion
  function sortCourses(column) {
      if (currentSort.column === column) {
          currentSort.ascending = !currentSort.ascending; 
      } else {
          currentSort.column = column;
          currentSort.ascending = true; 
      }

      const sortedData = [...courses].sort((a, b) => {
          if (a[column] < b[column]) return currentSort.ascending ? -1 : 1;
          if (a[column] > b[column]) return currentSort.ascending ? 1 : -1;
          return 0;
      });

      displayCourses(sortedData);
  }

  //  Filtreringsfunktion
  function filterCourses(event) {
      const searchText = event.target.value.toLowerCase();
      const filteredData = courses.filter(course =>
          course.code.toLowerCase().includes(searchText) || 
          course.coursename.toLowerCase().includes(searchText)
      );
      displayCourses(filteredData);
  }

  // Event Listeners
  document.getElementById("searchInput").addEventListener("input", filterCourses);
  
  document.querySelectorAll("th[data-sort]").forEach(header => {
      header.addEventListener("click", () => sortCourses(header.dataset.sort));
  });
});