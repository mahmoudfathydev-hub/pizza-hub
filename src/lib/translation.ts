import { Locale } from "@/src/i18n.config";
import { Languages } from "@/src/constants/enums";

type PageType =
  | "home"
  | "about"
  | "cart"
  | "contact"
  | "menu"
  | "navbar"
  | "footer"
  | "auth"
  | "profile"
  | "admin"
  | "categories";

interface HomeTranslations {
  hero: {
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    imageAlt: string;
  };
  bestSellers: {
    heading: {
      title: string;
      subtitle: string;
    };
    noProductsFound: string;
  };
  deals: {
    heading: {
      title: string;
    };
    weeklySpecial: {
      badge: string;
      title: string;
      description: string;
      cta: string;
    };
    limitedTime: {
      badge: string;
      title: string;
      description: string;
      cta: string;
    };
  };
  testimonials: {
    heading: {
      title: string;
      subtitle: string;
    };
    ratingSummary: string;
    items: Array<{
      name: string;
      role: string;
      quote: string;
    }>;
  };
}

interface AboutTranslations {
  hero: {
    badge: string;
    title: string;
    description: string[];
    stats: {
      count: string;
      label: string;
    };
    imageAlt: string;
  };
  values: {
    heading: {
      title: string;
      subtitle: string;
    };
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  team: {
    heading: {
      title: string;
      subtitle: string;
    };
    members: Array<{
      name: string;
      role: string;
      bio: string;
      imageAlt: string;
    }>;
  };
}

interface CartTranslations {
  title: string;
  empty: {
    message: string;
  };
  items: {
    size: string;
    extras: string;
    quantity: string;
  };
  summary: {
    subtotal: string;
    delivery: string;
    total: string;
  };
  checkout: {
    title: string;
    form: {
      phone: {
        label: string;
        placeholder: string;
      };
      address: {
        label: string;
        placeholder: string;
      };
      postalCode: {
        label: string;
        placeholder: string;
      };
      city: {
        label: string;
        placeholder: string;
      };
      country: {
        label: string;
        placeholder: string;
      };
      submit: string;
    };
  };
}

interface ContactTranslations {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    responseTime: {
      title: string;
      description: string;
    };
    form: {
      name: {
        label: string;
        placeholder: string;
      };
      email: {
        label: string;
        placeholder: string;
      };
      subject: {
        label: string;
        placeholder: string;
      };
      message: {
        label: string;
        placeholder: string;
      };
      submit: string;
    };
  };
  info: {
    call: {
      title: string;
      description: string;
      phone: string;
    };
    visit: {
      title: string;
      description: string;
      address: string;
    };
    email: {
      title: string;
      description: string;
      email: string;
    };
  };
  branches: {
    title: string;
    subtitle: string;
    description: string;
    open: string;
    hours: string;
    locations: Array<{
      name: string;
      address: string;
      hours: string;
    }>;
  };
  newsletter: {
    title: string;
    description: string;
    placeholder: string;
    submit: string;
  };
}

interface MenuTranslations {
  title: string;
}

interface NavbarTranslations {
  header: {
    logo: string;
  };
  navbar: {
    menu: string;
    about: string;
    contact: string;
    login: string;
    register: string;
    profile: string;
    logout: string;
  };
  profile: {
    title: string;
  };
}

interface FooterTranslations {
  newsletter: {
    title: string;
    description: string;
    emailPlaceholder: string;
    subscribe: string;
  };
  brand: {
    name: string;
    description: string;
  };
  links: {
    title: string;
    menu: string;
    offers: string;
    about: string;
    gifts: string;
  };
  contact: {
    title: string;
    address: string;
    phone: string;
    email: string;
  };
  hours: {
    title: string;
    monThu: string;
    friSat: string;
    sunday: string;
    monThuTime: string;
    friSatTime: string;
    sundayTime: string;
  };
  copyright: string;
  madeBy: string;
}

export interface ProfileTranslations {
  title: string;
  save: string;
  form: {
    name: {
      label: string;
      placeholder: string;
      validation?: {
        required: string;
      };
    };
    email: {
      label: string;
      placeholder: string;
      validation?: {
        required: string;
      };
    };
    phone: {
      label: string;
      placeholder: string;
      validation?: {
        required: string;
        invalid?: string;
      };
    };
    address: {
      label: string;
      placeholder: string;
      validation?: {
        required: string;
      };
    };
    postalCode: {
      label: string;
      placeholder: string;
      validation?: {
        required: string;
        invalid?: string;
      };
    };
    city: {
      label: string;
      placeholder: string;
      validation?: {
        required: string;
      };
    };
    country: {
      label: string;
      placeholder: string;
      validation?: {
        required: string;
      };
    };
  };
}

export interface AdminTranslations {
  tabs: {
    profile: string;
    categories: string;
    menuItems: string;
    users: string;
    orders: string;
  };
}

export interface CategoriesTranslations {
  form: {
    editName: string;
    name: {
      label: string;
      placeholder: string;
      validation: {
        required: string;
      };
    };
  };
  category: string;
  save: string;
  edit: string;
  delete: string;
  cancel: string;
  create: string;
  noCategoriesFound: string;
  messages: {
    categoryAdded: string;
    updatecategorySucess: string;
    deleteCategorySucess: string;
  };
  categoryName: {
    [key: string]: string;
  };
}

