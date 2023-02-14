import { useEffect, useState } from "react";

const QuizBox = ({questionData,setAnswer, questionIndex}) => {
    const [answers, setAnswers] = useState(null);

    useEffect(()=>{
         //to shuffle array answers 
      let shuffledAnswers = [...questionData.incorrect_answers,questionData.correct_answer].sort(function () {
        return Math.random() - 0.5;
      }) 
      setAnswers(shuffledAnswers);
    },[questionData]);

    //radiobutton group change value
    const handleChange = (event)=>{
        
        setAnswer(event.target.value)
    }
    return ( 
        <>
            <h3 className="question">
                <span>{`Q${questionIndex}: `}</span>
                <span dangerouslySetInnerHTML={{__html: questionData.question}}></span>
            </h3>
            <hr/>
            <div className="answers">
                
                {answers && answers.map((answer,index) => (
                <label key={index+""+questionIndex} >
                    <input type="radio"  id={"answer"+index} name={"question"+questionData} value={answer} onChange={handleChange} />
                    <span dangerouslySetInnerHTML={{__html: answer}}></span>
                </label>
                ))}
                
            </div>
      </>
     );
}
 
export default QuizBox;