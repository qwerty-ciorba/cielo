document.querySelectorAll(".category-list-item").forEach((item) => {
    const category = item.dataset.category;
    const itemId = item.dataset.itemId;

    item.addEventListener("click", function (e) {
        addToLocalStorage(category, itemId);
    });
});

function addToLocalStorage(category, itemId) {
    const key = "favourite_items";

    const items = JSON.parse(localStorage.getItem(key)) || [];

    const existingItem = items.find(
        (item) => item.category === category && item.id === itemId,
    );

    if (existingItem === undefined) {
        const newItem = { category, id: itemId, count: 1 };

        items.push(newItem);
        localStorage.setItem(key, JSON.stringify(items));
    } else {
        existingItem.count += 1;
        localStorage.setItem(key, JSON.stringify(items));
    }

    renderFavouriteItems();
}

// o functie care o sa faca display la itemele favorite
renderFavouriteItems();

function renderFavouriteItems() {
    const items = JSON.parse(localStorage.getItem("favourite_items")) || [];
    const parent = document.getElementById("favourite-items-container");

    parent.replaceChildren();

    items.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("favourite-item");

        const textElement = document.createElement("span");
        textElement.textContent = `${item.category} ${item.id} x${item.count}`;
        itemElement.appendChild(textElement);

        const button = document.createElement("button");
        button.classList.add("btn");
        button.textContent = "Delete";
        itemElement.appendChild(button);

        button.addEventListener("click", function (e) {
            deleteFavouriteItem(item.category, item.id);
        });

        parent.appendChild(itemElement);
    });
}

function deleteFavouriteItem(category, id) {
    const key = "favourite_items";
    let items = JSON.parse(localStorage.getItem(key)) || [];

    const item = items.find(
        (item) => item.category === category && item.id === id,
    );

    if (item.count == 1) {
        removeFromLocalStorage(category, id);
        return;
    }

    item.count--;

    localStorage.setItem(key, JSON.stringify(items));

    renderFavouriteItems();
}

function removeFromLocalStorage(category, id) {
    const key = "favourite_items";
    let items = JSON.parse(localStorage.getItem(key)) || [];

    items = items.filter(
        (item) => item.category !== category || item.id !== id,
    );

    localStorage.setItem(key, JSON.stringify(items));

    renderFavouriteItems();
}
