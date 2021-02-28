import create from "zustand"
import produce from "immer"
import { persist } from "zustand/middleware"
import SecureLS from 'secure-ls'

class mySecureLs {
  constructor() {
    this.secureLs = new SecureLS()
    this.getItem = this.getItem.bind(this)
    this.setItem = this.setItem.bind(this)
  }
  getItem(key) {
    return this.secureLs.get(key);
  }
  setItem(key, data) {
    return this.secureLs.set(key, data);
  }
}

const secLs = new mySecureLs()

export const useStore = create((set, get) => ({
  questions: [],
  editModeActive: false,
  editedQuestionId: "",
  getQuestion: (id) => {
    const question = get().questions.find((q) => q._id === id)
    return question ? question : { text: "", _id: "" }
  },
  set: (fn) => set(produce(fn)),
  //   addQuestion: (question) => set((state) => ({ questions: questions.concat(question) })),
  //   deleteQuestion: (questionId) =>
  //     set((state) => ({ questions: questions.filter((q) => q._id !== questionId) })),
  editQuestion: (questionId, updatedQuestionText) =>
    set((state) => {
      const updatedQuestions = state.questions.map((question) => {
        if (question._id === questionId) {
          return { ...question, text: updatedQuestionText, edited: false }
        }
        return question
      })
      return { questions: updatedQuestions }
    }),
}))

export const useVotedQuestionsStore = create(
  persist((set) => ({
    votedQuestionIds: [],
    set: (fn) => set(produce(fn)),
  }), {
    name: 'questionStorage',
    getStorage: () => secLs,
  })
)
