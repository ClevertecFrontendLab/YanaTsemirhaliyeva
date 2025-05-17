export const API_URL = 'https://marathon-api.clevertec.ru/';
export const API_IMG = 'https://training-api.clevertec.ru';

export enum AppRoute {
    Index = '/',
    Juicy = '/the-juiciest',
    NotFound = '/not-found',
    Login = '/login',
    Register = '/register',
    ForgotPassword = 'forgot-password',
    VerifyOTP = '/verify-otp',
    ResetPassword = '/reset-password',
    Verification = '/verification',
}

// Шаблоны динамических маршрутов
export const DynamicRoutes = {
    CategoryRoot: '/:category',
    SubcategoryPage: '/:category/:subcategory',
    RecipePage: '/:category/:subcategory/:id',
};

export const DEFAULT_CARDS_PER_PAGE = 8;
export const DEFAULT_PAGE = 1;

export enum DataTestId {
    VeganCuisine = 'vegan-cuisine',
    InputAddOtherAllergen = 'add-other-allergen',
    BtnAddOtherAllergen = 'add-allergen-button',
    Allergen = 'allergen-',
    Breadcrumbs = 'breadcrumbs',
    Nav = 'nav',
    FilterBtn = 'filter-button',
    FilterDrawer = 'filter-drawer',
    FilterCloseBtn = 'close-filter-drawer',
    CheckboxPotato = 'checkbox-картошка',
    FilterTag = 'filter-tag',
    FilterClearBtn = 'clear-filter-button',
    FilterFindRecipe = 'find-recipe-button',
    Header = 'header',
    Hamburger = 'hamburger-icon',
    HamburgerCloseBtn = 'close-icon',
    FoodCard = 'food-card-',
    CardLink = 'card-link-',
    IncrementStepper = 'increment-stepper',
    DecrementStepper = 'decrement-stepper',
    IngredientQuantity = 'ingredient-quantity-',
    JuicyLink = 'juiciest-link',
    JuicyLinkMobile = 'juiciest-link-mobile',
    Footer = 'footer',
    VeganCheckbox = 'checkbox-веганская кухня',
    Carousel = 'carousel',
    CarouselCard = 'carousel-card-',
    CarouselCardBtnBack = 'carousel-back',
    CarouselCardBtnForward = 'carousel-forward',
    SearchInput = 'search-input',
    SearchBtn = 'search-button',
    AllergensSwitcher = 'allergens-switcher',
    AllergensMenuBtn = 'allergens-menu-button',
    AllergensMenu = 'allergens-menu',
    AllergensSwitcherFilter = 'allergens-switcher-filter',
    AllergensMenuBtnFilter = 'allergens-menu-button-filter',
    ErrorNotification = 'error-notification',
    CloseAlertBtn = 'close-alert-button',
    LoaderSearchBlock = 'loader-search-block',
    AppLoader = 'app-loader',
    LinkErrorPage = 'error-page-go-home',
    BtnLoadMore = 'load-more-button',
    SignInForm = 'sign-in-form',
    LoginInput = 'login-input',
    PasswordInput = 'password-input',
    PasswordVisibilityBtn = 'password-visibility-button',
    SubmitBtn = 'submit-button',
    ForgotPasswordLink = 'forgot-password',
    SignInErrorModal = 'sign-in-error-modal',
    CloseBtn = 'close-button',
    RepeatBtn = 'repeat-button',
    SignUpProgress = 'sign-up-progress',
    SignUpForm = 'sign-up-form',
    FirstNameInput = 'first-name-input',
    LastNameInput = 'last-name-input',
    EmailInput = 'email-input',
    ConfirmPasswordInput = 'confirm-password-input',
    SignUpSeccessModal = 'sign-up-success-modal',
    EmailVerificationFailedModal = 'email-verification-failed-modal',
    VerificationCodeModal = 'verification-code-modal',
    VerificationCodeInput = 'verification-code-input-',
    ResetCredentialsModal = 'reset-credentials-modal',
    SendEmailModal = 'send-email-modal',
}

export const ALERT_MESSAGES = {
    SERVER_ERROR: {
        status: 'error' as const,
        isError: true,
        title: 'Ошибка сервера',
        desc: 'Попробуйте немного позже.',
    },
    VERIFICATION_SUCCESS: {
        status: 'success' as const,
        isError: true,
        title: 'Верификация прошла успешно',
    },
    RECOVERY_SUCCESS: {
        status: 'success' as const,
        isError: true,
        title: 'Восстановление данных успешно',
    },
    SERVER_ERROR_LAYOUT: {
        status: 'error' as const,
        title: 'Ошибка сервера',
        desc: 'Попробуйте поискать снова попозже',
        hasFooter: true,
    },
    EMAIL_NOT_VERIFIED: {
        status: 'error' as const,
        isError: true,
        title: 'E-mail не верифицирован',
        desc: 'Проверьте почту и перейдите по ссылке',
    },
    INVALID_DATA: {
        status: 'error' as const,
        isError: true,
        title: 'Неверный логин или пароль.',
        desc: 'Попробуйте снова',
    },
    EMAIL_NOT_FOUND: {
        status: 'error' as const,
        isError: true,
        title: 'Такого e-mail нет!',
        desc: 'Попробуйте другой e-mail или проверьте правильность его написания',
    },
};

export const meatTypes = ['Курица', 'Свинина', 'Говядина', 'Индейка', 'Утка'];

export const garnishTypes = [
    'Картошка',
    'Гречка',
    'Паста',
    'Спагетти',
    'Рис',
    'Капуста',
    'Фасоль',
    'Другие овощи',
];

export const authors = [
    'Segun Adebayo',
    'Елена Мин',
    'Mark Chandler',
    'Мирием Чонишвили',
    'Елена Прекрасная',
    'Alex Cook',
    'Екатерина Константинопольская',
    'Инна Высоцкая',
    'Сергей Разумов',
    'Анна Рогачева',
    'Иван Орлов',
    'Повар Ши',
];
