/** @jsx jsx */
import React from 'react';
import { Text, jsx, IconButton, Button, Flex, Box } from 'theme-ui';
import { Flipped } from 'react-flip-toolkit';
import './styles.css';
import { useEffect } from 'react';

export const Question = React.memo(
    ({ question, handleVote, handleComplete, handleDelete, ...rest }) => {
        return (
            <Flipped flipId={question._id}>
                <div
                    sx={{
                        variant:
                            question.complete === false
                                ? 'cards.question'
                                : 'cards.complete',
                    }}
                    {...rest}
                >
                    <Flex
                        sx={{
                            flexDirection: 'row',
                            alginItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Text sx={{ width: '100%' }}>{question.text}</Text>
                        {question.complete === false && (
                            <Flex
                                sx={{
                                    width: '128px',
                                    height: '48px',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alginItems: 'center',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <Text
                                    sx={{
                                        alignSelf: 'center',
                                        fontSize: '2',
                                    }}
                                >
                                    {question.votes}
                                </Text>
                                <IconButton
                                    className="voteButton"
                                    disabled={
                                        JSON.parse(
                                            localStorage.votedQuestionIds,
                                        ).findIndex(
                                            (id) => id === question._id,
                                        ) !== -1
                                    }
                                    sx={{
                                        height: '45px',
                                        width: '50px',
                                        cursor: 'pointer',
                                        '&:focus': {
                                            outline: 'none',
                                        },
                                    }}
                                    onClick={() => handleVote(question._id)}
                                >
                                    <div className="heart"></div>
                                </IconButton>
                            </Flex>
                        )}
                    </Flex>
                    {question.complete === false && (
                        <Flex sx={{ justifyContent: 'flex-end' }}>
                            <Button
                                onClick={() => handleComplete(question._id)}
                            >
                                Beantwortet
                            </Button>
                        </Flex>
                    )}
                    {question.complete === true && (
                        <Flex sx={{ justifyContent: 'flex-end' }}>
                            <Button onClick={() => handleDelete(question._id)}>
                                Löschen
                            </Button>
                        </Flex>
                    )}
                </div>
            </Flipped>
        );
    },
);
