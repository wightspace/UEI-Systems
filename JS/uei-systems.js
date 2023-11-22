// Burger Menu
// Hamburger click event
document.getElementById('hamburger').addEventListener('click', function () {
    // document.getElementsById('container').style.zIndex = '-100'
    document.getElementById('menu').style.display = 'flex'
    document.getElementById('close-menu').style.display = 'block' // Show the close button
})

// Close-menu click event
document.getElementById('close-menu').addEventListener('click', function () {
    document.getElementById('menu').style.display = 'none'
    document.getElementById('close-menu').style.display = 'none' // Hide the close button again
})


window.addEventListener('resize', function () {
    if (window.innerWidth > 600) {
        document.getElementById('menu').style.display = '' // Reset to default display property
        document.getElementById('close-menu').style.display = 'none' // Hide the close button again
    }
})

