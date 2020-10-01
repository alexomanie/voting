import React, { useState } from 'react';
import { Input, Button, Flex } from 'theme-ui';

export const QuestionForm = ({ handleClick }) => {
    const [question, setQuestion] = useState('');
    const submitQuestion = () => {
        handleClick(question);
        setQuestion('');
    };
    const onKeyDownHandler = (event) => {
        if (event.keyCode === 13) {
            submitQuestion();
        }
    };
    return (
        <div>
            <Flex>
                <Input
                    placeholder="Frage eingeben"
                    sx={{ marginRight: 3 }}
                    value={question}
                    onKeyDown={(event) => onKeyDownHandler(event)}
                    onChange={(event) => setQuestion(event.target.value)}
                ></Input>
                <Button
                    onClick={() => {
                        submitQuestion();
                    }}
                >
                    Frage abschicken
                </Button>
            </Flex>
        </div>
    );
};
