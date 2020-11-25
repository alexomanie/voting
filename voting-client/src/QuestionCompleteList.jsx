import React, { useState } from 'react';
import { QuestionComplete } from './QuestionComplete';

export const QuestionCompleteList = ({ questions, handleDelete }) => {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <div className="my-8">
            <div className="flex items-center">
                {collapsed && (
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        className="cursor-pointer stroke-current text-gray-700 hover:text-green-600"
                        onClick={() => setCollapsed((prevState) => !prevState)}
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M11 16H21"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M16 11V21"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                )}
                {!collapsed && (
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        className="cursor-pointer stroke-current text-gray-700 hover:text-green-600"
                        onClick={() => setCollapsed((prevState) => !prevState)}
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M11 16H21"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                )}

                <div className="ml-2">Beantwortet ({questions.length})</div>
            </div>
            {!collapsed &&
                questions.map((question, index) => (
                    <QuestionComplete
                        index={index}
                        key={`complete-${index}`}
                        handleDelete={handleDelete}
                        question={question}
                    ></QuestionComplete>
                ))}
        </div>
    );
};
