// ===== Evidence Script =====
alert("Evidence Script Loaded");

// ===== Team Data =====
const teamMembers = [
  {
    name: "Luna",
    emoji: "🦭",
    evidence: [
      { question: "Q1", text: "Luna's Q1 evidence", type: "primary", why: "Explanation" },
      { question: "Q2", text: "Luna's Q2 evidence", type: "secondary", why: "Explanation" },
      { question: "Q3", text: "Luna's Q3 evidence", type: "primary", why: "Explanation" }
    ]
  },
  {
    name: "Sarah",
    emoji: "🦋",
    evidence: [
      { question: "Q1", text: "Sarah's Q1 evidence", type: "secondary", why: "Explanation" },
      { question: "Q2", text: "Sarah's Q2 evidence", type: "primary", why: "Explanation" },
      { question: "Q3", text: "Sarah's Q3 evidence", type: "secondary", why: "Explanation" }
    ]
  },
  {
    name: "Bekim",
    emoji: "⭐",
    evidence: [
      { question: "Q1", text: "Bekim's Q1 evidence", type: "primary", why: "Explanation" },
      { question: "Q2", text: "Bekim's Q2 evidence", type: "secondary", why: "Explanation" },
      { question: "Q3", text: "Bekim's Q3 evidence", type: "primary", why: "Explanation" }
    ]
  },
  {
    name: "Evan",
    emoji: "🏈",
    evidence: [
      { question: "Q1", text: "Evan's Q1 evidence", type: "secondary", why: "Explanation" },
      { question: "Q2", text: "Evan's Q2 evidence", type: "primary", why: "Explanation" },
      { question: "Q3", text: "Evan's Q3 evidence", type: "secondary", why: "Explanation" }
    ]
  }
];

// ===== References =====
const tbody = document.getElementById("evidence-body");
const teamSelect = document.getElementById("team-member");
const questionSelect = document.getElementById("question-filter");
const addRowBtn = document.getElementById("add-row");
const saveBtn = document.getElementById("save-chart");

// ===== Populate Team Member Dropdown =====
teamMembers.forEach(member => {
  const option = document.createElement("option");
  option.value = member.name.toLowerCase();
  option.textContent = member.name;
  teamSelect.appendChild(option);
});

// ===== Render Evidence Table =====
function renderTable() {
  tbody.innerHTML = "";
  const selectedMember = teamSelect.value;
  const selectedQuestion = questionSelect.value;

  teamMembers.forEach(member => {
    if (selectedMember !== "all" && selectedMember !== member.name.toLowerCase()) return;

    member.evidence.forEach(ev => {
      if (selectedQuestion !== "all" && selectedQuestion !== ev.question) return;

      const tr = document.createElement("tr");
      tr.dataset.member = member.name.toLowerCase();
      tr.dataset.question = ev.question;

      tr.innerHTML = `
        <td><textarea class="auto-textarea">${ev.text}</textarea></td>
        <td>
          <select class="type-select">
            <option value="primary" ${ev.type === "primary" ? "selected" : ""}>Primary Source</option>
            <option value="secondary" ${ev.type === "secondary" ? "selected" : ""}>Secondary Source</option>
            <option value="tertiary" ${ev.type === "tertiary" ? "selected" : ""}>Tertiary Source</option>
            <option value="other" ${ev.type === "other" ? "selected" : ""}>Other</option>
          </select>
        </td>
        <td>
          <select class="member-select">
            ${teamMembers.map(tm => `<option value="${tm.name.toLowerCase()}" ${tm.name === member.name ? "selected" : ""}>${tm.name}</option>`).join("")}
          </select>
        </td>
        <td><textarea class="auto-textarea">${ev.why}</textarea></td>
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
      <select class="type-select">
        <option value="primary">Primary Source</option>
        <option value="secondary">Secondary Source</option>
        <option value="tertiary">Tertiary Source</option>
        <option value="other">Other</option>
      </select>
    </td>
    <td>
      <select class="member-select">
        ${teamMembers.map(tm => `<option value="${tm.name.toLowerCase()}">${tm.name}</option>`).join("")}
      </select>
    </td>
    <td><textarea class="auto-textarea"></textarea></td>
    <td><button class="delete-row">Delete</button></td>
  `;
  tbody.appendChild(tr);

  tr.querySelector(".delete-row").addEventListener("click", () => {
    tr.remove();
  });
});

// ===== Save Chart =====
saveBtn.addEventListener("click", () => {
  const allRows = tbody.querySelectorAll("tr");
  allRows.forEach(row => {
    const memberName = row.querySelector(".member-select").value;
    const question = row.dataset.question || "Q1";
    const text = row.querySelector("td:nth-child(1) textarea").value;
    const type = row.querySelector(".type-select").value;
    const why = row.querySelector("td:nth-child(4) textarea").value;

    const memberObj = teamMembers.find(m => m.name.toLowerCase() === memberName);
    if (!memberObj.evidence) memberObj.evidence = [];
    memberObj.evidence.push({ question, text, type, why });
  });

  alert("Evidence chart saved!");
});

// ===== Filters =====
teamSelect.addEventListener("change", renderTable);
questionSelect.addEventListener("change", renderTable);

// ===== Initial Render =====
renderTable();
