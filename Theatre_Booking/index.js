"use strict";

const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const movieSelect = document.getElementById("movie");
const count = document.getElementById("count");
const total = document.getElementById("total");


function populateUI() {

    const selectedSeats = JSON.parse(localStorage.getItem("selectedMovieIndex"));
    console.log(selectedSeats);

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected");
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem("movieIndex");

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

populateUI();

let ticketPrice = +movieSelect.value;


function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem("movieIndex", movieIndex);
    localStorage.setItem("moviePrice", moviePrice);
}


function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");

    const seatsIndex = Array.from(selectedSeats).map(seat => {
        return Array.from(seats).indexOf(seat);
    });

    /**
     * seatsIndex is an JavaScript Object, in localStorage we cannot
     * store an Object, it accepts only stringified value. So we have to
     * String the seatsIndex using JSON.stringify() and store in localStorage.
     */

    localStorage.setItem("selectedMovieIndex", JSON.stringify(seatsIndex));

    const selectedSeatsLength = selectedSeats.length;

    count.innerText = selectedSeatsLength;
    total.innerText = ticketPrice * selectedSeatsLength;
}

// Click Event on Seat
container.addEventListener("click", (e) => {
    if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
        e.target.classList.toggle("selected");
    }
    updateSelectedCount();
});

// Change Event on Movie
movieSelect.addEventListener("change", (e) => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value)
    updateSelectedCount();
});

updateSelectedCount();