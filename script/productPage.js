import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";


const firebaseConfig = {
  apiKey: "AIzaSyCE0TPsHx1zBldGnNU5DPc3chlw3zUXCA8",
  authDomain: "shop-1c6f5.firebaseapp.com",
  databaseURL: "https://shop-1c6f5-default-rtdb.firebaseio.com",
  projectId: "shop-1c6f5",
  storageBucket: "shop-1c6f5.firebasestorage.app",
  messagingSenderId: "674508487983",
  appId: "1:674508487983:web:5b7b1b73587fc37b16f5da",
  measurementId: "G-055PGG44L4"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function loadProductDetails() {
 
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id'); 

  if (!productId) {
    console.error("Brak id produktu w URL.");
    return;
  }

 
  const productRef = ref(database, 'products/' + productId);


  get(productRef).then((snapshot) => {
    if (snapshot.exists()) {
      const product = snapshot.val();
      const productDetails = document.getElementById('product-details');

      if (productDetails && product) {
     
        const productHTML = `
          <div class="product-images">
            <div class="img-container">
                <img src="${product.mainImageUrl}" alt="${product.name}">
            </div>
            <div class="img3-container">
                <div> 
                    <img src="${product.img1Url}" alt="${product.name}">
                </div>
                <div> 
                    <img src="${product.img2Url}" alt="${product.name}">
                </div>
                <div> 
                    <img src="${product.img3Url}" alt="${product.name}">
                </div>
            </div>
          </div>
          <div class="product-tag">
            <h1>${product.name}</h1>
            <span class="material-symbols-outlined">star</span>
            <span class="material-symbols-outlined">star</span>
            <span class="material-symbols-outlined">star</span>
            <span class="material-symbols-outlined">star</span>
            <span class="material-symbols-outlined">star</span>
            <span>(15)</span>
            <p class="price">${product.price}</p>
            <p class="quantity">Quantity</p>
            <div class="quantity-control">
                <button class="minus">-</button>
                <input type="number" class="quantity" value="1" min="1">
                <button class="plus">+</button>
            </div>
            <p class="max-quantity">Max 2pcs</p>
            <h2>Free shipping <span>for orders over $1000.</span></h2>
            <button class="add-cart">Add to cart</button>
          </div>
        `;

        productDetails.innerHTML = productHTML;
      }
    } else {
      console.log("Produkt nie istnieje.");
    }
  }).catch((error) => {
    console.error("Błąd podczas pobierania danych produktu:", error);
  });
}


window.onload = loadProductDetails;
