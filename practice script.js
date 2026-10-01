// ===== Practice Script =====
alert("Practice Script Loaded");

// ===== Team Data =====
const teamMembers = [
  {
    name: "Josue",
    emoji: "⭐",
    practice: [
      { question: "Q1", content: "Josue's Q1 practice content" },
      { question: "Q2", content: "Josue's Q2 practice content" },
      { question: "Q3", content: "Josue's Q3 practice content" }
    ]
  },
  {
    name: "Emmalie",
    emoji: "⭐",
    practice: [
      { question: "Q1", content: "Emmalie's Q1 practice content" },
      { question: "Q2", content: "Emmalie's Q2 practice content" },
      { question: "Q3", content: "Emmalie's Q3 practice content" }
    ]
  },
  {
    name: "Brooks",
    emoji: "⭐",
    practice: [
      { question: "Q1", content: "Brooks' Q1 practice content" },
      { question: "Q2", content: "Brooks' Q2 practice content" },
      { question: "Q3", content: "Brooks' Q3 practice content" }
    ]
  },
  {
    name: "Naomi",
    emoji: "⭐",
    practice: [
      { question: "Q1", content: "Naomi's Q1 practice content" },
      { question: "Q2", content: "Naomi's Q2 practice content" },
      { question: "Q3", content: "Naomi's Q3 practice content" }
    ]
  }
];

// ===== References =====
const tbody = document.getElementById("practice-body");
const teamSelect = document.getElementById("team-member");
const questionSelect = document.getElementById("question-filter");
const addRowBtn = document.getElementById("add-row");
const saveBtn = document.getElementById("save-practice");

// ===== Populate Team Member Dropdown =====
teamMembers.forEach(member => {
  const option = document.createElement("option");
  option.value = member.name.toLowerCase();
  option.textContent = member.name;
  teamSelect.appendChild(option);
});

// ===== Render Practice Table =====
function renderTable() {
  tbody.innerHTML = "";
  const selectedMember = teamSelect.value;
  const selectedQuestion = questionSelect.value;

  teamMembers.forEach(member => {
    if (selectedMember !== "all" && selectedMember !== member.name.toLowerCase()) return;

    member.practice.forEach(pr => {
      if (selectedQuestion !== "all" && selectedQuestion !== pr.question) return;

      const tr = document.createElement("tr");
      tr.dataset.member = member.name.toLowerCase();
      tr.dataset.question = pr.question;

      tr.innerHTML = `
        <td><textarea class="auto-textarea">${pr.content}</textarea></td>
        <td>
          <select class="member-select">
            ${teamMembers.map(tm => `<option value="${tm.name.toLowerCase()}" ${tm.name === member.name ? "selected" : ""}>${tm.name}</option>`).join("")}
          </select>
        </td>
        <td><button class="delete-row">Delete</button></td>
      `;
      tbody.appendChild(tr);

      // Delete row
      tr.querySelector(".delete-row").addEventListener("click", () => {
        tr.remove();
      });
    });
  });
}

// ===== Add Row =====
addRowBtn.addEventListener("click", () => {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td><textarea class="auto-textarea"></textarea></td>
    <td>
      <select class="member-select">
        ${teamMembers.map(tm => `<option value="${tm.name.toLowerCase()}">${tm.name}</option>`).join("")}
      </select>
    </td>
    <td><button class="delete-row">Delete</button></td>
  `;
  tbody.appendChild(tr);

  tr.querySelector(".delete-row").addEventListener("click", () => {
    tr.remove();
  });
});

// ===== Save Practice =====
saveBtn.addEventListener("click", () => {
  const allRows = tbody.querySelectorAll("tr");
  allRows.forEach(row => {
    const memberName = row.querySelector(".member-select").value;
    const question = row.dataset.question || "Q1";
    const content = row.querySelector("td:nth-child(1) textarea").value;

    const memberObj = teamMembers.find(m => m.name.toLowerCase() === memberName);
    if (!memberObj.practice) memberObj.practice = [];
    memberObj.practice.push({ question, content });
  });

  alert("Practice sets saved!");
});

// ===== Filters =====
teamSelect.addEventListener("change", renderTable);
questionSelect.addEventListener("change", renderTable);

// ===== Initial Render =====
renderTable();
