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
}
