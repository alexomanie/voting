/** @jsx jsx */
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { Question } from './Question';
import axios from 'axios';
import { QuestionForm } from './QuestionForm';

import { Container, jsx } from 'theme-ui';
import { Flipper, Flipped } from 'react-flip-toolkit';
import { Header } from './Header';

const api_base_url = process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL
    : 'http://localhost:4000';

function App() {
    const ws = useRef(null);
    const [connectedUsers, setConnectedUsers] = useState(0);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        ws.current = io(api_base_url);

        return () => {
            ws.current.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!localStorage.votedQuestionIds) {
            localStorage.setItem('votedQuestionIds', JSON.stringify([]));
            console.log('no key found.');
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`${api_base_url}/api/v1/questions`);
            setQuestions(result.data.sort((a, b) => b.votes - a.votes));
        };
        ws.current.on('question', (message) => {
            setQuestions((questions) => (questions = [...questions, message]));
        });

        ws.current.on('delete', (id) => {
            setQuestions((questions) =>
                questions.filter((question) => question._id !== id),
            );
        });
        ws.current.on('complete', (message) => {
            setQuestions((questions) => {
                return [...questions]
                    .map((question) => {
                        if (question._id === message._id)
                            return { ...question, complete: message.complete };
                        return question;
                    })
                    .sort((a, b) => b.votes - a.votes);
            });
        });
        ws.current.on('vote', (message) => {
            setQuestions((questions) => {
                console.log(questions);
                return [...questions]
                    .map((question) => {
                        if (question._id === message._id)
                            return { ...question, votes: message.votes };
                        return question;
                    })
                    .sort((a, b) => b.votes - a.votes);
            });
        });
        fetchData();
        ws.current.on('users', (message) => {
            console.log('received users event! ', message);
            setConnectedUsers(message);
        });
    }, []);

    const postNewQuestion = async (newQuestionText) => {
        await axios.post(`${api_base_url}/api/v1/questions`, {
            text: newQuestionText,
        });
    };

    const vote = async (id) => {
        console.log('vote ', id);
        const storedIds = JSON.parse(localStorage.votedQuestionIds);
        console.log(storedIds);
        localStorage.votedQuestionIds = JSON.stringify(storedIds.concat([id]));
        await axios.put(`${api_base_url}/api/v1/questions/${id}/votes`);
    };

    const complete = async (id) => {
        await axios.put(`${api_base_url}/api/v1/questions/${id}/complete`);
    };

    const deleteQuestion = async (id) => {
        await axios.delete(`${api_base_url}/api/v1/questions/${id}/`);
    };

    return (
        <div
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <div
                sx={{
                    marginTop: 3,
                    width: '9/12',
                    mx: 'auto',
                    flex: '1 1 auto',
                }}
            >
                <Container>
                    <Header membersOnline={connectedUsers}></Header>
                </Container>
                <Container sx={{ mb: 3 }}>
                    <QuestionForm handleClick={postNewQuestion}></QuestionForm>
                </Container>
                <Container>
                    <Flipper
                        spring={'noWobble'}
                        flipKey={questions.map((q) => q._id).join('')}
                    >
                        <Flipped flipId={'list'}>
                            <div>
                                <div>
                                    {questions
                                        .filter((ele) => ele.complete === false)
                                        .map((question, index) => (
                                            <Question
                                                index={index}
                                                key={question._id}
                                                handleVote={vote}
                                                handleComplete={complete}
                                                question={question}
                                            ></Question>
                                        ))}
                                </div>
                                <div>
                                    {questions
                                        .filter((ele) => ele.complete === true)
                                        .map((question, index) => (
                                            <Question
                                                index={index}
                                                key={question._id}
                                                handleVote={vote}
                                                handleComplete={complete}
                                                handleDelete={deleteQuestion}
                                                question={question}
                                            ></Question>
                                        ))}
                                </div>
                            </div>
                        </Flipped>
                    </Flipper>
                </Container>
            </div>
        </div>
    );
}

export default App;
