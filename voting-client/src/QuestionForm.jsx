import React, { useState } from 'react';

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
        <div className="display: flex flex-row mb-8 ">
            <textarea
                value={question}
                placeholder="Frage eingeben"
                onKeyDown={(event) => onKeyDownHandler(event)}
                onChange={(event) => setQuestion(event.target.value)}
                className="w-full bg-white rounded border border-gray-300 focus:border-green-500 h-16 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            ></textarea>
            <div
                onClick={() => {
                    submitQuestion();
                }}
                className="display: flex flex-row items-center bg-white ml-4 shadow-md rounded-lg self-center border-2 border-gray-600 cursor-pointer hover:border-green-500 px-2 hover:text-white text-gray-700 hover:bg-green-500"
            >
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    className="stroke-current fill-current "
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M9.66887 25.2346L5.64348 28.6185C5.49771 28.741 5.31998 28.8194 5.1312 28.8444C4.94241 28.8694 4.75042 28.8399 4.57779 28.7595C4.40516 28.6791 4.25908 28.5511 4.15673 28.3905C4.05437 28.2299 4 28.0435 4 27.853V8.00006C4 7.73484 4.10536 7.48049 4.29289 7.29295C4.48043 7.10542 4.73478 7.00006 5 7.00006H27C27.2652 7.00006 27.5196 7.10542 27.7071 7.29295C27.8946 7.48049 28 7.73484 28 8.00006V24.0001C28 24.2653 27.8946 24.5196 27.7071 24.7072C27.5196 24.8947 27.2652 25.0001 27 25.0001H10.3123C10.0769 25.0001 9.84907 25.0831 9.66887 25.2346Z"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                    />
                    <path d="M16 18.0001C17.1046 18.0001 18 17.1047 18 16.0001C18 14.8956 17.1046 14.0001 16 14.0001C14.8954 14.0001 14 14.8956 14 16.0001C14 17.1047 14.8954 18.0001 16 18.0001Z" />
                    <path d="M10 18.0001C11.1046 18.0001 12 17.1047 12 16.0001C12 14.8956 11.1046 14.0001 10 14.0001C8.89543 14.0001 8 14.8956 8 16.0001C8 17.1047 8.89543 18.0001 10 18.0001Z" />
                    <path d="M22 18.0001C23.1046 18.0001 24 17.1047 24 16.0001C24 14.8956 23.1046 14.0001 22 14.0001C20.8954 14.0001 20 14.8956 20 16.0001C20 17.1047 20.8954 18.0001 22 18.0001Z" />
                </svg>
            </div>
            {/*             <Flex>
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
            </Flex> */}
        </div>
    );
};
