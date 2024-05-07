document.addEventListener("DOMContentLoaded", function() {
    // Fetch and populate dishes
    fetch('dishes.json')
        .then(response => response.json())
        .then(dishes => {
            dishes.forEach(dish => {
                const dishPlaceholder = document.getElementById(dish.tokenName);
                if (dishPlaceholder) {
                    populateDish(dishPlaceholder, dish);
                }
            });

            // Initialize scroll behavior on sections
            initSectionScroll();
        })
        .catch(error => console.error('Error loading dishes:', error));
});

function populateDish(placeholder, dish) {
    // Create and append the Chinese name as h5
    const chineseNameHeading = document.createElement('h5');
    chineseNameHeading.textContent = dish.dishName.chinese;
    chineseNameHeading.className = 'dishNameCN'; 

    // Append icons directly after the Chinese name if needed
    appendIcons(chineseNameHeading, dish);

    // Create and append the English name as h6
    const englishNameHeading = document.createElement('h6');
    englishNameHeading.textContent = dish.dishName.english;
    englishNameHeading.className = 'dishNameEN'; 

    // Create and append the description
    const descriptionParagraph = document.createElement('p');
    descriptionParagraph.textContent = dish.description;
    descriptionParagraph.className = 'dishDescription'; 

    // Append all to the placeholder
    placeholder.appendChild(chineseNameHeading);
    placeholder.appendChild(englishNameHeading);
    placeholder.appendChild(descriptionParagraph);

    // Conditionally create and append the details list
    if (dish.detailsVisible && dish.details && dish.details.length > 0) {
        appendDetailsList(placeholder, dish.details);
    }
}

function appendIcons(heading, dish) {
    if (dish.isVegan) {
        const veganIcon = document.createElement('img');
        veganIcon.src = 'links/icons/icon_ui_vegan.svg';
        veganIcon.alt = 'Vegan';
        veganIcon.className = 'icon';
        heading.appendChild(veganIcon);
    }

    if (dish.isSpicy) {
        const spicyIcon = document.createElement('img');
        spicyIcon.src = 'links/icons/icon_ui_spicy.svg';
        spicyIcon.alt = 'Spicy';
        spicyIcon.className = 'icon';
        heading.appendChild(spicyIcon);
    }
}

function appendDetailsList(placeholder, details) {
    const detailsList = document.createElement('ul');
    details.forEach(detail => {
        const listItem = document.createElement('li');
        listItem.textContent = detail;
        detailsList.appendChild(listItem);
    });
    placeholder.appendChild(detailsList);
}

