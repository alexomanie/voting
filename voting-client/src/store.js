import create from "zustand"
import produce from 'immer'
import { persist } from "zustand/middleware"

export const useStore = create((set) => ({
  questions: [],
  set: fn => set(produce(fn)),
//   addQuestion: (question) => set((state) => ({ questions: questions.concat(question) })),
//   deleteQuestion: (questionId) =>
//     set((state) => ({ questions: questions.filter((q) => q._id !== questionId) })),
//   editQuestion: (questionId, updatedQuestionText) => set(state => ({
//       const questionIndex = state.questions.findIndex(q => q._id === questionId)
//       state.questions.text = updatedQuestionText;
//   }))
}))

export const useVotedQuestionsStore = create(persist(
    (set) => ({
        votedQuestionIds: [],
        set: fn => set(produce(fn)),
    })
))
