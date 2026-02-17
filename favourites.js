document.addEventListener("DOMContentLoaded", function () {
  const wishlistBtn = document.getElementById("wishlistBtn");
  const wishlistDropdown = document.getElementById("wishlistDropdown");

  wishlistBtn.addEventListener("click", function (e) {
    e.stopPropagation();

    mobileMenu.classList.remove("open");
    hamburger.classList.remove("active");

    wishlistDropdown.classList.toggle("open");
  });

  document.addEventListener("click", function () {
    wishlistDropdown.classList.remove("open");
  });

  const key = "favourite_items";

  function getItems() {
    return JSON.parse(localStorage.getItem(key)) || [];
  }

  function saveItems(items) {
    localStorage.setItem(key, JSON.stringify(items));
  }

  function isFavourite(category, id) {
    return getItems().some(
      (item) => item.category === category && item.id === id,
    );
  }

  function addToFavourites(category, id) {
    const items = getItems();
    items.push({ category, id });
    saveItems(items);
  }

  function removeFromFavourites(category, id) {
    let items = getItems();

    items = items.filter(
      (item) => item.category !== category || item.id !== id,
    );

    saveItems(items);
  }

  function renderFavouriteItems() {
    const items = getItems();
    const container = document.getElementById("wishlistContainer");

    container.replaceChildren();

    if (items.length === 0) {
      const empty = document.createElement("p");
      empty.textContent = "Încă nu ai favorite.";
      empty.style.fontSize = "14px";
      empty.style.opacity = "0.7";
      container.appendChild(empty);
      return;
    }

    items.forEach((item) => {
      const originalCard = document.querySelector(
        `.product-card[data-category="${item.category}"][data-item-id="${item.id}"]`,
      );

      if (!originalCard) return;

      const imgSrc = originalCard.querySelector("img").src;
      const name = originalCard.querySelector(".product-name").textContent;

      const wrapper = document.createElement("div");
      wrapper.classList.add("wishlist-item");

      const img = document.createElement("img");
      img.src = imgSrc;

      const title = document.createElement("span");
      title.textContent = name;

      const removeBtn = document.createElement("button");
      removeBtn.classList.add("wishlist-remove");
      removeBtn.textContent = "×";

      removeBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        removeFromFavourites(item.category, item.id);
        updateHeartUI();
        renderFavouriteItems();
      });

      wrapper.appendChild(img);
      wrapper.appendChild(title);
      wrapper.appendChild(removeBtn);

      container.appendChild(wrapper);
    });
  }

  function updateHeartUI() {
    document.querySelectorAll(".product-card").forEach((card) => {
      const category = card.dataset.category;
      const id = card.dataset.itemId;
      const heart = card.querySelector(".heart-btn");

      if (isFavourite(category, id)) {
        heart.textContent = "♥";
        heart.style.color = "#c9a24d";
      } else {
        heart.textContent = "♡";
        heart.style.color = "";
      }
    });
  }


  
  document.querySelectorAll(".heart-btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();

      const card = btn.closest(".product-card");
      const category = card.dataset.category;
      const id = card.dataset.itemId;

      if (isFavourite(category, id)) {
        removeFromFavourites(category, id);
      } else {
        addToFavourites(category, id);
      }

      updateHeartUI();
      renderFavouriteItems();
    });
  });

  updateHeartUI();
  renderFavouriteItems();
});
