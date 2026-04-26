// Modern JavaScript for Portfolio
class PortfolioApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupThemeToggle();
    this.setupNavigation();
    this.setupScrollEffects();
    this.setupContactForm();
    this.setupSkillAnimations();
    this.setupAccessibility();
  }

  // Theme Toggle Functionality
  setupThemeToggle() {
    const themeToggle = document.querySelector(".theme-toggle");
    const body = document.body;

    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme") || "light";
    this.setTheme(savedTheme);

    themeToggle?.addEventListener("click", () => {
      const currentTheme = body.getAttribute("data-theme") || "light";
      const newTheme = currentTheme === "light" ? "dark" : "light";
      this.setTheme(newTheme);
    });
  }

  setTheme(theme) {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        "content",
        theme === "dark" ? "#1a1a1a" : "#ffffff",
      );
    }
  }

  // Navigation Functionality
  setupNavigation() {
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    // Mobile menu toggle
    navToggle?.addEventListener("click", () => {
      const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", !isExpanded);
      navMenu?.classList.toggle("active");
    });

    // Smooth scrolling for navigation links
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }

        // Close mobile menu after clicking
        navMenu?.classList.remove("active");
        navToggle?.setAttribute("aria-expanded", "false");
      });
    });

    // Update active nav link on scroll
    this.updateActiveNavLink();
    window.addEventListener("scroll", () => this.updateActiveNavLink());
  }

  updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  // Scroll Effects
  setupScrollEffects() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    // Observe elements for animation
    document
      .querySelectorAll(".skill-category, .project-card, .timeline-item")
      .forEach((el) => {
        observer.observe(el);
      });

    // Parallax effect for hero section
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector(".hero");

      if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
      }
    });
  }

  // Contact Form Functionality
  setupContactForm() {
    const form = document.querySelector(".contact-form");

    form?.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      // Show loading state
      const submitBtn = form.querySelector(".form-submit");
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      try {
        // Simulate form submission (replace with actual API call)
        await this.submitContactForm(data);

        // Show success message
        this.showNotification("Message sent successfully!", "success");

        // Reset form
        form.reset();
      } catch (error) {
        // Show error message
        this.showNotification(
          "Failed to send message. Please try again.",
          "error",
        );
      } finally {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  async submitContactForm(data) {
    // Simulate API call - replace with actual implementation
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate random success/failure for demo
        Math.random() > 0.1 ? resolve() : reject();
      }, 2000);
    });
  }

  showNotification(message, type) {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add to DOM
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => notification.classList.add("show"), 100);

    // Remove after 5 seconds
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }

  // Skill Bar Animations
  setupSkillAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const progressBars =
              entry.target.querySelectorAll(".skill-progress");
            progressBars.forEach((bar, index) => {
              setTimeout(() => {
                bar.style.width = bar.style.width || "0%";
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.5 },
    );

    document.querySelectorAll(".skill-category").forEach((category) => {
      observer.observe(category);
    });
  }

  // Accessibility Enhancements
  setupAccessibility() {
    // Keyboard navigation for theme toggle
    document.addEventListener("keydown", (e) => {
      if (e.key === "t" && e.ctrlKey) {
        e.preventDefault();
        document.querySelector(".theme-toggle")?.click();
      }
    });

    // Skip to main content link (add to HTML if needed)
    const skipLink = document.createElement("a");
    skipLink.href = "#home";
    skipLink.className = "skip-link";
    skipLink.textContent = "Skip to main content";
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Focus management for mobile menu
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-menu");

    navToggle?.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        navToggle.click();
      }
    });

    // Close mobile menu on escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navMenu?.classList.contains("active")) {
        navMenu.classList.remove("active");
        navToggle?.setAttribute("aria-expanded", "false");
        navToggle?.focus();
      }
    });
  }
}

// Performance optimizations
class PerformanceOptimizer {
  static init() {
    // Lazy load images
    this.setupLazyLoading();

    // Preload critical resources
    this.preloadCriticalResources();

    // Optimize scroll performance
    this.optimizeScroll();
  }

  static setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove("lazy");
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach((img) => imageObserver.observe(img));
    }
  }

  static preloadCriticalResources() {
    // Preload critical fonts
    const fontLink = document.createElement("link");
    fontLink.rel = "preload";
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap";
    fontLink.as = "style";
    document.head.appendChild(fontLink);
  }

  static optimizeScroll() {
    let ticking = false;

    const updateScroll = () => {
      // Throttled scroll handlers
      ticking = false;
    };

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    });
  }
}

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new PortfolioApp();
  PerformanceOptimizer.init();
});

// Service Worker registration for PWA features (optional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => console.log("SW registered"))
      .catch((error) => console.log("SW registration failed"));
  });
}

// Export for potential testing
if (typeof module !== "undefined" && module.exports) {
  module.exports = { PortfolioApp, PerformanceOptimizer };
}