export interface AuthTranslations {
  login: {
    title: string;
    name: {
      label: string;
      placeholder: string;
    };
    email: {
      label: string;
      placeholder: string;
    };
    password: {
      label: string;
      placeholder: string;
    };
    submit: string;
    authPrompt: {
      message: string;
      signUpLinkText: string;
    };
  };
  register: {
    title: string;
    name: {
      label: string;
      placeholder: string;
    };
    email: {
      label: string;
      placeholder: string;
    };
    password: {
      label: string;
      placeholder: string;
    };
    confirmPassword: {
      label: string;
      placeholder: string;
    };
    submit: string;
    authPrompt: {
      message: string;
      loginLinkText: string;
    };
  };
  validation: {
    nameRequired: string;
    validEmail: string;
    passwordMinLength: string;
    passwordMaxLength: string;
    confirmPasswordRequired: string;
    passwordMismatch: string;
  };
  messages: {
    userNotFound: string;
    incorrectPassword: string;
    loginSuccessful: string;
    unexpectedError: string;
    userAlreadyExists: string;
    accountCreated: string;
  };
}

type TranslationMap = {
  home: HomeTranslations;
  about: AboutTranslations;
  cart: CartTranslations;
  contact: ContactTranslations;
  menu: MenuTranslations;
  navbar: NavbarTranslations;
  footer: FooterTranslations;
  auth: AuthTranslations;
  profile: ProfileTranslations;
  admin: AdminTranslations;
  categories: CategoriesTranslations;
};

const dictionaries = {
  ar: {
    home: () =>
      import("@/src/dictionaries/home/ar.json").then(
        (module) => module.default as HomeTranslations,
      ),
    about: () =>
      import("@/src/dictionaries/about/ar.json").then(
        (module) => module.default as AboutTranslations,
      ),
    cart: () =>
      import("@/src/dictionaries/cart/ar.json").then(
        (module) => module.default as CartTranslations,
      ),
    contact: () =>
      import("@/src/dictionaries/contact/ar.json").then(
        (module) => module.default as ContactTranslations,
      ),
    menu: () =>
      import("@/src/dictionaries/menu/ar.json").then(
        (module) => module.default as MenuTranslations,
      ),
    navbar: () =>
      import("@/src/dictionaries/navbar/ar.json").then(
        (module) => module.default as NavbarTranslations,
      ),
    footer: () =>
      import("@/src/dictionaries/footer/ar.json").then(
        (module) => module.default as FooterTranslations,
      ),
    auth: () =>
      import("@/src/dictionaries/auth/ar.json").then(
        (module) => module.default as AuthTranslations,
      ),
    profile: () =>
      import("@/src/dictionaries/profile/ar.json").then(
        (module) => module.default as ProfileTranslations,
      ),
    admin: () =>
      import("@/src/dictionaries/admin/ar.json").then(
        (module) => module.default as AdminTranslations,
      ),
    categories: () =>
      import("@/src/dictionaries/categories/ar.json").then(
        (module) => module.default as CategoriesTranslations,
      ),
  },
  en: {
    home: () =>
      import("@/src/dictionaries/home/en.json").then(
        (module) => module.default as HomeTranslations,
      ),
    about: () =>
      import("@/src/dictionaries/about/en.json").then(
        (module) => module.default as AboutTranslations,
      ),
    cart: () =>
      import("@/src/dictionaries/cart/en.json").then(
        (module) => module.default as CartTranslations,
      ),
    contact: () =>
      import("@/src/dictionaries/contact/en.json").then(
        (module) => module.default as ContactTranslations,
      ),
    menu: () =>
      import("@/src/dictionaries/menu/en.json").then(
        (module) => module.default as MenuTranslations,
      ),
    navbar: () =>
      import("@/src/dictionaries/navbar/en.json").then(
        (module) => module.default as NavbarTranslations,
      ),
    footer: () =>
      import("@/src/dictionaries/footer/en.json").then(
        (module) => module.default as FooterTranslations,
      ),
    auth: () =>
      import("@/src/dictionaries/auth/en.json").then(
        (module) => module.default as AuthTranslations,
      ),
    profile: () =>
      import("@/src/dictionaries/profile/en.json").then(
        (module) => module.default as ProfileTranslations,
      ),
    admin: () =>
      import("@/src/dictionaries/admin/en.json").then(
        (module) => module.default as AdminTranslations,
      ),
    categories: () =>
      import("@/src/dictionaries/categories/en.json").then(
        (module) => module.default as CategoriesTranslations,
      ),
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getTrans = async <T extends PageType>(
  locale: Locale,
  page: T,
): Promise<TranslationMap[T]> => {
  const lang = locale === Languages.ARABIC ? "ar" : "en";

  if (dictionaries[lang][page]) {
    return dictionaries[lang][page]() as Promise<TranslationMap[T]>;
  }

  throw new Error(`Translation not found for page: ${page} in locale: ${lang}`);
};

export default getTrans;
