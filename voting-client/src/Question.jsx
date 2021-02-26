import React from "react"
import { Flipped } from "react-flip-toolkit"
import "./styles.css"
import { useVotedQuestionsStore, useStore } from "./store"
import { useState } from "react"

const getVotingStyle = (votedQuestionIds, questionId) => {
  return votedQuestionIds.includes(questionId)
    ? "cursor-not-allowed opacity-50"
    : "cursor-pointer hover:border-green-600 hover:text-green-600"
}

export const Question = React.memo(
  ({ question, handleVote, handleComplete, handleEdit, index, ...rest }) => {
    const votedQuestionIds = useVotedQuestionsStore((state) => state.votedQuestionIds)
    const flipId = `item-${question._id}`
    const [editMode, toggleEditMode] = useState(false)
    const {editQuestion, set} = useStore((state) =>  ({set: state.set, editQuestion: state.editQuestion}))
    const onKeyDownHandler = (event) => {
      if (event.keyCode === 13) {
        handleEdit(question._id, question.text)
        toggleEditMode(false)
      }
    }
    return (
      <Flipped flipId={flipId}>
        <li className="relative px-4 py-4 bg-white shadow-lg md:rounded-lg md:p-4 my-2">
          <div className="mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="display: flex justify-between mb-2">
                {!editMode && (
                  <div className="text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <p>{question.text}</p>
                  </div>
                )}
                {editMode && (
                  <div className="text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <input
                      value={question.text}
                      placeholder="Frage eingeben"
                      onKeyDown={(event) => onKeyDownHandler(event)}
                      onChange={(event) => {
                          editQuestion(question._id, event.target.value)
                          //setEditedText(event.target.value);
                        }
                      }
                      className="w-full bg-white rounded border border-gray-300 focus:border-green-500 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    ></input>
                  </div>
                )}
                <div className="display: flex flex-row items-center">
                  <p className="text-center mr-2 font-bold  text-gray-700">{question.votes}</p>
                  <div
                    onClick={
                      !votedQuestionIds.includes(question._id)
                        ? () => handleVote(question._id)
                        : () => {}
                    }
                    className={`shadow-md rounded-full self-center border-2 border-gray-600 text-gray-600 ${getVotingStyle(
                      votedQuestionIds,
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
                  onClick={() => toggleEditMode(true)}
                  className="bg-white hover:bg-blue-100 text-white shadow-md p-2 cursor-pointer rounded-md ml-2 mt-2"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.68934 20.25H4.5C4.30109 20.25 4.11032 20.171 3.96967 20.0303C3.82902 19.8897 3.75 19.6989 3.75 19.5V15.3107C3.75 15.2122 3.7694 15.1146 3.80709 15.0236C3.84478 14.9326 3.90003 14.85 3.96967 14.7803L15.2197 3.53032C15.3603 3.38967 15.5511 3.31065 15.75 3.31065C15.9489 3.31065 16.1397 3.38967 16.2803 3.53032L20.4697 7.71966C20.6103 7.86032 20.6893 8.05108 20.6893 8.24999C20.6893 8.44891 20.6103 8.63967 20.4697 8.78032L9.21967 20.0303C9.15003 20.1 9.06735 20.1552 8.97635 20.1929C8.88536 20.2306 8.78783 20.25 8.68934 20.25Z"
                      stroke="black"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.75 6L18 11.25"
                      stroke="black"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.95211 20.2021L3.79773 15.0477"
                      stroke="black"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </li>
      </Flipped>
    )
  }
)
