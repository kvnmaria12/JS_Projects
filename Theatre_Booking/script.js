"use strict";

const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");


// populateUI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

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


// Set Movie Data to Local Storage
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem("movieIndex", movieIndex);
    localStorage.setItem("moviePrice", moviePrice);
}

// converting ticketPrice string value into number using the +(operator)
let ticketPrice = +movieSelect.value;

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");

    /**
     * How do we save our seats, because when I want to reload the page
     * the seats should not get lost. It should be there.
     * I have only the NodeList, I can't do anything with nodeList
     * We need to create an array of indexes
     * 
     * // We have to do three steps as given below
     * We need to copy the selectedSeats into an array
     * Map through array 
     * Return a new array of indexes 
     * */

    const seatsIndex = [...selectedSeats].map(seat => {
        return [...seats].indexOf(seat);
    });

    // setting in the localStorage
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}


// Movie Select Event
movieSelect.addEventListener("change", (e) => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value)
    updateSelectedCount();
})


// Seat Click Event
container.addEventListener("click", (e) => {
    if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
        e.target.classList.toggle("selected");
    }
    updateSelectedCount();
});


updateSelectedCount();