import React from "react"
import ReactModal from "react-modal"
import { useStore } from "./store"
import "./styles.css"

ReactModal.setAppElement("#root")

export const EditQuestionModal = ({ handleEdit }) => {
  const { editModeActive, set, getQuestion, editId, editQuestion } = useStore((state) => ({
    editModeActive: state.editModeActive,
    set: state.set,
    getQuestion: state.getQuestion,
    editId: state.editedQuestionId,
    editQuestion: state.editQuestion,
  }))
  const question = getQuestion(editId)
  const closeModal = () => {
    handleEdit(question._id, question.text)
    set((state) => {
      state.editModeActive = false
    })
  }
  return (
    <ReactModal overlayClassName="bg-gray-500 bg-opacity-60 fixed inset-0" className="h-1/3 bg-white container mx-auto mt-64 p-16 shadow-lg md:rounded-lg focus:outline-none" isOpen={editModeActive} onRequestClose={closeModal} contentLabel="Frage bearbeiten">
      <div className="flex flex-col justify-center">
        <div className="text-2xl mb-4 text-center font-bold">Frage bearbeiten</div>
        <input
          value={question.text}
          onChange={(event) => {
            editQuestion(question._id, event.target.value)
          }}
          className="w-full bg-white rounded border border-gray-300 focus:border-green-500 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
        ></input>
        <button
          className="bg-green-500 hover:bg-green-600 text-white shadow-md p-2 cursor-pointer rounded-md mt-4 w-1/4 place-self-center"
          onClick={closeModal}
        >
          Speichern
        </button>
      </div>
    </ReactModal>
  )
}
