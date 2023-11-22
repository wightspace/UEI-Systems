const PRODUCT_BUTTONS = document.querySelectorAll('.product-btn')
const PRODUCT_SHOWCASE = document.getElementById('product-showcase')

PRODUCT_BUTTONS.forEach(button => {
    button.addEventListener('click', () => {

        // Find the key related to the product button that was clicked
        let productJsonKey = button.id.replace('-menu-btn', '-product.json')
        productJsonKey = './JSON/' + productJsonKey

        getProductData(productJsonKey)
    })
})


function getProductData(jsonFile) {
    PRODUCT_SHOWCASE.innerHTML = ''

    fetch(jsonFile)
        .then((response) => response.json())
        .then((jsonObj) => {

            jsonObj.data.forEach(product => {
                if (product.aspect === 'horizontal') {
                    buildHorizontalCard(product)
                }
                if (product.aspect === 'vertical') {
                    buildVerticalCard(product)

                }
            })
            // add event listers to all horizontal view cards
            let h_cards = document.querySelectorAll('.prod-view-btn')
            h_cards.forEach((card) => {
                card.addEventListener('click', (event) => {
                    buildHorizontalPopup(event.target.id)
                })
            })
            // add event listers to all vertical view cards
            let v_cards = document.querySelectorAll('.vertical-prod-view-btn')
            v_cards.forEach((card) => {
                card.addEventListener('click', (event) => {
                    buildVerticalPopup(event.target.id)
                })
            })
        })
}

function buildHorizontalCard(product) {

    // Create the main product card div
    const prodCard = document.createElement('div')
    prodCard.className = 'prod-card'

    // Create the content div
    const prodCardContent = document.createElement('div')
    prodCardContent.className = 'prod-card-content'

    // Create the image div and img element
    const prodCardImage = document.createElement('div')
    prodCardImage.className = 'prod-card-content-image'
    const img = document.createElement('img')
    img.className = 'prod-image'
    img.src = product.thumbnailPath
    img.alt = product.title
    prodCardImage.appendChild(img)

    // Create the column div
    const prodCardColumn = document.createElement('div')
    prodCardColumn.className = 'prod-card-column'

    // Create the title div and p element
    const prodCardTitle = document.createElement('div')
    prodCardTitle.className = 'prod-card-content-title'
    const p = document.createElement('p')
    p.className = 'prod-title'
    p.innerText = product.title
    prodCardTitle.appendChild(p)

    // Create the button div and button element
    const prodCardButton = document.createElement('div')
    prodCardButton.className = 'prod-card-content-button'
    const btn = document.createElement('button')
    btn.id = product.id
    btn.className = 'prod-view-btn'
    btn.innerText = 'View Details'
    prodCardButton.appendChild(btn)

    // Append everything to the main div and then to PRODUCT_SHOWCASE
    prodCardColumn.appendChild(prodCardTitle)
    prodCardColumn.appendChild(prodCardButton)
    prodCardContent.appendChild(prodCardImage)
    prodCardContent.appendChild(prodCardColumn)
    prodCard.appendChild(prodCardContent)
    PRODUCT_SHOWCASE.appendChild(prodCard)

}

function buildVerticalCard(product) {

    // Create the main product card div
    const prodCard = document.createElement('div')
    prodCard.className = 'vertical-prod-card'

    // Create the content div
    const prodCardContent = document.createElement('div')
    prodCardContent.className = 'vertical-prod-card-content'

    // Create the image div and img element
    const prodCardImage = document.createElement('div')
    prodCardImage.className = 'vertical-prod-card-content-image'
    const img = document.createElement('img')
    img.className = 'vertical-prod-image'
    img.src = product.thumbnailPath
    img.alt = product.title
    prodCardImage.appendChild(img)

    // Create the column div
    const prodCardColumn = document.createElement('div')
    prodCardColumn.className = 'vertical-prod-card-column'

    // Create the button div and button element
    const prodCardButton = document.createElement('div')
    prodCardButton.className = 'vertical-prod-card-content-button'
    const btn = document.createElement('button')
    btn.id = product.id
    btn.className = 'vertical-prod-view-btn'
    btn.innerText = 'View Details'
    prodCardButton.appendChild(btn)

    // Create the title div and p element
    const prodCardTitle = document.createElement('div')
    prodCardTitle.className = 'vertical-prod-card-content-title'
    const p = document.createElement('p')
    p.className = 'vertical-prod-title'
    p.innerText = product.title
    prodCardTitle.appendChild(p)

    // Append everything to the main div and then to PRODUCT_SHOWCASE
    prodCardColumn.appendChild(prodCardImage)
    prodCardColumn.appendChild(prodCardButton)
    prodCardContent.appendChild(prodCardColumn)
    prodCard.appendChild(prodCardContent)
    prodCard.appendChild(prodCardTitle)
    PRODUCT_SHOWCASE.appendChild(prodCard)
}





const OVERLAY_ELEMENT = document.getElementById('overlay')
const POPUP_CONTAINER = document.getElementById('popup-container')

