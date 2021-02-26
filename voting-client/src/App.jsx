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

const api_base_url = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL
  : "http://localhost:4000"

function App() {
  const ws = useRef(null)
  const [connectedUsers, setConnectedUsers] = useState(0)
  const set = useStore((state) => state.set)
  const setVotedQuestion = useVotedQuestionsStore((state) => state.set)

  const questions = useStore((state) => state.questions)
  const votedQuestionIds = useVotedQuestionsStore((state) => state.questions)
  console.log(questions)
  useEffect(() => {
    ws.current = io(api_base_url)

    return () => {
      ws.current.disconnect()
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${api_base_url}/api/v1/questions`)
      console.log(result)
      set((state) => {
        state.questions = result.data
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
      })
    })
    ws.current.on("edit", (payload) => {
        console.log('edit:', payload)
        set((state) => {
          const index = state.questions.findIndex((q) => q._id === payload.id)
          console.log(index)
          if (index !== -1) state.questions[index].text = payload.text
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
        text: updatedText
    })

  }

  const deleteQuestion = async (id) => {
    await axios.delete(`${api_base_url}/api/v1/questions/${id}/`)
  }

  return (
    <div className="min-h-screen bg-gray-100 justify-center">
      <Header membersOnline={connectedUsers}></Header>
      <div className="mt-4 sm:mx-4 lg:mx-auto lg:w-3/4">
        <QuestionForm handleClick={postNewQuestion}></QuestionForm>
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
                    handleEdit={edit}
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
