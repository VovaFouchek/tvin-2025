
document.addEventListener('DOMContentLoaded', () => {
  supportModal();
  burgerMenu();
});

function toggleVisibility(modal, shadow, action, shadowClass) {
  modal.classList[action]('act');
  shadow.classList[action](shadowClass);
  document.body.classList[action]('act');
}

function burgerMenu() {
  const burgerBtn = document.getElementById('burger-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const shadow = document.querySelector('.shadow');
  const supportModal = document.getElementById('support-modal');
  const navLinks = document.querySelectorAll('.header__mob-menu__list .nav-link');

  const handleResize = () => {
    if (window.innerWidth > 1024) {
      toggleVisibility(mobileNav, shadow, 'remove', 'act2');
      burgerBtn.classList.remove('act');
    }
  };

  burgerBtn.addEventListener('click', () => {
    if (supportModal.classList.contains('act')) {
      toggleVisibility(supportModal, shadow, 'remove', 'act');
    }
    const action = burgerBtn.classList.contains('act') ? 'remove' : 'add';
    toggleVisibility(mobileNav, shadow, action, 'act2');
    burgerBtn.classList[action]('act');
  });

  shadow.addEventListener('click', (event) => {
    if (event.target === shadow) {
      toggleVisibility(mobileNav, shadow, 'remove', 'act2');
      burgerBtn.classList.remove('act');
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      toggleVisibility(mobileNav, shadow, 'remove', 'act2');
      burgerBtn.classList.remove('act');
    });
  });

  window.addEventListener('resize', handleResize);
}

function supportModal() {
  const openModalBtns = document.querySelectorAll('.support-btn');
  const modal = document.getElementById('support-modal');
  const burgerBtn = document.getElementById('burger-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const shadow = document.querySelector('.shadow');

  openModalBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (mobileNav.classList.contains('act')) {
        toggleVisibility(mobileNav, shadow, 'remove', 'act2');
        burgerBtn.classList.remove('act');
      }
      toggleVisibility(modal, shadow, 'add', 'act');
    });
  });

  const closeModalBtn = document.querySelector('.close-btn');
  closeModalBtn.addEventListener('click', () => toggleVisibility(modal, shadow, 'remove', 'act'));

  shadow.addEventListener('click', (event) => {
    if (event.target === shadow && modal.classList.contains('act')) {
      toggleVisibility(modal, shadow, 'remove', 'act');
    }
  });
}



document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const searchInput = document.getElementById("search-input");
  const dropdown = document.querySelector(".dropdown");
  const options = document.querySelectorAll(".option");
  const cards = document.querySelectorAll(".card");

  // Prices for each town
  const prices = {
    vinnytsia: { turbo: 400, superg: 499, comfort: 300 },
    kalynivka: { turbo: 450, superg: 550, comfort: 350 },
    nemyriv: { turbo: 420, superg: 520, comfort: 320 },
  };

  // Handle tab switching
  const switchTab = (town) => {
    tabs.forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.town === town);
    });
    updatePrices(town);
  };

  // Update prices based on town
  const updatePrices = (town) => {
    cards.forEach((card) => {
      const tariff = card.dataset.tariff;
      const priceElement = card.querySelector(".price");
      priceElement.textContent = `${prices[town][tariff]} грн / міс`;
    });
  };

  // Filter dropdown options based on search input
  searchInput.addEventListener("input", () => {
    const filter = searchInput.value.toLowerCase();
    options.forEach((option) => {
      const text = option.textContent.toLowerCase();
      option.style.display = text.includes(filter) ? "block" : "none";
    });
  });

  // Handle dropdown option selection
  options.forEach((option) => {
    option.addEventListener("click", () => {
      const town = option.closest(".group").dataset.group;
      searchInput.value = option.textContent;
      switchTab(town);
      dropdown.style.display = "none"; // Hide dropdown after selection
    });
  });

  // Show dropdown on focus
  searchInput.addEventListener("focus", () => {
    dropdown.style.display = "block";
  });

  // Hide dropdown on blur
  searchInput.addEventListener("blur", () => {
    setTimeout(() => {
      dropdown.style.display = "none";
    }, 200); // Add slight delay to allow option click
  });

  // Handle tab click
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const town = tab.dataset.town;
      switchTab(town);
    });
  });
});
