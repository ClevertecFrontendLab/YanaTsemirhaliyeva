import { FormControl, FormLabel, Switch } from '@chakra-ui/react';

type ToggleProps = {
    text: string;
    id: string;
};

export const Toggle = ({ text, id }: ToggleProps) => (
    <FormControl display='flex' alignItems='center' width='inherit'>
        <FormLabel htmlFor={id} mb='0' pl={1}>
            {text}
        </FormLabel>
        <Switch id={id} colorScheme='teal' />
    </FormControl>
);
