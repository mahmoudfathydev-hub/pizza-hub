# PizzaHub - Premium Food Ordering Platform

A modern, responsive food ordering application built with Next.js, Prisma, and Tailwind CSS. PizzaHub offers a seamless experience for browsing menus, discovering offers, and ordering delicious pizzas, all wrapped in a visually stunning interface.

## 🍕 Features

### For Customers

- **Interactive Menu**: Distinct categories (Pizzas, Sides, Drinks) with detailed item views
- **User Authentication**: Secure login, registration, and profile management
- **Order Management**: Complete cart functionality with checkout process
- **Order History**: View past orders and track current orders
- **Responsive Design**: Optimized experience across Desktop, Tablet, and Mobile devices
- **Newsletter Subscription**: Stay updated with exclusive deals
- **Multi-language Support**: English and Arabic with RTL support

### Technical Highlights

- **Component-Based Architecture**: Modular UI using React and modern standards
- **SEO Optimized**: Built with Next.js for optimal search engine visibility
- **Type Safety**: Full TypeScript implementation for robust code quality
- **Modern Styling**: Tailwind CSS for rapid, maintainable design

## 🛠️ Technology Stack

### Frontend

- **Next.js 16.1.4**: React framework with App Router
- **React 19**: Latest UI library
- **TypeScript**: Statically typed JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **next-intl**: Internationalization framework

### Backend & Database

- **PostgreSQL**: Relational database
- **Prisma ORM**: Next-generation Node.js and TypeScript ORM
- **NextAuth.js**: Complete authentication solution
- **Zod**: Schema validation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- npm, yarn, or pnpm

### Installation

1. **Clone the repository:**

```bash
git clone <repository-url>
cd food-ordering
```

2. **Install dependencies:**

```bash
npm install
# or
yarn install
```

3. **Set up environment variables:**
   Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/pizzahub"
