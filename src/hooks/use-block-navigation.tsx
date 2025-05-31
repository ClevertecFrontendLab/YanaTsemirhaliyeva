import { RefObject, useEffect } from 'react';
import { useBlocker } from 'react-router';

type useBlockNavigationProps = {
    isFormDirty: boolean;
    setPendingNavigation: (url: string | null) => void;
    setModalOpen: (open: boolean) => void;
    savedSuccessfullyRef: RefObject<boolean>;
    isSavedSuccessfully: boolean;
};
export const useBlockNavigation = ({
    isFormDirty,
    setPendingNavigation,
    setModalOpen,
    savedSuccessfullyRef,
    isSavedSuccessfully,
}: useBlockNavigationProps) => {
    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (isFormDirty && !savedSuccessfullyRef.current) {
                event.preventDefault();
                event.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isFormDirty, savedSuccessfullyRef]);

    useBlocker(({ currentLocation, nextLocation }) => {
        if (savedSuccessfullyRef.current || isSavedSuccessfully) {
            return false;
        }

        if (isFormDirty && currentLocation.pathname !== nextLocation.pathname) {
            setPendingNavigation(nextLocation.pathname);
            setModalOpen(true);
            return true;
        }
        return false;
    });
};
