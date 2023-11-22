const TERMS_BTN = document.getElementById('terms-btn')
const POLICY_BTN = document.getElementById('policy-btn')
const TERMS_DIV = document.getElementById('terms-div')
const POLICY_DIV = document.getElementById('policy-div')

// Change display when "Terms of Use" is clicked
TERMS_BTN.addEventListener('click', () => {
    TERMS_BTN.classList.add('active')
    POLICY_BTN.classList.remove('active')

    TERMS_DIV.classList.remove('hidden')
    POLICY_DIV.classList.add('hidden')
})
// Change display when "Privacy Policy" is clicked
POLICY_BTN.addEventListener('click', () => {
    POLICY_BTN.classList.add('active')
    TERMS_BTN.classList.remove('active')

    POLICY_DIV.classList.remove('hidden')
    TERMS_DIV.classList.add('hidden')
})