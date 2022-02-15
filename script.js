const itemsDois = document.querySelector('.cart__items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
  const alvo = event.target;
  itemsDois.removeChild(alvo);
  saveCartItems('cartItems', itemsDois.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function createElementDois(id) {
  const produtos = await fetchItem(id);
  
  const product = {
    sku: produtos.id,
    name: produtos.title,
    salePrice: produtos.price,
  };

  itemsDois.appendChild(createCartItemElement(product));
  saveCartItems('cartItems', itemsDois.innerHTML);
  console.log(itemsDois.innerHTML);
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));

  const botao = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  botao.addEventListener('click', () => {
    createElementDois(sku);
    /* console.log(itemsDois.innerHTML); */
  });
  section.appendChild(botao);

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

async function createElement() {
  const items = document.querySelector('.items');

  const produtos = await fetchProducts('computador');
  /* console.log(produtos, 'produtos'); */
  produtos.results.forEach((element) => {
    const product = {
      sku: element.id,
      name: element.title,
      image: element.thumbnail,
    };

  items.appendChild(createProductItemElement(product));
  });
}

async function storage() {
  const produtos = localStorage.getItem('cartItems');
  if (produtos) {
    console.log(produtos);
    itemsDois.innerHTML = produtos;
    
    const todasLi = document.querySelectorAll('li');
    todasLi.forEach((element) => {
      element.addEventListener('click', cartItemClickListener);
    });
  }
}

const limpando = () => {
  itemsDois.innerHTML = '';
};

window.onload = () => {
  storage();
  createElement();

  const limparCarrinho = document.querySelector('.empty-cart');
  limparCarrinho.addEventListener('click', limpando);
};
