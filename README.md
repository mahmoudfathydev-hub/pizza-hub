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
- **Visual Appeal**: High-quality imagery, smooth animations (AOS), and modern UI

### For Administrators

- **Admin Dashboard**: Complete management interface for restaurant operations
- **Category Management**: Create, edit, and delete product categories
- **Menu Item Management**: Full CRUD operations for products with image uploads
- **User Management**: Manage customer accounts and orders
- **Cloudinary Integration**: Advanced image upload and optimization

### Technical Highlights

- **Component-Based Architecture**: Modular UI using React and modern standards
- **SEO Optimized**: Built with Next.js for optimal search engine visibility
- **Type Safety**: Full TypeScript implementation for robust code quality
- **Modern Styling**: Tailwind CSS v4 for rapid, maintainable design
- **State Management**: Redux Toolkit for efficient state handling
- **API Integration**: RESTful API endpoints for authentication and file uploads

## 🛠️ Technology Stack

### Frontend

- **Next.js 16.1.4**: React framework with App Router for server-side rendering
- **React 19.2.3**: Latest UI library with modern hooks
- **TypeScript**: Statically typed JavaScript for scalable development
- **Tailwind CSS v4**: Utility-first CSS framework for custom designs
- **next-intl**: Internationalization framework for multi-language support
- **Redux Toolkit**: State management for cart and application state
- **React Hot Toast**: Toast notification system
- **Lucide React**: Beautiful, consistent icons
- **AOS (Animate On Scroll)**: Library for scroll animations
- **Radix UI**: Unstyled, accessible UI primitives (Dialog, Checkbox, Select, etc.)
- **Cloudinary**: Cloud-based image management and optimization

### Backend & Database

- **PostgreSQL**: Relational database for structured data storage
- **Prisma ORM**: Next-generation Node.js and TypeScript ORM
- **Prisma Client**: Auto-generated type-safe query builder
- **NextAuth.js**: Complete authentication solution with providers
- **bcrypt**: Password hashing for security
- **Zod**: Schema validation for type-safe forms

### Development Tools

- **ESLint**: Pluggable linting utility for JavaScript and JSX
- **PostCSS**: Tool for transforming CSS with JavaScript
- **TypeScript**: Static type checking and enhanced developer experience

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
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
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

This project supports comprehensive multi-language functionality:

- **English (en)**: Default language with professional translations
- **Arabic (ar)**: Full RTL support with contextually appropriate translations
- **Dynamic Routing**: Locale-based URLs (/en/..., /ar/...)
- **Page-Specific Translations**: Dedicated translation files for each page
- **Semantic Keys**: UI-based translation structure for maintainability
- **Translation Coverage**: 26 JSON files (13 pages × 2 languages)

### Supported Pages

