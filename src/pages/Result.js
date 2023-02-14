import { Fragment, useEffect, useState } from "react";
import { useLocation, Redirect, useNavigate } from "react-router-dom";

const Result = () => {
    const location = useLocation();
    const { questionsData, userAnswers } = location.state || {};
    const [ incorrectAnswersCount,setIncorrectAnswersCount ] = useState(null);
    useEffect(()=>{
        
        let count = 0;
        questionsData?.forEach((question, index)=>{

            if(userAnswers[index] !==question.correct_answer ){
            count++;
            }
        });
        setIncorrectAnswersCount(count)
    },[questionsData, userAnswers]);
    const navigate = useNavigate();
    //to return to questions if the user try to access the result before answering
    if(!location.state || !questionsData || !userAnswers) return navigate(-1)
    return ( 
        <div className="">
            <h2 className="">You have {incorrectAnswersCount} incorrect answers</h2>
            { questionsData && <div className="question_container">
                {questionsData.map((questionData,index) => (
                    <Fragment key={index}>
                        <h3 className="question">
                            <span>{`Q${index+1}: `}</span>
                            <span dangerouslySetInnerHTML={{__html: questionData.question}}></span>
                        </h3>
                        
                        <div className="answers">
                            <span className="correctAnswer" >
                                
                                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="correctAnswer">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                                {questionData.correct_answer}
                            </span>
                            {questionData.incorrect_answers.map((answer,i) => (
                            <label className={`${answer===userAnswers[index] && "wrongAnswer"}`}  key={i} >
                                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>

                                {answer}
                            </label>
                            ))}
                            
                        </div>
                        <hr/>
                    </Fragment>
                ))}    
                
            </div>
            }
        </div>
     );
}
 
export default Result;