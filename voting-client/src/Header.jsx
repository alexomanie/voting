import React from 'react';

export const Header = ({ membersOnline }) => {
    return (
        <header className="text-white mt-0 w-full top-0">
            <div className="bg-gray-600 flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
                <div className="flex title-font font-medium items-center mb-4 md:mb-0">
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        className="stroke-current text-green-300"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12 21.999H3.75C3.55109 21.999 3.36032 21.92 3.21967 21.7794C3.07902 21.6387 3 21.4479 3 21.249V12.999C3 10.6121 3.94821 8.32288 5.63604 6.63505C7.32386 4.94723 9.61304 3.99902 12 3.99902H12C14.3869 3.99902 16.6761 4.94724 18.364 6.63506C20.0518 8.32289 21 10.6121 21 12.999V12.999C21 15.386 20.0518 17.6752 18.364 19.363C16.6761 21.0508 14.387 21.999 12 21.999V21.999Z"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M11.5123 21.9994C12.1333 23.7541 13.283 25.2732 14.803 26.3477C16.323 27.4221 18.1386 27.999 20 27.999H28.25C28.4489 27.999 28.6397 27.92 28.7803 27.7794C28.921 27.6387 29 27.4479 29 27.249V18.999C29 16.6972 28.118 14.4828 26.5355 12.8113C24.953 11.1398 22.7902 10.1381 20.4918 10.0122"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <span className="ml-3 text-xl">Pollerr</span>
                </div>
                <div className="flex flex-row items-center self-center text-md items-center">
                    <div className="font-medium title-font">
                        online: {membersOnline}
                    </div>
                    <div className="items-center fill-current text-green-300">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            width="16"
                            height="16"
                        >
                            <circle r={4} cx={8} cy={8} strokeWidth={0} />
                        </svg>
                    </div>
                </div>
            </div>
        </header>
    );
};
