import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import { InputAriaLabel, InputType } from '~/consts/consts';

export const PASSWORD_ICON_PROPS = (showPassword: boolean) => ({
    'aria-label': showPassword ? InputAriaLabel.Hide : InputAriaLabel.Show,
    icon: showPassword ? <ViewIcon /> : <ViewOffIcon />,
});

export const PASSWORD_INPUT_TYPE = (isVisible: boolean) =>
    isVisible ? InputType.Text : InputType.Password;
