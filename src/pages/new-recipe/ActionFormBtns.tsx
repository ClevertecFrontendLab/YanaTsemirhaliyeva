import { Button, Stack } from '@chakra-ui/react';

import { DataTestId } from '~/consts/consts';
import { WriteDraftIcon } from '~/shared/custom-icons';

import { FORM_NEW_RECIPE_STYLES } from './styles';

type ActionFormBtnsProps = {
    onSaveDraftClick: () => void;
    onPublishBtnClick: () => void;
    isDataSaveDraftLoading: boolean;
};

export const ActionFormBtns = ({
    onSaveDraftClick,
    onPublishBtnClick,
    isDataSaveDraftLoading,
}: ActionFormBtnsProps) => (
    <Stack direction='row' gap={5} flexWrap='wrap' m='0 auto' w='100%' justifyContent='center'>
        <Button
            data-test-id={DataTestId.RecipeSaveDraftBtn}
            leftIcon={<WriteDraftIcon boxSize={4} />}
            onClick={onSaveDraftClick}
            isLoading={isDataSaveDraftLoading}
            {...FORM_NEW_RECIPE_STYLES.saveDraftBtn}
        >
            Сохранить черновик
        </Button>
        <Button
            data-test-id={DataTestId.RecipePublishRecipeBtn}
            onClick={onPublishBtnClick}
            {...FORM_NEW_RECIPE_STYLES.submitBtn}
        >
            Опубликовать рецепт
        </Button>
    </Stack>
);
