# Client (Frontend) Project

This is the frontend for a case-study e-commerce platform built with **Next.js**, **React**, and **TypeScript**. It leverages modern UI libraries and tools like Tailwind CSS, Zustand for state management, and React Hook Form for form handling.

## Tech Stack

- Next.js  
- React  
- TypeScript  
- Tailwind CSS  
- Zustand  
- React Hook Form  
- Axios  
- js-cookie  
- Zod  
- Recharts  
- Headless UI  

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/mertoz41/ecom-client.git
cd ecom-client
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create a env. at root
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001/api

```

### 4. Run development server
```bash
npm run dev
```

## Build the project with production and start production server
```bash
npm run build
npm start
```

## Admin Routes
An admin user must be seeded in the backend
```bash
localhost:3000/admin/login
/admin/dashboard
/admin/products
/admin/orders
/admin/categories
/admin/variants
/admin/users
```

## Implemented Features
- Product listing pages in homepage and navigation to category pages
- Hero section in category pages
- Product detail page with image gallery, product info, pricing
- Add to cart functionality, quantity selection, and product specifications
- Checkout process with shipping address
- Customer registration, logic pages, customer dashboard showing order history
- Admin Dashboard
- Admin Product Management
- Responsive design, Next.js Image optimizations

## Missing Features
- Hero section, new arrivals, popular products, and newsletter signup form in homepage
- Filtering, sorting, searchbar and pagination
- Related products in product detail page
- Email verification
- Customer profile management, address book, wishlist
- Simple Recommendation system

## Live Link

https://e-com-lbmu.vercel.app

## Live Link Issue
Image paths
