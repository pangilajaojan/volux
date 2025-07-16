// Scroll to product section on button click
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".btn-primary").addEventListener("click", function () {
    document.getElementById("product").scrollIntoView({ behavior: "smooth" });
  });

  var btn = document.getElementById("scrollProductBtn");
  if (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var section = document.getElementById("product");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // Product Modal Logic
  var productImages = [
    { src: "img/Led cube2.png", alt: "Cube Image 1" },
    { src: "img/Led cube3.png", alt: "Cube Image 2" },
    { src: "img/led-cube4.png", alt: "Cube Image 3" },
  ];
  var modal = document.getElementById("productModal");
  var modalImg = document.getElementById("modalImg");
  var modalClose = document.getElementById("modalClose");
  var modalPrev = document.getElementById("modalPrev");
  var modalNext = document.getElementById("modalNext");
  var currentIndex = 0;

  function showModal(index) {
    currentIndex = index;
    modalImg.src = productImages[index].src;
    modalImg.alt = productImages[index].alt;
    modal.classList.add("active");
  }

  function hideModal() {
    modal.classList.remove("active");
    setTimeout(function () {
      modalImg.src = "";
    }, 300);
  }

  document.querySelectorAll(".product-img").forEach(function (img) {
    img.addEventListener("click", function () {
      var idx = parseInt(img.getAttribute("data-index"), 10);
      showModal(idx);
    });
  });

  modalClose.addEventListener("click", hideModal);
  modal.addEventListener("click", function (e) {
    if (e.target === modal) hideModal();
  });

  modalPrev.addEventListener("click", function (e) {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + productImages.length) % productImages.length;
    showModal(currentIndex);
  });

  modalNext.addEventListener("click", function (e) {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % productImages.length;
    showModal(currentIndex);
  });

  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (!modal.classList.contains("active")) return;
    if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + productImages.length) % productImages.length;
      showModal(currentIndex);
    } else if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % productImages.length;
      showModal(currentIndex);
    } else if (e.key === "Escape") {
      hideModal();
    }
  });

  // Mobile menu toggle
  var menuToggle = document.getElementById("menuToggle");
  var mobileMenu = document.getElementById("mobileMenu");
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      mobileMenu.classList.toggle("active");
      // Tambahkan class menu-open ke body agar konten turun
      document.body.classList.toggle("menu-open", mobileMenu.classList.contains("active"));
    });
    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll(".mobile-link").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileMenu.classList.remove("active");
        document.body.classList.remove("menu-open");
      });
    });
  }
});
