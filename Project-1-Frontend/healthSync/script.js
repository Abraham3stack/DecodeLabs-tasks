const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const header = document.querySelector(".header");
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

// Hamburger toggle
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Sticky navbar
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("sticky");
    document.body.classList.add("sticky-active");
  } else {
    header.classList.remove("sticky");
    document.body.classList.remove("sticky-active");
  }
});

// Active link highlighting
window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(sec => {
    const sectionTop = sec.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = sec.getAttribute("id");
    }
  });

  navItems.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Fade-in Animation
const faders = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.2
});

faders.forEach(el => observer.observe(el));

// Scroll to section
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);

    target.scrollIntoView({
      behavior: "smooth"
    });

    navLinks.classList.remove("active");
  });
});

// Get started button
const getStartedBtn = document.getElementById("get-started-btn");

getStartedBtn.addEventListener("click", () => {
  const contactSection = document.getElementById("contact");

  contactSection.scrollIntoView({
    behavior: "smooth"
  });

  setTimeout(() => {
    document.getElementById("name").focus();
  }, 500);
});

// Form handling
const form = document.querySelector(".contact-form");
const response = document.getElementById("formStatus");
const button = form.querySelector("button");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    date: document.getElementById("date").value,
    message: document.getElementById("message").value,
  };

  // UI: Loading state
  button.disabled = true;
  button.textContent = "Submitting...";
  response.textContent = "";

  try {
    const res = await fetch("http://localhost:5001/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) throw new Error(result.message);

    // Success UI
    response.textContent = "Appointment booked successfully!";
    response.className = "form-status success";

    form.reset();
    getAppointments();
  } catch (error) {
    // Error UI
    response.textContent = error.message || "Something went wrong";
    response.className = "form-status error";
  } finally {
    button.disabled = false;
    button.textContent = "Send Message";
  }
});

// GetAppointments function
async function getAppointments() {
  const container = document.getElementById("appointments-list");

  if (!container) return; // prevent crash if element not found

  container.innerHTML = "<p>Loading appointments...</p>";

  try {
    const response = await fetch("http://localhost:5001/api/appointments");
    const result = await response.json();

    const appointments = result.data;

    if (!appointments || appointments.length === 0) {
      container.innerHTML = "<p>No appointments yet.</p>";
      return;
    }

    container.innerHTML = "";

    appointments.forEach((appt) => {
      const div = document.createElement("div");

      div.classList.add("appointment-card");

      div.innerHTML = `
        <h4>${appt.name}</h4>
        <p><strong>Email:</strong> ${appt.email}</p>
        <p><strong>Date:</strong> ${new Date(appt.date).toLocaleDateString()}</p>
        <p>${appt.message}</p>
      `;

      container.appendChild(div);
    });

  } catch (error) {
    container.innerHTML = "<p style='color:red;'>Failed to load appointments</p>";
    console.error("Error fetching appointments:", error);
  }
}

getAppointments();