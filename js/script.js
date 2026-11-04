// =================== CUSTOM CURSOR ===================
const cursor = document.getElementById("cursor");
const cursorFollower = document.getElementById("cursorFollower");

if (cursor && cursorFollower) {
  let mouseX = 0,
    mouseY = 0;
  let followerX = 0,
    followerY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    cursorFollower.style.left = followerX + "px";
    cursorFollower.style.top = followerY + "px";
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  document
    .querySelectorAll(
      "a, button, .project-card, .service-card, .skill-category",
    )
    .forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(2)";
        cursorFollower.style.transform = "translate(-50%, -50%) scale(1.5)";
      });
      el.addEventListener("mouseleave", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(1)";
        cursorFollower.style.transform = "translate(-50%, -50%) scale(1)";
      });
    });
}

// =================== HEADER SCROLL ===================
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// =================== MOBILE MENU ===================
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => mobileMenu.classList.remove("open"));
  });
}

// =================== TYPING ANIMATION ===================
const typedTexts = [
  "Laravel Web Apps",
  "WordPress Websites",
  "WooCommerce Stores",
  "REST APIs",
];
let textIndex = 0,
  charIndex = 0,
  isDeleting = false;
const typedEl = document.getElementById("typedText");

function type() {
  if (!typedEl) return;
  const currentText = typedTexts[textIndex];
  if (isDeleting) {
    typedEl.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }
  let speed = isDeleting ? 60 : 120;
  if (!isDeleting && charIndex === currentText.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % typedTexts.length;
    speed = 400;
  }
  setTimeout(type, speed);
}
type();

// =================== PARTICLE CANVAS ===================
const canvas = document.getElementById("particleCanvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let particles = [];
  let animId;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.color = Math.random() > 0.5 ? "124,58,237" : "168,85,247";
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (
        this.x < 0 ||
        this.x > canvas.width ||
        this.y < 0 ||
        this.y > canvas.height
      ) {
        this.reset();
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 80; i++) particles.push(new Particle());

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(124,58,237,${(1 - dist / 100) * 0.12})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    connectParticles();
    animId = requestAnimationFrame(animateParticles);
  }
  animateParticles();
}

// =================== COUNTER ANIMATION ===================
function animateCounter(el, target) {
  let current = 0;
  const step = target / 50;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Number.isInteger(target)
      ? Math.floor(current)
      : current.toFixed(1);
  }, 40);
}

// =================== SCROLL REVEAL ===================
const revealEls = document.querySelectorAll(
  ".reveal-up, .reveal-left, .reveal-right",
);
const skillFills = document.querySelectorAll(".skill-fill");
const statNums = document.querySelectorAll(".stat-num");
let countersStarted = false;
let skillsStarted = false;

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = Array.from(revealEls).indexOf(el) * 80;
        setTimeout(() => el.classList.add("visible"), delay);
      }
    });
  },
  { threshold: 0.15 },
);

revealEls.forEach((el) => observer.observe(el));

// Skills observer
const skillsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !skillsStarted) {
        skillsStarted = true;
        skillFills.forEach((fill, i) => {
          setTimeout(() => {
            fill.style.width = fill.dataset.width + "%";
          }, i * 150);
        });
      }
    });
  },
  { threshold: 0.3 },
);

const skillsSec = document.querySelector(".skills-sec");
if (skillsSec) skillsObserver.observe(skillsSec);

// Counter observer
const heroObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !countersStarted) {
        countersStarted = true;
        statNums.forEach((el) => {
          animateCounter(el, parseFloat(el.dataset.target));
        });
      }
    });
  },
  { threshold: 0.5 },
);

const heroStats = document.querySelector(".hero-stats");
if (heroStats) heroObserver.observe(heroStats);

// =================== PROJECT FILTER ===================
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    projectCards.forEach((card) => {
      if (filter === "all" || card.dataset.category === filter) {
        card.classList.remove("hidden");
        card.style.animation = "fadeInUp 0.5s ease forwards";
      } else {
        card.classList.add("hidden");
      }
    });
  });
});
// =================== CONTACT FORM → WHATSAPP ===================
const WHATSAPP_NUMBER = "923098096126"; // +92 309 8096126

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault(); // prevents page reload

    // Step 1: Read form data
    const inputs = contactForm.querySelectorAll("input, textarea");
    const name = inputs[0].value.trim();
    const email = inputs[1].value.trim();
    const subject = inputs[2].value.trim();
    const message = inputs[3].value.trim();

    // Step 2: Validation — no field may be empty
    if (!name || !email || !subject || !message) {
      shakeForm(contactForm);
      showToast("⚠️ Please fill all fields!", "error");
      return;
    }

    // Step 3: Build the message
    const wa = [
      "--------------------",
      "*Contact Message from Kiran Majeed Portfolio*",
      "--------------------",
      "",
      "*Name:* " + name,
      "*Email:* " + email,
      "*Subject:* " + subject,
      "",
      "*Message:*",
      message,
      "",
      "--------------------",
      "_Sent via kiranmajeedd.github.io/Portfolio_",
    ].join("\n");

    // Step 4: Build the WhatsApp URL
    const text = encodeURIComponent(wa);
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;

    // Step 5: Update button state
    const btn = contactForm.querySelector("button");
    const span = btn.querySelector("span");
    span.textContent = "Opening WhatsApp...";
    btn.disabled = true;

    // Step 6: Open WhatsApp
    setTimeout(() => {
      window.open(whatsappURL, "_blank"); 
      span.textContent = "Sent! ✓";
      showToast("✅ WhatsApp opened! Send the message.", "success");

      // Step 7: Reset the form
      setTimeout(() => {
        span.textContent = "Send Message";
        btn.disabled = false;
        contactForm.reset();
      }, 4000);
    }, 800);
  });
}

