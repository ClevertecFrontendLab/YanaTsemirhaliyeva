export const API_URL = 'https://marathon-api.clevertec.ru/';
export const API_IMG = 'https://training-api.clevertec.ru';

export enum AppRoute {
    Index = '/',
    Juicy = '/the-juiciest',
    NewRecipe = '/new-recipe',
    NotFound = '/not-found',
    Login = '/login',
    Register = '/register',
    ForgotPassword = 'forgot-password',
    VerifyOTP = '/verify-otp',
    ResetPassword = '/reset-password',
    Verification = '/verification',
}

export const DynamicRoutes = {
    CategoryRoot: '/:category',
    SubcategoryPage: '/:category/:subcategory',
    RecipePage: '/:category/:subcategory/:id',
    EditRecipePage: '/edit-recipe/:category/:subcategory/:id',
};

export const TOKEN_NAME = 'yeedaaToken';

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
    RecipeImageBlock = 'recipe-image-block',
    RecipeImageBlockInputFile = 'recipe-image-block-input-file',
    RecipeCategories = 'recipe-categories',
    RecipeTitle = 'recipe-title',
    RecipeDescription = 'recipe-description',
    RecipePortions = 'recipe-portions',
    RecipeTime = 'recipe-time',
    RecipeIngredientTitle = 'recipe-ingredients-title-',
    RecipeIngredientCount = 'recipe-ingredients-count-',
    RecipeIngredientMeasureUnit = 'recipe-ingredients-measureUnit-',
    RecipeStepsImage = 'recipe-steps-image-block-',
    RecipeStepDescription = 'recipe-steps-description-',
    RecipeStepRemoveBtn = 'recipe-steps-remove-button-',
    RecipeSaveDraftBtn = 'recipe-save-draft-button',
    RecipePublishRecipeBtn = 'recipe-publish-recipe-button',
    RecipeIngredientRemove = 'recipe-ingredients-remove-ingredients-',
    RecipeIngredientAdd = 'recipe-ingredients-add-ingredients',
    RecipeImageBlockPreview = 'recipe-image-block-preview-image',
    RecipeImageModal = 'recipe-image-modal',
    RecipeImageModalBlock = 'recipe-image-modal-image-block',
    RecipePreviewImageModal = 'recipe-image-modal-preview-image',
    RecipePreventiveModal = 'recipe-preventive-modal',
    RecipeDeleteBtn = 'recipe-delete-button',
    HeaderLogo = 'header-logo',
    AddRecipeBtn = 'add-recipe-button',
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
        isError: true,
        title: 'Ошибка сервера',
        desc: 'Попробуйте поискать снова попозже',
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
    RECIPE_SAVE_DRAFT_SUCCESS: {
        status: 'success' as const,
        isError: true,
        title: 'Черновик успешно сохранен',
    },
    RECIPE_DELETE_SUCCESS: {
        status: 'success' as const,
        isError: true,
        title: 'Рецепт успешно удален',
    },
    RECIPE_DELETE_ERROR: {
        status: 'error' as const,
        isError: true,
        title: 'Ошибка сервера',
        desc: 'Не удалось удалить рецепт',
    },
    RECIPE_POST_SUCCESS: {
        status: 'success' as const,
        isError: true,
        title: 'Рецепт успешно опубликован',
    },
    RECIPE_POST_ERROR: {
        status: 'error' as const,
        isError: true,
        title: 'Ошибка сервера',
        desc: 'Попробуйте пока сохранить в черновик',
    },
    RECIPE_SAVE_DRAFT_ERROR: {
        status: 'error' as const,
        isError: true,
        title: 'Ошибка сервера',
        desc: 'Не удалось сохранить черновик рецепта',
    },
    RECIPE_TITLE_CONFLICT: {
        status: 'error' as const,
        isError: true,
        title: 'Ошибка',
        desc: 'Рецепт с таким названием уже существует',
    },
    RECIPE_UPLOAD_IMG_ERROR: {
        status: 'error' as const,
        isError: true,
        title: 'Ошибка',
        desc: 'Рецепт с таким названием уже существует',
    },
};

export const InputType = {
    Text: 'text',
    Password: 'password',
};

export const InputAriaLabel = {
    Show: 'Показать пароль',
    Hide: 'Скрыть пароль',
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
