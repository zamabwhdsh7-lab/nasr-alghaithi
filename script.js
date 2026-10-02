/* =========================================
   بيانات المنتجات
========================================= */

const products = [

    {
        id: 1,
        name: "برجر الذوق",
        category: "burger",
        categoryName: "برجر",
        price: 1500,
        emoji: "🍔",
        description: "برجر لحم طازج مع الجبن والخضار وصوص الذوق الخاص."
    },

    {
        id: 2,
        name: "برجر دبل",
        category: "burger",
        categoryName: "برجر",
        price: 2200,
        emoji: "🍔",
        description: "قطعتان من اللحم مع الجبن وصوص خاص لعشاق البرجر."
    },

    {
        id: 3,
        name: "بيتزا الذوق",
        category: "pizza",
        categoryName: "بيتزا",
        price: 3000,
        emoji: "🍕",
        description: "بيتزا ساخنة بالجبن والخضار والصلصة الخاصة."
    },

    {
        id: 4,
        name: "بيتزا دجاج",
        category: "pizza",
        categoryName: "بيتزا",
        price: 3500,
        emoji: "🍕",
        description: "بيتزا بالدجاج والجبن مع خلطة المطعم المميزة."
    },

    {
        id: 5,
        name: "وجبة الدجاج",
        category: "meal",
        categoryName: "وجبات",
        price: 2800,
        emoji: "🍗",
        description: "وجبة دجاج مقرمش مع البطاطس والصلصة والمشروب."
    },

    {
        id: 6,
        name: "وجبة عائلية",
        category: "meal",
        categoryName: "وجبات",
        price: 6500,
        emoji: "🍗",
        description: "وجبة عائلية متنوعة تكفي عدة أشخاص."
    },

    {
        id: 7,
        name: "كوكاكولا",
        category: "drink",
        categoryName: "مشروبات",
        price: 500,
        emoji: "🥤",
        description: "مشروب غازي بارد ومنعش."
    },

    {
        id: 8,
        name: "عصير طبيعي",
        category: "drink",
        categoryName: "مشروبات",
        price: 800,
        emoji: "🧃",
        description: "عصير طبيعي طازج يتم تحضيره عند الطلب."
    },

    {
        id: 9,
        name: "تشيز كيك",
        category: "dessert",
        categoryName: "حلويات",
        price: 1200,
        emoji: "🍰",
        description: "قطعة تشيز كيك كريمية بطعم غني ومميز."
    },

    {
        id: 10,
        name: "آيس كريم",
        category: "dessert",
        categoryName: "حلويات",
        price: 900,
        emoji: "🍨",
        description: "آيس كريم بارد ولذيذ مع إضافات متنوعة."
    }

];


/* =========================================
   المتغيرات
========================================= */

let cart = JSON.parse(localStorage.getItem("restaurantCart")) || [];

let selectedCategory = "all";

let currentModalProduct = null;


/* =========================================
   العناصر
========================================= */

const productsGrid =
    document.getElementById("productsGrid");

const categories =
    document.getElementById("categories");

const searchInput =
    document.getElementById("searchInput");

const noResults =
    document.getElementById("noResults");

const cartBtn =
    document.getElementById("cartBtn");

const cartSidebar =
    document.getElementById("cartSidebar");

const cartOverlay =
    document.getElementById("cartOverlay");

const closeCart =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");

const checkoutBtn =
    document.getElementById("checkoutBtn");

const themeBtn =
    document.getElementById("themeBtn");

const nav =
    document.getElementById("nav");

const menuToggle =
    document.getElementById("menuToggle");

const header =
    document.getElementById("header");

const productModal =
    document.getElementById("productModal");

const modalClose =
    document.getElementById("modalClose");

const modalAdd =
    document.getElementById("modalAdd");

const modalImage =
    document.getElementById("modalImage");

const modalTitle =
    document.getElementById("modalTitle");

const modalCategory =
    document.getElementById("modalCategory");

const modalDescription =
    document.getElementById("modalDescription");

const modalPrice =
    document.getElementById("modalPrice");

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toastMessage");


/* =========================================
   تنسيق السعر
========================================= */

function formatPrice(price) {

    return new Intl.NumberFormat("ar-YE").format(price)
        + " ريال";

}


/* =========================================
   عرض المنتجات
========================================= */