function shakeForm(form) {
  form.style.animation = "shake 0.4s ease";
  setTimeout(() => (form.style.animation = ""), 400);
}

function showToast(msg, type) {
  const existing = document.querySelector(".toast-msg");
  if (existing) existing.remove();
  const toast = document.createElement("div");
  toast.className = "toast-msg";
  toast.textContent = msg;
  toast.style.cssText = `
    position:fixed; bottom:2rem; right:2rem; z-index:9999;
    background:${type === "success" ? "#166534" : "#7f1d1d"};
    border:1px solid ${type === "success" ? "#22c55e" : "#ef4444"};
    color:#fff; padding:0.9rem 1.5rem;
    border-radius:12px; font-size:0.9rem;
    box-shadow:0 10px 30px rgba(0,0,0,0.4);
    animation:fadeInUp 0.4s ease;
    max-width:300px;
  `;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// =================== ACTIVE NAV LINK ===================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) current = section.getAttribute("id");
  });
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current)
      link.classList.add("active");
  });
});

// =================== SERVICE CARD MODAL ===================
const serviceDetails = {
  "laravel-app": {
    title: "🧩 Laravel Web Application",
    price: "Starting from $400",
    desc: "Custom web applications built from scratch with Laravel, PHP and MySQL, shaped around how your business actually works.",
    features: [
      "Database design and clean MVC architecture",
      "Admin panel with role-based access and permissions",
      "Accounting, inventory, sales and purchase style workflows",
      "Filterable reports with Excel/PDF export",
      "Interactive tables and forms using jQuery, AJAX and DataTables",
      "Authentication and secure data handling",
      "Deployment support on shared hosting or VPS",
      "Support after delivery",
    ],
  },
  "rest-api": {
    title: "🔌 REST API Development",
    price: "Starting from $150",
    desc: "Secure, well-structured REST APIs in Laravel for your web or mobile app.",
    features: [
      "Token authentication with Laravel Sanctum",
      "CRUD endpoints with validation and clear error responses",
      "Relationships, filtering and pagination",
      "Tested with Postman, collection shared with you",
      "Docker (Laravel Sail) development setup",
      "Clean, documented code",
    ],
  },
  "wordpress-site": {
    title: "📝 WordPress Website",
    price: "Starting from $150",
    desc: "Professional, responsive WordPress websites you can edit yourself with Elementor.",
    features: [
      "Custom design built with Elementor",
      "Fully responsive on mobile, tablet and desktop",
      "Basic on-page SEO setup",
      "Speed optimisation and caching setup",
      "Contact forms and social media integration",
      "Easy-to-edit pages, so you stay in control",
      "Short walkthrough of how to manage your site",
    ],
  },
  woocommerce: {
    title: "🛒 WooCommerce Store",
    price: "Starting from $250",
    desc: "A complete online store on WordPress and WooCommerce, ready to start taking orders.",
    features: [
      "Product catalogue with categories and variations",
      "Cart and checkout setup",
      "Payment gateway and shipping configuration",
      "Order and customer management",
      "Custom homepage and product page layout in Elementor",
      "Mobile-optimised shopping experience",
      "Basic store training and support",
    ],
  },
  "landing-page": {
    title: "🚀 Landing Page Design",
    price: "Starting from $80",
    desc: "Clean, high-converting landing pages built with Elementor or custom HTML/CSS/JS.",
    features: [
      "Single page, conversion-focused layout",
      "Clear call-to-action sections",
      "Lead capture or WhatsApp contact form",
      "Mobile-first design",
      "Fast delivery (2-3 days)",
      "Revisions included",
    ],
  },
  fixes: {
    title: "🔧 Customization & Bug Fixes",
    price: "Starting from $40",
    desc: "Fixes, new features and improvements for your existing Laravel or WordPress website.",
    features: [
      "Bug fixes and error resolution",
      "New features and custom modules",
      "Plugin and theme issues in WordPress",
      "Layout, colour and content changes",
      "Performance improvements",
      "Quick turnaround (24-48 hours for small fixes)",
    ],
  },
};

document.querySelectorAll(".service-cta").forEach((btn) => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.service;
    const data = serviceDetails[key];
    if (!data) return;
    const overlay = document.getElementById("modalOverlay");
    if (!overlay) return;
    document.getElementById("modalTitle").textContent = data.title;
    document.getElementById("modalPrice").textContent = data.price;
    document.getElementById("modalDesc").textContent = data.desc;
    const featuresList = document.getElementById("modalFeatures");
    featuresList.innerHTML = data.features.map((f) => `<li>${f}</li>`).join("");
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  });
});

document.getElementById("modalClose")?.addEventListener("click", closeModal);
document.getElementById("modalOverlay")?.addEventListener("click", (e) => {
  if (e.target.id === "modalOverlay") closeModal();
});

function closeModal() {
  document.getElementById("modalOverlay")?.classList.remove("open");
  document.body.style.overflow = "";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
