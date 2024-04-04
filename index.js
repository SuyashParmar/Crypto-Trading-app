let cryptoData = { 
    Bitcoin: 10000,
    Ethereum: 3000,
    Ripple: 500,
    Crypto1: 2000,
    CryptoB:50000,
    Litecoin: 250,
    Cardano: 1500,
    Polkadot: 800,
    Stellar: 300,
    Chainlink: 2200,
    Uniswap: 1000,
    Dogecoin: 0.5,
    Solana: 1300,
    Monero: 400,
    Tezos: 350,
    Cosmos: 900,
    Aave: 500,
    Maker: 2500,
    Compound: 750,
    Yearn: 9000 
};
let userBalance = 1000000;
let userHoldings = {};
let userWishlist = {};
let currentCryptoPage = 'home';

document.addEventListener('DOMContentLoaded', () => {
    displayPage(currentCryptoPage);
});

function displayPage(page) {
    currentCryptoPage = page;
    const content = document.getElementById('content');
    content.innerHTML = '';

    if (page === 'home') {
        for (const crypto in cryptoData) {
            const card = createCryptoCard(crypto, cryptoData[crypto]);
            content.appendChild(card);
        }
    } else if (page === 'holdings') {
        content.innerHTML = '<h2>Holdings Page</h2>';
        displayHoldings();
    } else if (page === 'wishlist') {
        content.innerHTML = '<h2>Wishlist Page</h2>';
        displayWishlist();
    }
}

function createCryptoCard(crypto, price) {
    const card = document.createElement('div');
    card.classList.add('card');

    const title = document.createElement('h2');
    title.textContent = crypto;
    card.appendChild(title);

    const priceElement = document.createElement('p');
    priceElement.textContent = `Price: $${price}`;
    card.appendChild(priceElement);

    const actions = document.createElement('div');
    
    const addToWishlistBtn = createActionButton('Add to Wishlist', () => addToWishlist(crypto));
    actions.appendChild(addToWishlistBtn);

    const purchaseBtn = createActionButton('Purchase', () => showPurchasePopup(crypto, price));
    actions.appendChild(purchaseBtn);

    card.appendChild(actions);

    return card;
}

function createActionButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', onClick);
    return button;
}

function addToWishlist(crypto) {
    userWishlist[crypto] = 0; // You may modify this based on your wishlist implementation
    updateWishlistPopup(crypto);
}

function updateWishlistPopup(crypto) {
    alert(`Added ${crypto} to wishlist`);
}

function showPurchasePopup(crypto, price) {
    const quantity = prompt(`Enter the quantity of ${crypto} you want to purchase:`);
    if (quantity !== null && quantity !== '') {
        const totalCost = price * parseFloat(quantity);
        const confirmPurchase = confirm(`Do you want to purchase ${quantity} ${crypto} for $${totalCost}?`);
        if (confirmPurchase) {
            executePurchase(crypto, price, parseFloat(quantity));
        }
    }
}

function executePurchase(crypto, price, quantity) {
    const cost = price * quantity;
    if (userBalance >= cost) {
        userBalance -= cost;
        if (crypto in userHoldings) {
            userHoldings[crypto] += quantity;
        } else {
            userHoldings[crypto] = quantity;
        }
        updateBalance();
        updateHoldings();
        console.log(`Bought ${quantity} ${crypto} for $${cost}`);
    } else {
        alert('Insufficient funds');
    }
}

function updateBalance() {
    document.getElementById('balance').textContent = `Balance: $${userBalance}`;
}

function updateHoldings() {
    console.log('Updated holdings:', userHoldings);
}

function displayHoldings() {
    const holdingsContent = document.createElement('div');
    holdingsContent.innerHTML = '<h3>Holdings:</h3>';
    
    for (const crypto in userHoldings) {
        holdingsContent.innerHTML += `<p>${crypto}: ${userHoldings[crypto]}</p>`;
    }

    document.getElementById('content').appendChild(holdingsContent);
}

function displayWishlist() {
    const wishlistContent = document.createElement('div');
    wishlistContent.innerHTML = '<h3>Wishlist:</h3>';
    
    for (const crypto in userWishlist) {
        wishlistContent.innerHTML += `<p>${crypto}</p>`;
    }

    document.getElementById('content').appendChild(wishlistContent);
}





