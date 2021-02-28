import React, { useEffect, useRef, useState } from "react"
import io from "socket.io-client"
import { Question } from "./Question"
import { QuestionCompleteList } from "./QuestionCompleteList"
import { Header } from "./Header"
import axios from "axios"
import { QuestionForm } from "./QuestionForm"
import "./tailwind.output.css"
import { Flipped, Flipper } from "react-flip-toolkit"
import { useStore, useVotedQuestionsStore } from "./store"
import { EditQuestionModal } from "./EditQuestionModal"

const api_base_url = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL
  : "http://localhost:4000"

function App() {
  const ws = useRef(null)
  const [connectedUsers, setConnectedUsers] = useState(0)
  const { editQuestion, set, questions } = useStore((state) => ({
    set: state.set,
    editQuestion: state.editQuestion,
    questions: state.questions,
  }))
  const setVotedQuestion = useVotedQuestionsStore((state) => state.set)

  useEffect(() => {
    ws.current = io(api_base_url)

    return () => {
      ws.current.disconnect()
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${api_base_url}/api/v1/questions`)
      set((state) => {
        state.questions = result.data.sort((a, b) => b.votes - a.votes)
      })
    }
    ws.current.on("question", (message) => {
      set((state) => {
        state.questions.push(message)
      })
    })

    ws.current.on("delete", (id) => {
      set((state) => {
        const index = state.questions.findIndex((q) => q._id === id)
        if (index !== -1) state.questions.splice(index, 1)
      })
    })
    ws.current.on("complete", (id) => {
      set((state) => {
        const index = state.questions.findIndex((q) => q._id === id)
        if (index !== -1) state.questions[index].complete = true
      })
    })
    ws.current.on("vote", (id) => {
      set((state) => {
        const index = state.questions.findIndex((q) => q._id === id)
        if (index !== -1) state.questions[index].votes++
        state.questions.sort((a, b) => b.votes - a.votes)
      })
    })
    ws.current.on("edit", (payload) => {
      editQuestion(payload.id, payload.text)
    })
    ws.current.on("startEdit", (id) => {
      set(state => {
        const index = state.questions.findIndex((q) => q._id === id)
        if (index !== -1) state.questions[index].edited = true
      })
    })
    fetchData()
    ws.current.on("users", (message) => {
      setConnectedUsers(message)
    })
  }, [])

  const postNewQuestion = async (newQuestionText) => {
    await axios.post(`${api_base_url}/api/v1/questions`, {
      text: newQuestionText,
    })
  }

  const vote = async (id) => {
    setVotedQuestion((state) => {
      state.votedQuestionIds.push(id)
    })
    await axios.put(`${api_base_url}/api/v1/questions/${id}/votes`)
  }

  const complete = async (id) => {
    await axios.put(`${api_base_url}/api/v1/questions/${id}/complete`)
  }

  const edit = async (id, updatedText) => {
    await axios.put(`${api_base_url}/api/v1/questions/${id}`, {
      text: updatedText,
    })
  }

  const startEdit = async(id) => {
    await axios.put(`${api_base_url}/api/v1/questions/${id}/startedit`)
  }

  const deleteQuestion = async (id) => {
    await axios.delete(`${api_base_url}/api/v1/questions/${id}/`)
  }

  return (
    <div className="min-h-screen bg-gray-100 justify-center">
      <Header membersOnline={connectedUsers}></Header>
      <div className="mt-4 sm:mx-4 lg:mx-auto lg:w-3/4">
        <QuestionForm handleClick={postNewQuestion}></QuestionForm>
        <EditQuestionModal handleEdit={edit}></EditQuestionModal>
        <Flipper flipKey={questions.map((q) => q._id).join("")}>
          <Flipped flipId="list">
            <ul>
              {questions
                .filter((ele) => ele.complete === false)
                .map((question, index) => (
                  <Question
                    index={index}
                    key={`open-${index}`}
                    handleVote={vote}
                    startEdit={startEdit}
                    handleComplete={complete}
                    handleDelete={deleteQuestion}
                    question={question}
                  ></Question>
                ))}
            </ul>
          </Flipped>
        </Flipper>

        <QuestionCompleteList
          handleDelete={deleteQuestion}
          questions={questions.filter((ele) => ele.complete === true)}
        ></QuestionCompleteList>
      </div>
    </div>
  )
}

export default App
