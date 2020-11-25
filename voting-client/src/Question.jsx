import React from 'react';
import { Flipped } from 'react-flip-toolkit';
import './styles.css';

const voteCompleted = (questionId) => {
    return (
        JSON.parse(localStorage.votedQuestionIds).findIndex(
            (id) => id === questionId
        ) !== -1
    );
};

const getVotingStyle = (questionId) => {
    return voteCompleted(questionId)
        ? 'cursor-not-allowed opacity-50'
        : 'cursor-pointer hover:border-green-600 hover:text-green-600';
};

export const Question = React.memo(
    ({ question, handleVote, handleComplete, handleDelete, ...rest }) => {
        return (
            <div className="relative px-4 py-4 bg-white shadow-lg md:rounded-lg md:p-4 my-2">
                <div className="mx-auto">
                    <div className="divide-y divide-gray-200">
                        <div className="display: flex justify-between">
                            <div className="text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <p>{question.text}</p>
                            </div>
                            <div>
                                <div
                                    onClick={
                                        !voteCompleted(question._id)
                                            ? () => handleVote(question._id)
                                            : () => {}
                                    }
                                    className={`shadow-md rounded-full self-center border-2 border-gray-600 text-gray-600 ${getVotingStyle(
                                        question._id
                                    )}`}
                                >
                                    <svg
                                        width="32"
                                        height="32"
                                        viewBox="0 0 32 32"
                                        fill="none"
                                        className="stroke-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M6 20L16 10L26 20"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                <p className="text-center mt-2 font-bold  text-gray-700">
                                    {question.votes}
                                </p>
                            </div>
                        </div>
                        <div className="display: flex justify-items-start">
                            <div
                                onClick={() => handleComplete(question._id)}
                                className="bg-green-500 hover:bg-green-600 text-white shadow-md p-2 cursor-pointer rounded-md mt-2"
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M16.875 5.6254L8.125 14.375L3.75 10.0004"
                                        stroke="white"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
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
        );
    }
);
