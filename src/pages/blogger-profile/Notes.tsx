import {
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Heading,
    SimpleGrid,
    Text,
} from '@chakra-ui/react';
import { useState } from 'react';

import { DataTestId } from '~/consts/consts';
import { Note } from '~/types/blogs';

import { formatDate } from './utils';

const DEFAULT_NOTES_TO_DISPLAY = 3;

export const Notes = ({ notes }: { notes: Note[] }) => {
    const [isNeedToShowAllNotes, setIsNeedToShowAllNotes] = useState(false);

    const hanldeShowMoreClick = () => setIsNeedToShowAllNotes((prev) => !prev);

    return (
        <Box
            data-test-id={DataTestId.BlogNotesBox}
            as='section'
            bgColor='blackAlpha.50'
            p='24px 24px 18px'
            id='notes'
            borderRadius={16}
        >
            <Heading color='black' fontSize={36} fontWeight={400} mb={4}>
                Заметки&nbsp;
                <Text
                    as='span'
                    color='blackAlpha.600'
                    fontSize={30}
                    data-test-id={DataTestId.BloggerUserNotesCount}
                >
                    ({notes.length})
                </Text>
            </Heading>
            {notes.length > 0 && (
                <SimpleGrid
                    columns={{ base: 1, '2xs': 6 }}
                    spacing={4}
                    mb={4}
                    data-test-id={DataTestId.BloggerUserNotesGrid}
                >
                    {notes.map((note, i) => (
                        <Card
                            key={i}
                            display={
                                !isNeedToShowAllNotes && i >= DEFAULT_NOTES_TO_DISPLAY
                                    ? 'none'
                                    : 'flex'
                            }
                            gridColumn={{
                                base: 'span 1',
                                '2xs': i < Math.floor(notes.length / 3) * 3 ? 'span 2' : 'span 3',
                            }}
                        >
                            <CardHeader
                                fontSize={14}
                                color='lime.600'
                                pb={4}
                                data-test-id={DataTestId.NotesCardDate}
                            >
                                {formatDate(note.date)}
                            </CardHeader>
                            <CardBody
                                fontSize={14}
                                color='black'
                                pt={0}
                                data-test-id={DataTestId.NotesCardText}
                            >
                                {note.text}
                            </CardBody>
                        </Card>
                    ))}
                </SimpleGrid>
            )}
            {notes.length > 3 && (
                <Button
                    data-test-id={DataTestId.BloggerUserNotesBtn}
                    variant='ghost'
                    colorScheme='black'
                    color='black'
                    fontSize={14}
                    display='flex'
                    margin='0 auto'
                    onClick={hanldeShowMoreClick}
                >
                    {isNeedToShowAllNotes ? 'Свернуть' : 'Показать больше'}
                </Button>
            )}
        </Box>
    );
};