function renderProducts() {

    const searchValue =
        searchInput.value
            .trim()
            .toLowerCase();

    const filteredProducts =
        products.filter(product => {

            const matchCategory =
                selectedCategory === "all"
                || product.category === selectedCategory;

            const matchSearch =
                product.name
                    .toLowerCase()
                    .includes(searchValue)
                ||
                product.description
                    .toLowerCase()
                    .includes(searchValue);

            return matchCategory && matchSearch;

        });


    productsGrid.innerHTML = "";


    if (filteredProducts.length === 0) {

        noResults.style.display = "block";

        return;

    }


    noResults.style.display = "none";


    filteredProducts.forEach(product => {

        const card =
            document.createElement("article");

        card.className = "product-card";


        card.innerHTML = `

            <div class="product-image">
                ${product.emoji}
            </div>

            <div class="product-content">

                <div class="product-top">

                    <h3>
                        ${product.name}
                    </h3>

                    <span class="product-price">
                        ${formatPrice(product.price)}
                    </span>

                </div>

                <p class="product-description">
                    ${product.description}
                </p>

                <div class="product-actions">

                    <button
                        class="add-btn"
                        onclick="addToCart(${product.id})">

                        + أضف للسلة

                    </button>

                    <button
                        class="details-btn"
                        onclick="openProductModal(${product.id})">

                        ⓘ

                    </button>

                </div>

            </div>
        `;


        productsGrid.appendChild(card);

    });

}


/* =========================================
   تغيير التصنيف
========================================= */

categories.addEventListener("click", event => {

    const button =
        event.target.closest(".category");

    if (!button) return;


    document
        .querySelectorAll(".category")
        .forEach(btn => {

            btn.classList.remove("active");

        });


    button.classList.add("active");


    selectedCategory =
        button.dataset.category;


    renderProducts();

});


/* =========================================
   البحث
========================================= */

searchInput.addEventListener(
    "input",
    renderProducts
);


/* =========================================
   إضافة للسلة
========================================= */

function addToCart(productId) {

    const product =
        products.find(item => item.id === productId);

    if (!product) return;


    const existing =
        cart.find(item => item.id === productId);


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }


    saveCart();

    renderCart();

    showToast(
        `تمت إضافة ${product.name} إلى السلة`
    );

}


/* =========================================
   حفظ السلة
========================================= */

function saveCart() {

    localStorage.setItem(
        "restaurantCart",
        JSON.stringify(cart)
    );

}


/* =========================================
   عرض السلة
========================================= */

