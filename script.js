document.addEventListener("DOMContentLoaded", async () => {
    const agentsGrid = document.getElementById("agents");
    const searchInput = document.getElementById("searchInput");
    const filterButtons = document.querySelectorAll(".filter-btn");
  
    const modal = document.getElementById("agentModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const modalImage = document.getElementById("modalImage");
    const agentAudio = document.getElementById("agentAudio");
    const closeButton = document.querySelector(".close-button");
  
    let agents = [];
  
    async function fetchAgents() {
      const res = await fetch("https://valorant-api.com/v1/agents?isPlayableCharacter=true");
      const data = await res.json();
      agents = data.data;
      renderAgents(agents);
    }
  
    function renderAgents(agentList) {
      agentsGrid.innerHTML = "";
      agentList.forEach(agent => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("data-role", agent.role?.displayName || "Unknown");
  
        card.innerHTML = `
          <img src="${agent.fullPortrait}" alt="${agent.displayName}">
          <h3>${agent.displayName}</h3>
        `;
  
        card.addEventListener("click", () => {
          modalTitle.textContent = agent.displayName;
          modalDescription.textContent = agent.description || "No description available.";
          modalImage.src = agent.fullPortrait || agent.displayIcon || "";
          modalImage.alt = agent.displayName;
  
          if (agent.voiceLine?.mediaList?.length > 0) {
            agentAudio.src = agent.voiceLine.mediaList[0].wave;
            agentAudio.style.display = "block";
          } else {
            agentAudio.style.display = "none";
          }
  
          modal.classList.add("show");
        });
  
        agentsGrid.appendChild(card);
      });
    }
  
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      const filtered = agents.filter(agent =>
        agent.displayName.toLowerCase().includes(query)
      );
      renderAgents(filtered);
    });
  
    filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const role = btn.getAttribute("data-filter");
        if (role === "all") {
          renderAgents(agents);
        } else {
          const filtered = agents.filter(agent => agent.role?.displayName === role);
          renderAgents(filtered);
        }
      });
    });
  
    closeButton.addEventListener("click", () => {
      modal.classList.remove("show");
    });
  
    window.addEventListener("click", event => {
      if (event.target === modal) {
        modal.classList.remove("show");
      }
    });
  
    fetchAgents();
  });
  document.getElementById("themeToggle").addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
});

  