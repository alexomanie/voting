import React from "react"
import { Flipped } from "react-flip-toolkit"
import "./styles.css"
import { useVotedQuestionsStore, useStore } from "./store"

const getVotingStyle = (votedQuestionIds, questionId) => {
  return votedQuestionIds.includes(questionId)
    ? "cursor-not-allowed opacity-50"
    : "cursor-pointer hover:border-green-600 hover:text-green-600"
}

export const Question = React.memo(({ question, handleVote, startEdit, handleComplete }) => {
  const votedQuestionIds = useVotedQuestionsStore((state) => state.votedQuestionIds)
  const flipId = `item-${question._id}`
  const { set } = useStore((state) => ({
    set: state.set,
    editQuestion: state.editQuestion,
  }))
  return (
    <Flipped flipId={flipId}>
      <li className="relative px-4 py-4 bg-white shadow-lg md:rounded-lg md:p-4 my-2">
        <div className="mx-auto">
          <div className="divide-y divide-gray-200">
            <div className="display: flex justify-between mb-2">
              <div className="text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <p>{question.text}</p>
              </div>

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
                className="bg-green-500 hover:bg-green-600 text-white shadow-md p-2 cursor-pointer rounded-md mt-2 h-10"
              >
                Beantwortet
              </div>
              {question.edited && (
                <div className="flex space-y-4">
                  <div className="font-bold self-center ml-4 mt-2">In Bearbeitung</div>{" "}
                  <svg
                    class="animate-spin mr-3 h-5 w-5 text-gray-700 ml-2 self-center"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25 "
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
              )}
              {!question.edited && (
                <div
                  onClick={() => {
                    startEdit(question._id)
                    set((state) => {
                      state.editModeActive = true
                      state.editedQuestionId = question._id
                    })
                  }}
                  className="bg-gray-100 hover:bg-blue-100 text-gray-700 shadow-md p-2 cursor-pointer rounded-md ml-2 mt-2 h-10"
                >
                  Bearbeiten
                </div>
              )}
            </div>
          </div>
        </div>
      </li>
    </Flipped>
  )
})
