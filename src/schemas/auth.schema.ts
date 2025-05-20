import { z } from 'zod';

// Регулярные выражения для валидации
const firstCyrillicLetterRegex = /^[А-Яа-яЁё]/;
const onlyCyrillicAndHyphenRegex = /^[А-Яа-яЁё-]*$/;
const loginRegex = /^[A-Za-z!@#$&_+\-.]*$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z0-9!@#$&_+\-.]*$/;

// Схема для входа
export const loginSchema = z.object({
    login: z
        .string()
        .nonempty('Введите логин')
        .min(5, 'Не соответствует формату')
        .max(50, 'Максимальная длина 50 символов')
        .refine((login) => loginRegex.test(login), {
            message: 'Не соответствует формату',
        }),

    password: z
        .string()
        .nonempty('Введите пароль')
        .min(8, 'Не соответствует формату')
        .max(50, 'Максимальная длина 50 символов')
        .refine((password) => passwordRegex.test(password), {
            message: 'Не соответствует формату',
        }),
});

// Схема для регистрации
export const registerSchema = z
    .object({
        firstName: z
            .string()
            .nonempty('Введите имя')
            .max(50, 'Максимальная длина 50 символов')
            .refine((name) => firstCyrillicLetterRegex.test(name), {
                message: 'Должно начинаться с кириллицы А-Я',
            })
            .refine((name) => onlyCyrillicAndHyphenRegex.test(name), {
                message: 'Только кириллица А-Я, и "-"',
            }),

        lastName: z
            .string()
            .nonempty('Введите фамилию')
            .max(50, 'Максимальная длина 50 символов')
            .refine((name) => firstCyrillicLetterRegex.test(name), {
                message: 'Должно начинаться с кириллицы А-Я',
            })
            .refine((name) => onlyCyrillicAndHyphenRegex.test(name), {
                message: 'Только кириллица А-Я, и "-"',
            }),

        email: z
            .string()
            .nonempty('Введите e-mail')
            .max(50, 'Максимальная длина 50 символов')
            .email('Введите корректный e-mail'),

        login: z
            .string()
            .nonempty('Введите логин')
            .min(5, 'Не соответствует формату')
            .max(50, 'Максимальная длина 50 символов')
            .refine((login) => loginRegex.test(login), {
                message: 'Не соответствует формату',
            }),

        password: z
            .string()
            .nonempty('Введите пароль')
            .min(8, 'Не соответствует формату')
            .max(50, 'Максимальная длина 50 символов')
            .refine((password) => passwordRegex.test(password), {
                message: 'Не соответствует формату',
            }),

        confirmPassword: z.string().nonempty('Повторите пароль'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Пароли должны совпадать',
        path: ['confirmPassword'],
    });

// Схема для валидации email при восстановлении пароля
export const passwordRecoverySchema = z.object({
    email: z
        .string()
        .nonempty('Введите e-mail')
        .max(50, 'Максимальная длина 50 символов')
        .email('Введите корректный e-mail'),
});

export const resetPasswordSchema = z
    .object({
        email: z
            .string()
            .nonempty('Введите e-mail')
            .max(50, 'Максимальная длина 50 символов')
            .email('Введите корректный e-mail'),
        login: loginSchema.shape.login,
        password: loginSchema.shape.password,
        passwordConfirm: z.string().nonempty('Повторите пароль'),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: 'Пароли должны совпадать',
        path: ['passwordConfirm'],
    });

// типы
export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type PasswordRecoveryFormValues = z.infer<typeof passwordRecoverySchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export type AuthTabsType = 'login' | 'register';