```

4. **Initialize Database:**

```bash
npx prisma generate
npx prisma db push
```

5. **Run the development server:**

```bash
npm run dev
```

6. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🌍 Internationalization

This project supports:

- **English (en)**: Default language
- **Arabic (ar)**: Full RTL support
- **Dynamic Routing**: Locale-based URLs (/en/..., /ar/...)
- **Page-Specific Translations**: Dedicated translation files for each page

## 📁 Project Structure

```
src/
├── app/                                    # Next.js App Router
│   ├── [locale]/                          # Internationalized routes
│   │   ├── _components/                   # Page-specific components
│   │   │   ├── BestSellers.tsx           # Home page best sellers
│   │   │   ├── Deals.tsx                 # Home page deals section
│   │   │   ├── Hero.tsx                  # Home page hero section
│   │   │   └── Testimonails.tsx          # Home page testimonials
│   │   ├── about/                        # About page
│   │   │   ├── _components/
│   │   │   │   ├── about-hero.tsx        # About hero section
│   │   │   │   ├── about-values.tsx      # Company values
│   │   │   │   └── about-team.tsx        # Team section
│   │   │   └── page.tsx                  # About page component
│   │   ├── auth/                         # Authentication pages
│   │   │   ├── _components/
│   │   │   │   ├── auth-form.tsx         # Login/register form
│   │   │   │   └── auth-layout.tsx       # Auth page layout
│   │   │   ├── login/
│   │   │   │   └── page.tsx              # Login page
│   │   │   └── register/
│   │   │       └── page.tsx              # Registration page
│   │   ├── cart/                         # Shopping cart
│   │   │   ├── _components/
│   │   │   │   ├── CartItems.tsx         # Cart items list
│   │   │   │   └── CheckoutForm.tsx      # Checkout form
│   │   │   └── page.tsx                  # Cart page
│   │   ├── contact/                      # Contact page
│   │   │   ├── _components/
│   │   │   │   ├── contact-hero.tsx      # Contact hero
│   │   │   │   ├── contact-info.tsx      # Contact information
│   │   │   │   ├── contact-branches.tsx  # Branch locations
│   │   │   │   └── contact-newsletter.tsx # Newsletter signup
│   │   │   └── page.tsx                  # Contact page
│   │   ├── menu/                         # Menu page
│   │   │   └── page.tsx                  # Menu page component
│   │   ├── profile/                      # User profile page
│   │   │   └── page.tsx                  # Profile page
│   │   ├── globals.css                   # Global styles
│   │   ├── layout.tsx                    # Root layout component
│   │   └── page.tsx                      # Home page
│   └── not-found.tsx                     # 404 error page
│
├── components/                            # Reusable UI Components
│   ├── aos-init.tsx                      # AOS animation initializer
│   ├── edit-user-form/                   # User edit form components
│   ├── footer/                           # Footer components
│   │   └── Footer.tsx                   # Main footer component
│   ├── form-fields/                      # Form field components
│   ├── header/                           # Header components
│   │   ├── CartButton.tsx               # Shopping cart button
│   │   ├── index.tsx                    # Header wrapper
│   │   └── Navbar.tsx                   # Navigation bar
│   ├── link/                             # Custom link component
│   │   └── index.tsx
│   ├── main-heading/                     # Heading component
│   │   └── index.tsx
│   └── menu/                             # Menu-related components
│       ├── AddToCartButton.tsx          # Add to cart functionality
│       ├── index.tsx                    # Menu wrapper
│       └── MenuItem.tsx                 # Individual menu item
│
├── constants/                             # Constants and enums
│   └── enums.ts                          # Application enums
│
├── dictionaries/                          # Translation files
│   ├── about/                           # About page translations
│   │   ├── en.json                      # English translations
│   │   └── ar.json                      # Arabic translations
│   ├── admin/                           # Admin panel translations
│   │   ├── en.json
│   │   └── ar.json
│   ├── auth/                            # Authentication translations
│   │   ├── en.json
│   │   └── ar.json
│   ├── categories/                      # Category translations
│   │   ├── en.json
│   │   └── ar.json
│   ├── cart/                            # Cart page translations
│   │   ├── en.json
│   │   └── ar.json
│   ├── contact/                         # Contact page translations
│   │   ├── en.json
│   │   └── ar.json
│   ├── footer/                          # Footer translations
│   │   ├── en.json
│   │   └── ar.json
│   ├── menu/                            # Menu page translations
│   │   ├── en.json
│   │   └── ar.json
│   ├── navbar/                          # Navbar translations
│   │   ├── en.json
│   │   └── ar.json
│   ├── profile/                         # Profile page translations
│   │   ├── en.json
│   │   └── ar.json
│   ├── shared/                          # Shared translations
│   │   ├── en.json
│   │   └── ar.json
│   ├── en.json                          # Legacy English translations
│   └── ar.json                          # Legacy Arabic translations
│
├── hooks/                                # Custom React hooks
│   ├── useFormFields.ts                # Form field management
│   ├── useAuthFormFields.ts             # Auth form fields
│   ├── use-translations.ts             # Translation hook
│   └── use-toast.ts                    # Toast notifications
│
├── lib/                                  # Utilities and libraries
│   ├── cart.ts                          # Cart utilities
│   ├── cache.ts                         # Cache utilities
│   ├── formatters.ts                    # Formatting utilities
│   ├── getCurrentLocale.ts              # Locale utilities
│   ├── prisma.ts                        # Database client
│   ├── translation.ts                   # Translation utilities
│   └── utils.ts                         # General utilities
│
├── middleware.ts                         # Next.js middleware for i18n
│
├── server/                               # Server-side logic
│   ├── _actions/                        # Server actions
│   │   └── auth.ts                      # Authentication actions
│   ├── auth.ts                          # Authentication configuration
│   └── db/                              # Database access
│       └── products.ts                  # Product database operations
│
├── types/                                # TypeScript type definitions
│   ├── app.ts                          # App-wide types
│   ├── AuthTranslations.ts             # Auth translation types
│   ├── product.ts                       # Product type definitions
│   └── Translations.ts                 # Translation types
│
├── validations/                          # Form validation schemas
│   └── auth.ts                          # Authentication validation
│
└── i18n.config.ts                        # Internationalization configuration
```

## 🎯 Key Pages

- **Home**: Landing page with hero section and featured items
- **Menu**: Interactive menu with categories and detailed items
- **About**: Company information and team details
- **Contact**: Contact form and branch information
- **Cart**: Shopping cart and checkout process
- **Profile**: User profile and order history
- **Auth**: Login and registration pages

## 🔒 Best Practices

- **Clean Code**: Follows ESLint and Prettier standards
- **Modularization**: Code split into small, reusable components
- **Accessibility**: Uses semantic HTML and ARIA-friendly primitives
- **Performance**: Server-side rendering and code splitting
- **Security**: Environment variables and input validation

## 📈 Project Stats

- **Total Lines of Code**: 9,226+ lines
- **Source Files**: 87+ TypeScript/JavaScript files
- **Translation Files**: 16 JSON files (8 pages × 2 languages)
- **Component Coverage**: 100% TypeScript implementation

---

Built with 🍕 for pizza lovers worldwide.

_Last Updated: January 2026_
