document.addEventListener("DOMContentLoaded", () => {
    loadFavorites();
});

function loadFavorites() {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const list = document.getElementById("favoritesList");

    if (!list) return;

    list.innerHTML = "";

    favorites.forEach(city => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
            <span class="city-name">${city} 🌍</span>
            <button class="fetch-btn" onclick="goToHomeAndSearch('${city}')">🔍 Hae sää</button>
            <button class="remove-btn" onclick="removeFavorite('${city}')">❌ Poista</button>
        `;
        list.appendChild(listItem);
    });
}

function removeFavorite(city) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter(item => item !== city);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    loadFavorites();
}


function goToHomeAndSearch(city) {
    window.location.href = `index.html?city=${city}`;
}








