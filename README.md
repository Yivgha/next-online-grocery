## Online grocery store pet-project

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![Strapi](https://img.shields.io/badge/strapi-%232E7EEA.svg?style=for-the-badge&logo=strapi&logoColor=white) ![Render](https://img.shields.io/badge/Render.com-black?style=for-the-badge&logo=render.com&logoColor=white) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![PayPal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)

## About

This is an example of React app created with Next.js and Strapi backend plust PostgreSQL database deployed on Render.com. For styling i used TailwindCSS, some Shadcn components and Lucide icons. The main idea is to create realistic online grocery store with basic functionality:

- See list of products by category or search.
- Create user who can add products to cart, delete and make an order.
- Pay for the order online.
- See additional information about company.

## Main page

When user first comes to the site, they can see header with clickable logo, categories of products dropdown, searchbar and login button, also - animated slider, clickable categories grid, first 10 popular products, section about delivery info with default testimonials and footer with clickable component and "Go to hero section" button.

![Main](/public/about/main_hero.jpg)

![Main](/public/about/main_products.jpg)

![Main](/public/about/main_footer.jpg)

If user clicks on login button, they can use existing credentials to log in into system or create new account. Authorized users can see cart button and clickable menu on the top right corner instead of login button.

![Login](/public/about/login.jpg)

![Main](/public/about/main_menu.jpg)

## Usage

User can click on any product item on main page and see the modal popup, which gives the ability to add one or few similar items to cart quick. If item was added successfully, user will see small toast in the right bottom corner with information about it.

![Main](/public/about/pop-up.jpg)

They can click on category item or select a category in header dropdown and open category page, where only items from one category are showing.

![Main](/public/about/category_page.jpg)

If they want to search something by the product's name, they can add this to input and click "search" button or press "Enter" and they'll be redirected to Search page, where only products by selected query are showing.

![Main](/public/about/search.jpg)

After adding items to cart, they can see number of items in cart in header. On this icon click, right sidebar opens, where user can see list of selected items and total price. They can delete item and list will change dynamically. On button "Checkout" click user can see checkout page.

![Main](/public/about/cart.jpg)

## Checkout and order

On Checkout page user can add info for future delivery. They can fill info and after this PayPal button appears. Developers can test data sending by clicking on simple "Payment" button, which only creates order on backend without paying.

![Main](/public/about/checkout.jpg)

But with PayPal usage user will see their pop-up and must create a wallet a pay calculated sum in USD to finish order.

![Main](/public/about/pay_pal.jpg)

If they pay successfully, order will be created on backend and user will see new page with information about it.

![Main](/public/about/order-success.jpg)

They can click on Track button or open "My orders" page via menu in header. On this page user can see list of orders from latest to earliest.

![Main](/public/about/orders.jpg)

Each item is clickable and contains order id, date, status and list of ordered items plus price. Default status is "Pending", but admin can change it manualy to "Fulfilled" or "Rejected".

![Main](/public/about/order.jpg)

Each authenticated user has its own jwt token stored in localStorage. So after reloading page or re-opening browser all info is stored successfully.
