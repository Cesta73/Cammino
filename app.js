let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
let points = JSON.parse(localStorage.getItem("points")) || 0;

const list = document.getElementById("list");
const pointsDisplay = document.getElementById("points");

function render() {
    list.innerHTML = "";
    workouts.forEach(w => {
        let li = document.createElement("li");
        li.textContent = `${w.km} km - ${w.time} min`;
        list.appendChild(li);
    });
    pointsDisplay.textContent = points;
}

document.getElementById("form").addEventListener("submit", function(e) {
    e.preventDefault();

    let km = document.getElementById("km").value;
    let time = document.getElementById("time").value;

    workouts.push({ km, time });

    // gamification: 10 punti per km
    points += km * 10;

    localStorage.setItem("workouts", JSON.stringify(workouts));
    localStorage.setItem("points", JSON.stringify(points));

    render();
});

render();