function buildHorizontalPopup(productID) {
    // console.log(`Horizontal Card Clicked: ${productID}`)
    OVERLAY_ELEMENT.classList.remove('hide')
    POPUP_CONTAINER.classList.remove('hide') // this might have to go after the popup build

    let productFile = assignProduct(productID)

    getPopupData(productFile, productID).then(popupData => {
        console.log("Title: " + popupData.title)
        console.log("Image: " + popupData.image)
        console.log("Description Text: " + popupData.description)
        console.log("Description Sizes: " + popupData.sizes)
        console.log("Product Number: " + popupData.prodNum)
        console.log("Price Type: " + popupData.priceType)
        console.log("Prices: " + popupData.prices)

        // build the horizontal popup here
        generatePopupHTML(popupData)
    })
}

function generatePopupHTML(popupData) {
    // Create the container for the close button
    const closeSpan = document.createElement('span')
    closeSpan.id = "close-popup"
    closeSpan.innerHTML = "&#10005;"

    // Create the popup content container
    const popupContent = document.createElement('div')
    popupContent.id = "popup-content"

    // Left section of the popup
    const leftPopup = document.createElement('section')
    leftPopup.id = "left-popup"

    const popupName = document.createElement('article')
    popupName.id = "popup-name"
    const namePara = document.createElement('p')
    namePara.textContent = popupData.title
    popupName.appendChild(namePara)

    const popupImgArticle = document.createElement('article')
    popupImgArticle.id = "popup-img"
    const img = document.createElement('img')
    img.src = popupData.image
    img.alt = popupData.title
    popupImgArticle.appendChild(img)

    const popupProdNum = document.createElement('article')
    popupProdNum.id = "popup-prod-num"
    const prodNumSpan = document.createElement('span')
    prodNumSpan.textContent = popupData.prodNum
    popupProdNum.appendChild(prodNumSpan)

    const popupPriceType = document.createElement('article')
    popupPriceType.id = "popup-price-type"
    const priceTypePara = document.createElement('p')
    priceTypePara.textContent = popupData.priceType
    popupPriceType.appendChild(priceTypePara)
    const hr = document.createElement('hr')
    popupPriceType.appendChild(hr)

    const popupPrice = document.createElement('article')
    popupPrice.id = "popup-price"
    const select = document.createElement('select')
    popupData.prices.forEach(price => {
        const option = document.createElement('option')
        option.textContent = price
        select.appendChild(option)
    })
    popupPrice.appendChild(select)

    leftPopup.appendChild(popupName)
    leftPopup.appendChild(popupImgArticle)
    leftPopup.appendChild(popupProdNum)
    leftPopup.appendChild(popupPriceType)
    leftPopup.appendChild(popupPrice)

    // Right section of the popup
    const rightPopup = document.createElement('section')
    rightPopup.id = "right-popup"
    const rightPopupWrapper = document.createElement('div')
    rightPopupWrapper.id = "right-popup-wrapper"
    const descriptionPara = document.createElement('p')
    descriptionPara.id = "popup-description"
    descriptionPara.innerHTML = `${popupData.description} ${popupData.sizes}`
    rightPopupWrapper.appendChild(descriptionPara)
    rightPopup.appendChild(rightPopupWrapper)

    // Add everything to the main container
    popupContent.appendChild(leftPopup)
    popupContent.appendChild(rightPopup)

    // Append to the POPUP_CONTAINER
    POPUP_CONTAINER.appendChild(closeSpan)
    POPUP_CONTAINER.appendChild(popupContent)

    document.getElementById('close-popup').addEventListener('click', () => {
        OVERLAY_ELEMENT.classList.add('hide')
        POPUP_CONTAINER.classList.add('hide')
    })
}



function buildVerticalPopup(productID) {
    // console.log(`Vertical Card Clicked: ${productID}`)
    OVERLAY_ELEMENT.classList.remove('hide')
    POPUP_CONTAINER.classList.remove('hide')// this might have to go after the popup build

    let productFile = assignProduct(productID)

    getPopupData(productFile, productID).then(popupData => {
        // console.log(popupData.title)
        // build the vertical popup here

        generatePopupHTML(popupData)
    })

}



async function getPopupData(jsonFile, productID) {
    POPUP_CONTAINER.innerHTML = ''

    let response = await fetch(jsonFile)
    let jsonObj = await response.json()

    for (let product of jsonObj.data) {
        if (product.id === productID) {
            let popupData = {
                title: product.title,
                image: product.imagePath,
                description: product.description.text,
                sizes: product.description.sizes,
                prodNum: product.prodNum,
                priceType: product.priceType,
                prices: product.prices
            }
            return popupData
        }
    }
}



function assignProduct(productID) {
    let firstChars = productID.slice(0, 3).toLowerCase()

    switch (firstChars) {
        case 'bra':
            return "./JSON/brass-product.json"
        case 'cop':
            return "./JSON/copper-product.json"
        case 'mag':
            return "./JSON/mag-product.json"
        case 'cou':
            return "./JSON/counter-product.json"
        case 'saf':
            return "./JSON/safety-product.json"
        default:
            console.log("ERROR IN SWITCH STATEMENT")
            break
    }
}