import { useState, useCallback } from "react"
import QUESTIONS from '../questions';
import Question from "./Question";
import Summary from "./Summary";

export default function Quiz() {
    const [started, setStarted] = useState(false);
    const [userAnswers, setUserAnswers] = useState([]);

    
    const startQuiz = () => {
        setStarted(true);
    };


    const activeQuestionIndex = userAnswers.length;

    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setUserAnswers(prevAns => {
            return [...prevAns, selectedAnswer]
        });
    }, []);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

    if(quizIsComplete) {
        return <Summary userAnswers={userAnswers} />
    }
 
    return (
        <div id="quiz">
            {started ? 
            <Question 
            key={activeQuestionIndex}
            index={activeQuestionIndex}
            onSelect={handleSelectAnswer}
            onTimeout={handleSkipAnswer}
            /> : <div className="home">
                 <h1>Welcome to the Quiz App!</h1>
                 <p>Click the button below to start the quiz.</p>
                 <button className="start-button" onClick={startQuiz}>Start Quiz</button>
             </div>
}
        </div>
            )
}