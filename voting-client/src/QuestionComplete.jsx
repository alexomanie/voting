import React from 'react';
import { Flipped } from 'react-flip-toolkit';
import './styles.css';

export const QuestionComplete = React.memo(({ question, handleDelete }) => {
    return (
        <Flipped flipId={question._id}>
            <div className="relative px-4 py-4 bg-gray-300 shadow-lg md:rounded-lg md:p-4 my-2">
                <div className="mx-auto">
                    <div className="display: flex justify-between">
                        <div className="text-base leading-6 space-y-4 text-gray-500 italic sm:text-lg sm:leading-7">
                            <p>{question.text}</p>
                        </div>
                        <div>
                            <div className="display: flex justify-items-start">
                                <div
                                    onClick={() => handleDelete(question._id)}
                                    className="bg-red-500 hover:bg-red-600 text-white shadow-md p-2 cursor-pointer rounded-md ml-2 mt-2"
                                >
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M16.8747 4.375L3.12469 4.37501"
                                            stroke="white"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M8.125 8.125V13.125"
                                            stroke="white"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M11.875 8.125V13.125"
                                            stroke="white"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M6.875 1.875H13.125"
                                            stroke="white"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M15.6247 4.375V16.25C15.6247 16.4158 15.5588 16.5747 15.4416 16.6919C15.3244 16.8092 15.1655 16.875 14.9997 16.875H4.99969C4.83393 16.875 4.67496 16.8092 4.55775 16.6919C4.44054 16.5747 4.37469 16.4158 4.37469 16.25V4.375"
                                            stroke="white"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Flipped>
    );
});
