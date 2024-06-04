let currentId = 0;

let ratedMovies = [];



$(function() {

  $("#new-rating-form").on("submit", function(e) {
    e.preventDefault();
    let title = $("#title").val();
    let rating = $("#rating").val();

    let movieRating = {title, rating, currentId};
    const HTMLtoAppend = createMovieRatingHTML(movieRating);
    
    currentId++
    ratedMovies.push(movieRating);

    $("#movie-table-body").append(HTMLtoAppend);
    $("#new-rating-form").trigger("reset");
  });

  $("tbody").on("click", ".submit-btn.delete-btn", function(e) {

    let indexToRemoveAt = ratedMovies.findIndex(movie => movie.currentId === +$(e.target).data("deleteId"))

    ratedMovies.splice(indexToRemoveAt, 1);

    $(e.target).closest("tr").remove();

  });

  $(".fas").on("click", function(e) {

    let direction = $(e.target).hasClass("#fa-sort-down") ? "down" : "up";
    let keyToSortBy = $(e.target).attr("id");
    let sortedMovies = sortBy(ratedMovies, keyToSortBy, direction);

    $("#movie-table-body").empty();

    for(let movie of sortedMovies) {
      const HTMLtoAppend = createMovieRatingHTML(movie);
      $("#movie-table-body").append(HTMLtoAppend);
    }

    $(e.target).toggleClass("fa-sort-down");
    $(e.target).toggleClass("fa-sort-up");
  });
});

function sortBy(array, keyToSortBy, direction) {
  return array.sort(function(a,b) {

    if (keyToSortBy === "rating") {
      a[keyToSortBy] = +a[keyToSortBy];
      b[keyToSortBy] = +b[keyToSortBy];
    }
    if (a[keyToSortBy] > b[keyToSortBy]) {
      return direction === "up" ? 1 : -1;
    } else if (b[keyToSortBy] > a[keyToSortBy]) {
      return direction === "up" ? -1 : 1;
    }
    return 0;
  });
}

function createMovieRatingHTML(data) {
  return `
    <tr>
      <td>${data.title}</td>
      <td>${data.rating}</td>
      <td>
        <button class="submit-btn delete-btn" data-delete-id=${data.currentId}>
          Delete
        </button>
      <?td>    
    </tr>
  `;
}