function renderCart() {

    const totalItems =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    const totalPrice =
        cart.reduce(
            (total, item) =>
                total + (item.price * item.quantity),
            0
        );


    cartCount.textContent =
        totalItems;


    cartTotal.textContent =
        formatPrice(totalPrice);


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <div>🛒</div>

                <h3>
                    السلة فارغة
                </h3>

                <p>
                    أضف بعض الوجبات اللذيذة إلى سلتك.
                </p>

            </div>

        `;

        return;

    }


    cartItems.innerHTML = "";


    cart.forEach(item => {

        const element =
            document.createElement("div");

        element.className = "cart-item";


        element.innerHTML = `

            <div class="cart-item-image">
                ${item.emoji}
            </div>

            <div class="cart-item-info">

                <h4>
                    ${item.name}
                </h4>

                <div class="cart-item-price">
                    ${formatPrice(item.price)}
                </div>

                <div class="quantity-controls">

                    <button
                        onclick="changeQuantity(${item.id}, 1)">
                        +
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(${item.id}, -1)">
                        −
                    </button>

                </div>

            </div>

            <button
                class="remove-item"
                onclick="removeFromCart(${item.id})">

                🗑

            </button>

        `;


        cartItems.appendChild(element);

    });

}


/* =========================================
   تعديل الكمية
========================================= */

function changeQuantity(productId, amount) {

    const item =
        cart.find(item => item.id === productId);

    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                item => item.id !== productId
            );

    }


    saveCart();

    renderCart();

}


/* =========================================
   حذف منتج
========================================= */

function removeFromCart(productId) {

    cart =
        cart.filter(
            item => item.id !== productId
        );


    saveCart();

    renderCart();

    showToast("تم حذف المنتج من السلة");

}


/* =========================================
   فتح السلة
========================================= */

function openCart() {

    cartSidebar.classList.add("show");

    cartOverlay.classList.add("show");

    document.body.classList.add("no-scroll");

}


/* =========================================
   إغلاق السلة
========================================= */

function closeCartSidebar() {

    cartSidebar.classList.remove("show");

    cartOverlay.classList.remove("show");

    document.body.classList.remove("no-scroll");

}


cartBtn.addEventListener(
    "click",
    openCart
);


closeCart.addEventListener(
    "click",
    closeCartSidebar
);


cartOverlay.addEventListener(
    "click",
    closeCartSidebar
);


/* =========================================
   نافذة تفاصيل المنتج
========================================= */

function openProductModal(productId) {

    const product =
        products.find(item => item.id === productId);

    if (!product) return;


    currentModalProduct =
        product;


    modalImage.textContent =
        product.emoji;

    modalTitle.textContent =
        product.name;

    modalCategory.textContent =
        product.categoryName;

    modalDescription.textContent =
        product.description;

    modalPrice.textContent =
        formatPrice(product.price);


    productModal.classList.add("show");

    document.body.classList.add("no-scroll");

}


function closeProductModal() {

    productModal.classList.remove("show");

    document.body.classList.remove("no-scroll");

}


modalClose.addEventListener(
    "click",
    closeProductModal
);


productModal.addEventListener(
    "click",
    event => {

        if (event.target === productModal) {

            closeProductModal();

        }

    }
);


modalAdd.addEventListener(
    "click",
    () => {

        if (!currentModalProduct) return;


        addToCart(
            currentModalProduct.id
        );


        closeProductModal();

    }
);


/* =========================================
   الوضع الليلي
========================================= */

const savedTheme =
    localStorage.getItem("restaurantTheme");


if (savedTheme === "dark") {

    document.body.classList.add("dark");

}


themeBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle("dark");


        const isDark =
            document.body.classList.contains("dark");


        localStorage.setItem(
            "restaurantTheme",
            isDark ? "dark" : "light"
        );

    }
);


/* =========================================
   القائمة في الجوال
========================================= */

menuToggle.addEventListener(
    "click",
    () => {

        nav.classList.toggle("show");

    }
);


document
    .querySelectorAll(".nav-link")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                nav.classList.remove("show");

            }
        );

    });


/* =========================================
   الهيدر عند التمرير
========================================= */

window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }
);


/* =========================================
   روابط التنقل النشطة
========================================= */

const sections =
    document.querySelectorAll("section[id]");


window.addEventListener(
    "scroll",
    () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            if (
                window.scrollY >= sectionTop
            ) {

                current =
                    section.getAttribute("id");

            }

        });


        document
            .querySelectorAll(".nav-link")
            .forEach(link => {

                link.classList.remove("active");


                if (
                    link.getAttribute("href")
                    === `#${current}`
                ) {

                    link.classList.add("active");

                }

            });

    }
);


/* =========================================
   نموذج التواصل
========================================= */

document
    .getElementById("contactForm")
    .addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document.getElementById("name").value;


            showToast(
                `شكرًا ${name}، تم استلام رسالتك`
            );


            event.target.reset();

        }
    );


/* =========================================
   إتمام الطلب
========================================= */

checkoutBtn.addEventListener(
    "click",
    () => {

        if (cart.length === 0) {

            showToast(
                "السلة فارغة، أضف وجبة أولًا"
            );

            return;

        }


        /*
            هنا لاحقًا يمكن ربط الطلب بـ:
            WhatsApp
            PHP / MySQL
            API
            نظام إدارة الطلبات
        */


        showToast(
            "تم تجهيز طلبك بنجاح"
        );

    }
);


/* =========================================
   الإشعارات
========================================= */

let toastTimer;


function showToast(message) {

    toastMessage.textContent =
        message;


    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove("show");

            },
            3000
        );

}


/* =========================================
   زر ESC
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeCartSidebar();

            closeProductModal();

        }

    }
);


/* =========================================
   سنة الفوتر
========================================= */

document.getElementById("year")
    .textContent =
    new Date().getFullYear();


/* =========================================
   تشغيل أولي
========================================= */

renderProducts();

renderCart();


/* =========================================
   شاشة التحميل
========================================= */

window.addEventListener(
    "load",
    () => {

        setTimeout(
            () => {

                document
                    .getElementById("loader")
                    .classList.add("hide");

            },
            700
        );

    }
);