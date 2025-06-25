document.addEventListener("DOMContentLoaded", () => {
  const slotList = document.getElementById("slot-list");

  function fetchSlots() {
    fetch("http://localhost:3000/slots")
      .then(res => res.json())
      .then(slots => {
        slotList.innerHTML = "";
        slots.forEach(renderSlot);
      })
      .catch(error => {
        console.error("Error fetching slots:", error);
      });
  }

  function renderSlot(slot) {
    const div = document.createElement("div");
    div.className = "slot";
    if (slot.booked) div.classList.add("booked");

    const buttonLabel = slot.booked ? "Cancel" : "Book";

    div.innerHTML = `
      <h3>${slot.time}</h3>
      <p>Status: ${slot.booked ? "Booked" : "Available"}</p>
      <button>${buttonLabel}</button>
    `;

    const button = div.querySelector("button");
    button.addEventListener("click", () => toggleBooking(slot));

    slotList.appendChild(div);
  }

  function toggleBooking(slot) {
    const updated = { booked: !slot.booked };

    fetch(`http://localhost:3000/slots/${slot.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updated)
    })
    .then(res => res.json())
    .then(() => fetchSlots())
    .catch(err => console.error("Booking error:", err));
  }

  fetchSlots();
});











