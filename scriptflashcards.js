alert("Flashcards Script Loaded");

// ===== Team Data =====
const teamMembers = [
  { name: "Luna", emoji: "🦭", flashcards: [] },
  { name: "Sarah", emoji: "🦋", flashcards: [] },
  { name: "Bekim", emoji: "⭐", flashcards: [] },
  { name: "Evan", emoji: "🏈", flashcards: [] }
];

// ===== References =====
const teamSelect = document.getElementById("team-member");
const categorySelect = document.getElementById("category");
const typeSelect = document.getElementById("flashcard-type");
const addCardBtn = document.getElementById("add-card");
const tbody = document.querySelector("#flashcards-table tbody");

// ===== Populate Team Dropdown =====
teamMembers.forEach(member => {
  const option = document.createElement("option");
  option.value = member.name.toLowerCase();
  option.textContent = member.name;
  teamSelect.appendChild(option);
});

// ===== Render Flashcards =====
function renderFlashcards() {
  tbody.innerHTML = "";
  const selectedMember = teamSelect.value;
  const selectedCategory = categorySelect.value;

  teamMembers.forEach(member => {
    if (selectedMember !== "all" && selectedMember !== member.name.toLowerCase()) return;

    member.flashcards.forEach(fc => {
      if (selectedCategory !== "all" && selectedCategory !== fc.category) return;

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><input type="text" class="front" value="${fc.front}"></td>
        <td><input type="text" class="back" value="${fc.back}"></td>
        <td><input type="text" class="options" value="${fc.options.join(", ")}"></td>
        <td>${member.name}</td>
        <td>${fc.category}</td>
        <td><button class="delete">Delete</button></td>
      `;
      tbody.appendChild(tr);

      tr.querySelector(".delete").addEventListener("click", () => {
        member.flashcards = member.flashcards.filter(f => f !== fc);
        renderFlashcards();
      });
    });
  });
}

// ===== Add Card =====
addCardBtn.addEventListener("click", () => {
  const selectedMember = teamSelect.value === "all" ? "luna" : teamSelect.value; // default to Luna
  const memberObj = teamMembers.find(m => m.name.toLowerCase() === selectedMember);

  const newCard = {
    front: "",
    back: "",
    options: [],
    category: categorySelect.value === "all" ? "Q1" : categorySelect.value
  };
  memberObj.flashcards.push(newCard);
  renderFlashcards();
});

// ===== Filters =====
teamSelect.addEventListener("change", renderFlashcards);
categorySelect.addEventListener("change", renderFlashcards);

// ===== Initial Render =====
renderFlashcards();
