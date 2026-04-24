// ── Storage ───────────────────────────────────────────────────────────────────
let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
let points   = Number(localStorage.getItem("points"))       || 0;
//             ^^^^^^ forza sempre numero, mai stringa

// ── DOM refs ──────────────────────────────────────────────────────────────────
const list          = document.getElementById("list");
const pointsDisplay = document.getElementById("points");
const form          = document.getElementById("form");
const feedback      = document.getElementById("feedback"); // aggiungi nel HTML

// ── Render ────────────────────────────────────────────────────────────────────
function render() {
  list.innerHTML = "";

  if (workouts.length === 0) {
    list.innerHTML = "<li>Nessun allenamento registrato.</li>";
  } else {
    workouts.forEach((w, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${w.date} — ${w.km} km · ${w.time} min</span>
        <button onclick="removeWorkout(${index})">✕</button>
      `;
      list.appendChild(li);
    });
  }

  pointsDisplay.textContent = points;
}

// ── Aggiungi allenamento ──────────────────────────────────────────────────────
form.addEventListener("submit", function(e) {
  e.preventDefault();

  // Leggi e converti subito a numero
  const km   = parseFloat(document.getElementById("km").value);
  const time = parseInt(document.getElementById("time").value);

  // Validazione
  if (isNaN(km) || km <= 0) {
    showFeedback("Inserisci un valore km valido.", "error");
    return;
  }
  if (isNaN(time) || time <= 0) {
    showFeedback("Inserisci un tempo valido.", "error");
    return;
  }

  // Data odierna
  const date = new Date().toLocaleDateString("it-IT");

  // Aggiungi workout
  workouts.push({ km, time, date });

  // Punti: 10 per km (entrambi numeri certi)
  const earned = km * 10;
  points += earned;

  // Salva
  save();
  render();
  form.reset(); // pulisce i campi

  showFeedback(`+${earned} punti guadagnati! 🎉`, "success");
});

// ── Rimuovi allenamento ───────────────────────────────────────────────────────
function removeWorkout(index) {
  // Sottrai i punti del workout rimosso
  points -= workouts[index].km * 10;
  if (points < 0) points = 0;

  workouts.splice(index, 1);
  save();
  render();
}

// ── Salva su localStorage ─────────────────────────────────────────────────────
function save() {
  localStorage.setItem("workouts", JSON.stringify(workouts));
  localStorage.setItem("points",   points); // numero puro, no JSON.stringify
}

// ── Feedback visivo ───────────────────────────────────────────────────────────
function showFeedback(msg, type) {
  if (!feedback) return;
  feedback.textContent    = msg;
  feedback.style.color    = type === "error" ? "#e74c3c" : "#4caf7d";
  feedback.style.display  = "block";
  setTimeout(() => { feedback.style.display = "none"; }, 3000);
}

// ── Init ──────────────────────────────────────────────────────────────────────
render();
