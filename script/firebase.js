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


export function loadProducts() {
  
  const productsRef = ref(database, 'products');


  get(productsRef).then((snapshot) => {
    if (snapshot.exists()) {
      const products = snapshot.val();
      const productList = document.getElementById('product-list'); 

 
      if (productList && products) {
        
        for (const id in products) {
          const product = products[id];

         
          const productHTML = `
            <a href="product_page.html?id=${id}">
              <div class="product">
                <div class="img-container" style="background-image: url('${product.mainImageUrl}');"></div>
                <div class="tag">
                  <h2>${product.name}</h2>
                  <p>${product.price}</p>
                </div>
              </div>
            </a>
          `;

     
          productList.innerHTML += productHTML;
        }
      }
    } else {
      console.log("No products found.");
    }
  }).catch((error) => {
    console.error("Error fetching products:", error);
  });
}


window.onload = loadProducts;

