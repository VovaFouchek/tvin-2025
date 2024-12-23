document.addEventListener('DOMContentLoaded', () => {
  initializeModal('.support-btn', 'support-modal');
  initializeModal('.connect-btn', 'connect-modal');
  initializeModal('.pay-btn', 'pay-modal');
  burgerMenu();
  initializeAccordion('.accordion');
  subTitleToggle();
});

function toggleVisibility(modal, shadow, action, shadowClass) {
  modal.classList[action]('act');
  shadow.classList[action](shadowClass);
  document.body.classList[action]('act');
}

function initializeModal(triggerSelector, modalId) {
  const openModalBtns = document.querySelectorAll(triggerSelector);
  const modal = document.getElementById(modalId);
  const burgerBtn = document.getElementById('burger-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const shadow = document.querySelector('.shadow');

  if (!modal) {
    console.error(`Modal with ID "${modalId}" not found.`);
    return;
  }

  openModalBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (mobileNav.classList.contains('act')) {
        toggleVisibility(mobileNav, shadow, 'remove', 'act2');
        burgerBtn.classList.remove('act');
      }
      toggleVisibility(modal, shadow, 'add', 'act');
    });
  });

  const closeModalBtn = modal.querySelector('.close-btn');
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => toggleVisibility(modal, shadow, 'remove', 'act'));
  }

  shadow.addEventListener('click', (event) => {
    if (event.target === shadow && modal.classList.contains('act')) {
      toggleVisibility(modal, shadow, 'remove', 'act');
    }
  });
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

function initializeAccordion(accordionSelector) {
  const accordionItems = document.querySelectorAll(`${accordionSelector} .accordion__item`);

  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion__item-trigger');
    const content = item.querySelector('.accordion__item-content');

    if (!item.classList.contains('act')) {
      content.style.maxHeight = 0;
    }

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('act');

      accordionItems.forEach(innerItem => {
        innerItem.classList.remove('act');
        innerItem.querySelector('.accordion__item-content').style.maxHeight = 0;
      });

      if (!isActive) {
        item.classList.add('act');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

function subTitleToggle() {
  const labels = document.querySelectorAll('.input-label');

  labels.forEach((label) => {
    const input = label.querySelector('input');
    const subTitle = label.querySelector('.sub-title');

    const updateOpacity = () => {
      if (input.value.trim() === '') {
        subTitle.style.opacity = 0;
      } else {
        subTitle.style.opacity = 1;
      }
    };

    updateOpacity();

    input.addEventListener('input', updateOpacity);
    input.addEventListener('blur', updateOpacity);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const searchInput = document.getElementById("search-input");
  const dropdown = document.querySelector(".dropdown");
  const options = document.querySelectorAll(".option");
  const cards = document.querySelectorAll(".tariffs__card");

  const prices = {
    vinnytsia: { turbo: 400, superg: 499, comfort: 300 },
    kalynivka: { turbo: 450, superg: 550, comfort: 350 },
    nemyriv: { turbo: 420, superg: 520, comfort: 320 },
  };

  const switchTab = (town) => {
    tabs.forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.town === town);
    });
    updatePrices(town);
  };

  const updatePrices = (town) => {
    cards.forEach((card) => {
      const tariff = card.dataset.tariff;
      const priceElement = card.querySelector(".price");

      priceElement.textContent = `${prices[town][tariff]}`;
    });
  };

  searchInput.addEventListener("input", () => {
    const filter = searchInput.value.toLowerCase();

    options.forEach((option) => {
      const text = option.textContent.toLowerCase();
      option.style.display = text.includes(filter) ? "block" : "none";
    });
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      const town = option.closest(".group").dataset.group;
      searchInput.value = option.textContent;

      switchTab(town);
      dropdown.style.display = "none";
    });
  });

  searchInput.addEventListener("focus", () => {
    dropdown.style.display = "block";
  });

  searchInput.addEventListener("blur", () => {
    setTimeout(() => {
      dropdown.style.display = "none";
    }, 200);
  });

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const town = tab.dataset.town;
      searchInput.value = "";

      switchTab(town);
    });
  });

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      cards.forEach((c) => c.classList.remove("wild"));

      card.classList.add("wild");
    });
  });
});

const form = document.querySelector('form');
const inner = document.querySelector('.form__wrap');
const loader = document.querySelector('.lds-roller');
const inputs = document.querySelectorAll('input');

// need to change
 const url = '/post'; 

const statusLoading = () => {
  loader.classList.add('active');
  form.classList.add('disabled');
};

const statusFailure = () => {
  const messageFailure = 'Ой, халепа. Будь ласка, спробуйте ще раз';
  loader.classList.remove('active');
  form.classList.remove('disabled');
  const statusMessage = document.createElement('div');
  statusMessage.classList.add('status');
  form.appendChild(statusMessage);
  statusMessage.textContent = messageFailure;
};

const statusSuccess = () => {
  loader.classList.remove('active');
  const statusSuccessMessage = document.createElement('div');
  statusSuccessMessage.classList.add('successPopUp');
  document.querySelector('.successPopUp').classList.add('success');
  inner.appendChild(statusSuccessMessage);
  document.querySelector('.form__wrap').classList.add('disabled');
};

const message = {
  loading: statusLoading,
  success: statusSuccess,
  failure: statusFailure,
};

const clearValues = () => {
  form.reset();
};

const handleSubmit = event => {
  event.preventDefault();
  message.loading();
  const userName = document.querySelector('#name').value;
  const userAddress = document.querySelector('#address').value;
  const userContactMethod = document.querySelector('.com-methods input[name="method"]:checked').value;
  const userContact = document.querySelector('#contact').value;

  const personalData = {
    name: userName,
    address: userAddress,
    contact: userContact,
    contact_method: userContactMethod,
  };

  addInfoToDatabase(personalData);
};

const addInfoToDatabase = async personalData => {
  const fetchData = {
    method: 'POST',
    body: JSON.stringify(personalData),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await fetch(url, fetchData); 

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    message.success();

    return response;
  } catch (error) {
    message.failure();
    setTimeout(() => document.querySelector('.status').remove(), 3000);

    return null;
  } finally {
    clearValues();
  }
};

form.addEventListener('submit', handleSubmit);
