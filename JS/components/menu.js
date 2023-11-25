class MainMenu extends HTMLElement {
    constructor() {
        super();
    }

    // Define the attributes to observe for changes
    static get observedAttributes() {
        return ['active-item']; // Add the names of attributes you want to observe
    }

    // Callback triggered when the element is added to the DOM
    connectedCallback() {
        // Create a shadow DOM for encapsulation
        const shadowRoot = this.attachShadow({ mode: 'closed' });

        // Get the attribute values
        const activeMenu = this.getAttribute('active-item') || 'index.html';

        // Create a template for the component's structure and styling
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                /* Styling for the menu */
                #menu {
                    display: flex;
                    justify-content: start;
                    height: 40px;
                    z-index: 100;
                }

                #menu ul {
                    padding: 0;
                    display: flex;
                    flex-wrap: wrap;
                    margin-top: 5px;
                    justify-content: space-between;
                }

                #menu ul li {
                    list-style: none;
                    border-radius: 3px;
                }

                #menu ul li a.active,
                #menu ul li a:hover {
                    background-color: rgba(40, 189, 179, 0.1);
                    cursor: pointer;
                }

                #menu ul li a {
                    text-decoration: none;
                    color: #28bdb3;
                    letter-spacing: .8px;
                    font-size: 18px;
                    padding: 3px 9px;
                }
            </style>

            <div id="menu">
                <ul>
                    <!-- Menu items with hyperlinks -->
                    <li><a href="index.html">Home</a></li>
                    <li><a href="about.html">About Us</a></li>
                    <li><a href="product.html#copper">Products</a></li>
                    <li><a href="sds-sheets.html">Safety Docs</a></li>
                    <li><a href="policies.html">Policies</a></li>
                    <li><a href="contact.html">Contact Us</a></li>
                </ul>
            </div>
        `;

        // Append the template content to the shadow DOM
        shadowRoot.appendChild(template.content);

        // Remove 'active' class from all menu items
        const menuItems = shadowRoot.querySelectorAll('a');

        menuItems.forEach(item => {
            item.classList.remove('active');
        });

        // Add 'active' class to the menu item specified by the 'active-item' attribute
        const activeMenuItem = shadowRoot.querySelector(`a[href="${activeMenu}"]`);

        if (activeMenuItem) {
            activeMenuItem.classList.add('active');
        }
    }
}

// Define the custom element 'main-menu'
customElements.define('main-menu', MainMenu);
