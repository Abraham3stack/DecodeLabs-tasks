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
  } catch (error) {
    // Error UI
    response.textContent = error.message || "Something went wrong";
    response.className = "form-status error";
  } finally {
    button.disabled = false;
    button.textContent = "Send Message";
  }
});