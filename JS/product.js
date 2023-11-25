/**
 * This function serves as an entry point that initializes the web page's interactivity 
 * once its content has been fully loaded.
 * 
 * 1. `initProductButtons()`: Sets up event listeners for all product buttons on page.
 *    When a product button is clicked, the 'active' class is toggled and product content  
 *    is displayed for clicked product
 * 
 * 2. `initWindowResizeHandler()`: Establishes event listener to monitor changes in window size.
 *    When window is resized, displayed product content adjusts based on the window width.
 * 
 * 3. `initializeOnLoad()`: Simulates a click event on the a specific button when the page loads.
 *    Checks URL fragment #copper, #brass, #mag, etc... Then simulates click on that product button
 *    
 */
document.addEventListener('DOMContentLoaded', function () {
    initProductButtons()
    initWindowResizeHandler()
    initializeOnLoad()
})

// ********************************
// --- Initialization functions ---
// ********************************

// Set event listeners on product buttons in product menu
function initProductButtons() {
    const buttons = document.querySelectorAll('.product-btn')

    buttons.forEach(button => {
        button.addEventListener('click', handleProductButtonClick)
    })
}

//  initializes  window resize event handler.
function initWindowResizeHandler() {
    window.addEventListener('resize', handleWindowResize)
}

//triggers click event on element when page loads
// pulls name of button clicked from the url fragment
function initializeOnLoad() {
    let currentUrl = location.href
    let productSelector = (currentUrl.split("#")[1]) + '-menu-btn'
    console.log(productSelector)
    document.getElementById(productSelector).click()
}

// ********************************
// --- Event handlers ---
// ********************************

// Handles a product button click event
function handleProductButtonClick(event) {
    const clickedButton = event.currentTarget
    toggleActiveClassOnButtons(clickedButton)
    updateProductContent(clickedButton)
}

// Handles the window resize event to adjust product content
function handleWindowResize() {
    const productCopyElement = document.querySelector('#product-copy p')
    const fullText = productCopyElement.getAttribute('data-fulltext') // Store the full text in a data attribute

    // Make the decision based on the window width
    if (window.innerWidth <= 1200) {
        restrictText(productCopyElement, 300, fullText)
    } else {
        productCopyElement.innerHTML = fullText // Display the full text
        removeReadButtons(productCopyElement)   // Remove any read more/less buttons
    }
}

// ********************************
// --- Helper functions ---
// ********************************

// Toggles the 'active' class on product buttons
function toggleActiveClassOnButtons(activeButton) {
    const buttons = document.querySelectorAll('.product-btn')
    buttons.forEach(button => {
        button.classList.remove('active')
    })
    activeButton.classList.add('active')
}

// Updates the product content based on the clicked button
function updateProductContent(button) {
    const productKey = button.id.replace('-menu-btn', '')
    const productData = productCopy[productKey]
    if (productData) {
        const productTitleElement = document.querySelector('#product-copy h2')
        const productCopyElement = document.querySelector('#product-copy p')
        productTitleElement.textContent = productData.title
        productCopyElement.textContent = productData.copy

        productCopyElement.setAttribute('data-fulltext', productData.copy) // Save the full text in a data attribute

        updateProductCopyText(productData.copy, productCopyElement)
    }
}

// Updates the product copy text based on screen width
function updateProductCopyText(text, productCopyElement) { // Accept productCopyElement as an argument
    if (window.innerWidth <= 1200) {
        restrictText(productCopyElement, 300, text) // Pass full text here
    } else {
        productCopyElement.innerHTML = text // Display full text for wider screens
        removeReadButtons(productCopyElement) // Remove any read more/less buttons
    }
}

// Removes 'Read More' and 'Read Less' buttons from the text element containing copy
function removeReadButtons(element) {
    const buttons = element.querySelectorAll('button')
    buttons.forEach(btn => {
        if (btn.textContent === 'Read More' || btn.textContent === 'Read Less') {
            element.removeChild(btn)
        }
    })
}


// Restricts the text content character limit on narrow screeens
function restrictText(element, limit, fullText) {
    if (element.textContent.length > limit && !element.querySelector('button')) {
        const truncatedText = element.textContent.substr(0, limit) + "..."
        element.innerHTML = truncatedText
        addReadMoreButton(element, truncatedText, fullText)
    }
}

// Adds 'Read More' button to expand text content
function addReadMoreButton(element, truncatedText, fullText) {
    const readMoreBtn = document.createElement('button')
    readMoreBtn.textContent = "Read More"
    element.appendChild(readMoreBtn)

    readMoreBtn.addEventListener('click', function () {
        if (readMoreBtn.textContent === "Read More") {
            element.innerHTML = fullText
            addReadLessButton(element, truncatedText, fullText)
        }
    })
}