- Home, About, Menu, Contact, Cart, Profile, Admin
- Authentication (Login/Register)
- Admin sections (Categories, Menu Items, Users, Orders)
- Shared components (Navbar, Footer)

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
│   │   ├── admin/                        # Admin dashboard
│   │   │   ├── _components/
│   │   │   │   └── AdminTabs.tsx         # Admin navigation tabs
│   │   │   ├── categories/               # Category management
│   │   │   │   ├── _actions/
│   │   │   │   │   └── category.ts       # Category server actions
│   │   │   │   ├── _components/
│   │   │   │   │   ├── CategoryItem.tsx   # Category item component
│   │   │   │   │   ├── DeleteCategory.tsx # Delete category modal
│   │   │   │   │   ├── EditCategory.tsx   # Edit category form
│   │   │   │   │   └── Form.tsx           # Category form
│   │   │   │   └── page.tsx              # Categories management page
│   │   │   ├── menu-items/               # Product management
│   │   │   │   ├── [productId]/          # Dynamic product routes
│   │   │   │   │   └── edit/
│   │   │   │   │       └── page.tsx      # Edit product page
│   │   │   │   ├── _actions/
│   │   │   │   │   └── product.ts        # Product server actions
│   │   │   │   ├── _components/
│   │   │   │   │   ├── Form.tsx           # Product form
│   │   │   │   │   ├── ItemOptions.tsx    # Product options
│   │   │   │   │   ├── MenuItems.tsx      # Menu items list
│   │   │   │   │   └── SelectCategory.tsx # Category selector
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx          # Create new product
│   │   │   │   └── page.tsx              # Products management page
│   │   │   ├── layout.tsx                # Admin layout
│   │   │   └── page.tsx                  # Admin dashboard
│   │   ├── auth/                         # Authentication pages
│   │   │   ├── signin/
│   │   │   │   ├── _components/
│   │   │   │   │   └── Form.tsx           # Login form
│   │   │   │   └── page.tsx              # Login page
│   │   │   └── signup/
│   │   │       ├── _components/
│   │   │       │   └── Form.tsx           # Registration form
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
│   ├── examples/                         # Example components
│   ├── footer/                           # Footer components
│   │   └── Footer.tsx                   # Main footer component
│   ├── form-fields/                      # Form field components
│   │   ├── checkbox.tsx                 # Checkbox component
│   │   └── form-fields.tsx              # Form field wrapper
│   ├── header/                           # Header components
│   │   ├── CartButton.tsx               # Shopping cart button
│   │   ├── index.tsx                    # Header wrapper
│   │   └── Navbar.tsx                   # Navigation bar
│   ├── link/                             # Custom link component
│   │   └── index.tsx
│   ├── main-heading/                     # Heading component
│   │   └── index.tsx
│   ├── menu/                             # Menu-related components
│   │   ├── AddToCartButton.tsx          # Add to cart functionality
│   │   ├── index.tsx                    # Menu wrapper
│   │   └── MenuItem.tsx                 # Individual menu item
│   └── ui/                               # UI primitives
│       ├── button.tsx                   # Button component
│       ├── checkbox.tsx                 # Checkbox component
│       ├── dialog.tsx                   # Dialog component
│       ├── input.tsx                    # Input component
│       ├── label.tsx                    # Label component
│       ├── Loader.tsx                   # Loading spinner
│       ├── radio-group.tsx              # Radio group component
│       ├── sonner.tsx                   # Toast notifications
│       ├── textarea.tsx                 # Textarea component
│       └── index.ts                     # UI exports
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
│   ├── admin/menu-items/                # Menu items translations
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
│   ├── home/                            # Home page translations
│   │   ├── en.json
│   │   └── ar.json
│   ├── menu/                            # Menu page translations
│   │   ├── en.json
│   │   └── ar.json
│   ├── menuItems/                       # Menu items translations (legacy)
│   │   ├── en.json
│   │   └── ar.json
│   ├── navbar/                          # Navbar translations
│   │   ├── en.json
│   │   └── ar.json
│   ├── profile/                         # Profile page translations
│   │   ├── en.json
│   │   └── ar.json
│   ├── en.json                          # Legacy English translations
│   └── ar.json                          # Legacy Arabic translations
│
├── hooks/                                # Custom React hooks
│   ├── useFormFields.ts                # Form field management
│   ├── useAuthFormFields.ts             # Auth form fields
│   ├── use-translations.ts             # Translation hook
│   ├── use-toast.ts                    # Toast notifications
│   ├── useClientSession.ts             # Client session management
│   ├── useCurrentLocale.ts             # Current locale hook
│   └── useCart.ts                      # Cart management hook
│
├── lib/                                  # Utilities and libraries
│   ├── cart.ts                          # Cart utilities
│   ├── cache.ts                         # Cache utilities
│   ├── cloudinary.ts                    # Cloudinary integration
│   ├── formatters.ts                    # Formatting utilities
│   ├── getCurrentLocale.ts              # Locale utilities
│   ├── prisma.ts                        # Database client
│   ├── translation.ts                   # Translation utilities
│   └── utils.ts                         # General utilities
│
├── middleware.ts                         # Next.js middleware for i18n
│
├── provider/                             # React providers
│   └── SessionProvider.tsx              # Authentication provider
│
├── redux/                                # Redux state management
│   ├── features/                        # Redux features
│   │   └── cart/                        # Cart feature
│   │       └── cartSlice.ts             # Cart state management
│   ├── hooks.ts                         # Redux hooks
│   └── store.ts                         # Redux store
│
├── server/                               # Server-side logic
│   ├── _actions/                        # Server actions
│   │   ├── auth.ts                      # Authentication actions
│   │   └── user.ts                      # User actions
│   ├── auth.ts                          # Authentication configuration
│   └── db/                              # Database access
│       ├── categories.ts                # Category database operations
│       └── products.ts                  # Product database operations
│
├── types/                                # TypeScript type definitions
│   ├── app.ts                          # App-wide types
│   ├── AuthTranslations.ts             # Auth translation types
│   ├── ProfileTranslations.ts           # Profile translation types
│   ├── User.ts                          # User type definitions
│   ├── index.ts                        # Type exports
│   ├── next-auth.d.ts                  # NextAuth types
│   ├── product.ts                       # Product type definitions
│   └── Translations.ts                 # Translation types
│
├── validations/                          # Form validation schemas
│   ├── auth.ts                          # Authentication validation
│   ├── category.ts                      # Category validation
│   ├── product.ts                       # Product validation
│   └── profile.ts                       # Profile validation
│
└── i18n.config.ts                        # Internationalization configuration
```

## 🎯 Key Pages

### Customer Pages

- **Home**: Landing page with hero section, best sellers, deals, and testimonials
- **Menu**: Interactive menu with categories and detailed items
- **About**: Company information, story, values, and team details
- **Contact**: Contact form, branch information, and newsletter signup
- **Cart**: Shopping cart with item management and checkout process
- **Profile**: User profile management and order history
- **Auth**: Secure login and registration pages

### Admin Pages

- **Dashboard**: Overview of restaurant operations
- **Categories**: Manage product categories (Create, Read, Update, Delete)
- **Menu Items**: Full product management with image uploads
- **Users**: Customer account management
- **Orders**: Order tracking and management

## 🔒 Best Practices

- **Clean Code**: Follows ESLint and Prettier standards
- **Modularization**: Code split into small, reusable components
- **Accessibility**: Uses semantic HTML and ARIA-friendly primitives
- **Performance**: Server-side rendering and code splitting
- **Security**: Environment variables and input validation

## 📈 Project Stats

- **Total Lines of Code**: 12,000+ lines (TypeScript/JavaScript)
- **Source Files**: 96+ TypeScript/JavaScript files (49 TS + 47 TSX)
- **Translation Files**: 26 JSON files (13 pages × 2 languages)
- **Component Coverage**: 100% TypeScript implementation
- **Project Size**: ~2.3 GB (including node_modules)
- **Admin Features**: Complete CRUD operations for categories and products
- **API Endpoints**: Authentication and file upload routes
- **State Management**: Redux Toolkit integration
- **Image Management**: Cloudinary integration

## 🚀 Deployment

### Environment Variables Required

```env
DATABASE_URL="postgresql://user:password@localhost:5432/pizzahub"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### Production Build

```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with 🍕 for pizza lovers worldwide.

_Last Updated: January 31, 2026 - Enhanced with Admin Dashboard, Cloudinary Integration, and Advanced Translation System_
