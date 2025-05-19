import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { AppRoute } from '~/consts/consts';

import { LoginForm } from '../login-form/LoginForm';
import { RegisterForm } from '../register-form/RegisterForm';

const TABS = ['Вход на сайт', 'Регистрация'];

export const AuthTabs = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [tabIndex, setTabIndex] = useState(location.pathname === AppRoute.Login ? 0 : 1);

    const handleTabChange = (index: number) => {
        setTabIndex(index);
        const path = index === 0 ? AppRoute.Login : AppRoute.Register;
        navigate(path);
    };

    useEffect(() => {
        const newIndex = location.pathname === AppRoute.Login ? 0 : 1;
        if (tabIndex !== newIndex) {
            setTabIndex(newIndex);
        }
    }, [location.pathname, tabIndex]);

    return (
        <Box w='100%'>
            <Box w={{ base: '100%', md: '461px' }}>
                <Tabs index={tabIndex} onChange={handleTabChange}>
                    <TabList
                        borderBottomWidth='2px'
                        borderBottomColor='blackAlpha.200'
                        gap={4}
                        color='lime.800'
                        mb={6}
                    >
                        {TABS.map((tab, i) => (
                            <Tab
                                width='50%'
                                key={i}
                                border='none'
                                px={6}
                                sx={{
                                    fontSize: 18,
                                    pb: '14px',
                                    whiteSpace: 'nowrap',
                                    color: 'lime.800',
                                    position: 'relative',
                                    _selected: {
                                        color: 'lime.700',
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '2px',
                                            backgroundColor: 'lime.700',
                                            transition: 'background-color 0.2s ease-in-out',
                                        },
                                        pointerEvents: 'none',
                                    },
                                    '&:focus': {
                                        outline: 'none',
                                    },
                                    '&:focus-visible': {
                                        outline: 'none',
                                    },
                                    _hover: {
                                        color: 'lime.600',
                                    },
                                    _active: {
                                        backgroundColor: 'transparent',
                                    },
                                }}
                            >
                                {tab}
                            </Tab>
                        ))}
                    </TabList>
                    <TabPanels>
                        <TabPanel px={0}>{tabIndex === 0 && <LoginForm />}</TabPanel>
                        <TabPanel px={0}>{tabIndex === 1 && <RegisterForm />}</TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Box>
    );
};
