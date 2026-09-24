function populateSeasons() {
    seasonSelect.innerHTML = '';
    const currentYear = new Date().getFullYear();
    
    for (let year = currentYear; year >= 1950; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        // Zajištění viditelnosti textu v možnostech
        option.style.color = '#ffffff';
        option.style.backgroundColor = '#1f1f1f';
        seasonSelect.appendChild(option);
    }

    // Výchozí výběr prvního roku
    seasonSelect.value = currentYear;
}