// Adds 'Read Less' button to collapse text content
function addReadLessButton(element, truncatedText, fullText) {
    const readLessBtn = document.createElement('button')
    readLessBtn.textContent = "Read Less"
    element.appendChild(readLessBtn)

    readLessBtn.addEventListener('click', function () {
        element.innerHTML = truncatedText
        addReadMoreButton(element, truncatedText, fullText)
    })
}

// Removes any existing buttons from an element on wider screens
function removeExistingButtons(element) {
    const existingButton = element.querySelector('button')
    if (existingButton) {
        existingButton.remove()
    }
}


// Controls the display of the up-arrow-icon
window.addEventListener("DOMContentLoaded", function () {
    const arrowIcon = document.getElementById("up-arrow-icon")

    window.addEventListener("scroll", function () {
        if (window.scrollY >= 800) {
            arrowIcon.style.display = "block"
        } else {
            arrowIcon.style.display = "none"
        }
    })

    arrowIcon.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" })
    })
})


// This object contains the copy that gets populated to the marquee section
const productCopy = {
    copper: {
        title: 'GPC® MiraCopper®',
        copy: `UEI Systems offers superior grade metal sheets in a wide variety of sizes, gauges and in pre-sensitized or non-sensitized formats. We carry both copper and brass metals to meet the widest array of engraving needs. We thoroughly process our metal and quality inspect every sheet to insure perfection.

        And our pre-sensitized metal is coated with the finest aqueous photo resist available- AquaMulsion®.
        
        You will find one of the most impressive properties of our metal is consistency. Consistently free of impurities. Consistent hardness. Consistently uniform thickness. Consistent coatings. Consistent quality. All this results in better production for you. With UEI Systems’ high caliber metal consistency you can control your etching, your machining and hand engraving. The best engravers start with the best – UEI Systems metal.`
    },
    brass: {
        title: 'MiraBrass®',
        copy: `MiraBrass® metal plates are the premier brass plates for the engraving industry. UEI Systems® has chosen a superior grade of brass and perfectly processes it for optimum engraving performance.  MiraBrass® plates are offered in a wide variety of sizes, gauges and in pre-sensitized or uncoated formats.

        UEI Systems' line of MiraBrass® plates are very versatile and perfect for hand engraving, CNC machining, or photoengraving.
        
        You will find one of the most impressive properties of our metal plates is consistency. Consistently free of impurities. Consistent hardness. Consistently uniform thickness. Consistent coatings. Consistent quality. All of this results in better production for you. With UEI Systems’ high caliber metal consistency you can control your engraving. The best engravers start with the best – UEI Systems® metal.`
    },
    mag: {
        title: 'MiraMag®',
        copy: `UEI Systems® newest line of engraving plates is MiraMag®. A preferred magnesium plate product for its precision tolerances and superb parallelism. MiraMag® is available pre-sensitized with our premier negative photoresist for easy and effective imaging.  For precision hand engraving or CNC machining, we offer an uncoated MiraMag® plate.

        UEI Systems® also offers a complimentary line of MiraMag® photoengraving products designed to work perfectly with MiraMag® plates.  There are many MiraMag® options depending on your magnesium engraving requirements.
        
        You will find one of the most impressive properties of our metal plates is consistency. Consistently free of impurities. Consistent hardness. Consistently uniform thickness. Consistent coatings. Consistent quality. All of this results in better production for you. With UEI Systems’ high caliber metal consistency you can control your engraving. The best engravers start with the best – UEI Systems® metal.`
    },
    safety: {
        title: 'Safety Supplies',
        copy: `At UEI Systems, we understand the paramount importance of safety in any workplace. That's why we offer a comprehensive range of top-notch safety supplies designed to safeguard your employees and protect your assets. With a commitment to quality that's synonymous with our metals, our safety supplies are engineered for reliability and durability. Protect your workplace and your team with UEI Systems' safety supplies. Contact us today to find the perfect safety solutions tailored to your needs. Safety first, always.`
    },
    counter: {
        title: 'Counter Supplies',
        copy: `In the world of engraving, precision is paramount, and every detail counts. At UEI Systems, we understand the importance of having the right tools and supplies to ensure your work is nothing short of exceptional. That's why we offer a comprehensive range of counter supplies meticulously crafted to meet the exacting standards of engravers like you. At UEI Systems, we believe that every engraving should be a masterpiece. That's why we're dedicated to providing engravers with the finest counter supplies available. Our commitment to quality, consistency, and innovation ensures that your work will always shine.`
    }
}






