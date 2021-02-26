import create from "zustand"
import produce from 'immer'
import { persist } from "zustand/middleware"

export const useStore = create((set) => ({
  questions: [],
  set: fn => set(produce(fn)),
//   addQuestion: (question) => set((state) => ({ questions: questions.concat(question) })),
//   deleteQuestion: (questionId) =>
//     set((state) => ({ questions: questions.filter((q) => q._id !== questionId) })),
  editQuestion: (questionId, updatedQuestionText) => set((state) => {
      const updatedQuestions =  state.questions.map(question => {
          if (question._id === questionId) {
              return {...question, text: updatedQuestionText}
          }
          return question;
      })
      return {questions: updatedQuestions};
  })
}))

export const useVotedQuestionsStore = create(persist(
    (set) => ({
        votedQuestionIds: [],
        set: fn => set(produce(fn)),
    })
))
