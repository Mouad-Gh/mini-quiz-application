import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import QuizBox from "../components/QuizBox";

const Home = () => {
    const [questionsData, setQuestionsData] = useState(null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([])

    //create a function to pass to the question box to get the user answer 
    const addAnswer = (answer) =>{ 
        //get the previous inswers excluding this question's answer
        const previousAnswers = userAnswers.filter((answer,index)=> index!==questionIndex);
        //add it
        setUserAnswers([...previousAnswers,answer]);
    }
    //console.log(userAnswers)
    
    useEffect(()=>{
        fetch('https://opentdb.com/api.php?amount=5').then(result => result.json()).then(({results}) => {
        //console.log(results)
        setQuestionsData(results);
        })
    },[])
    
    //handle click function for the next button
    const nextQuestion = () =>{
        if(questionIndex < questionsData.length && userAnswers[questionIndex]){
        setQuestionIndex(questionIndex+1)
        }
    }
    if(!questionsData) return;
    return ( 
        <div className="App container">
            
            <h2 className="">You have {questionsData.length} questions to respond to</h2>
            <div className="question_container">
                <QuizBox questionData={questionsData[questionIndex]} questionIndex={questionIndex+1}  setAnswer={addAnswer} />
                <hr />
                { questionIndex === questionsData.length-1 ? 
                    <Link to="/result" state={{ questionsData, userAnswers }}>submit</Link> :
                    <button disabled={(userAnswers[questionIndex]===undefined)} onClick={nextQuestion}>next</button>
                }
            </div>
            
    </div>
     );
}
 
export default Home;