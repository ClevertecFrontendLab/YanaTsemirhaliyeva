import { FormControl, FormLabel, Switch } from '@chakra-ui/react';

type ToggleProps = {
    text: string;
    id: string;
    onChange: () => void;
    isChecked: boolean;
    testIdSwitcher: string;
};

export const Toggle = ({ text, id, onChange, isChecked, testIdSwitcher }: ToggleProps) => (
    <FormControl display='flex' alignItems='center' width='inherit'>
        <FormLabel htmlFor={id} mb='0' pl={1}>
            {text}
        </FormLabel>
        <Switch
            data-test-id={testIdSwitcher}
            id={id}
            colorScheme='lime'
            onChange={onChange}
            isChecked={isChecked}
        />
    </FormControl>
);
