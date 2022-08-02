import { v4 as uuidv4 } from "uuid";
import { createContext, useState } from "react";
import FeedbackData from "../data/FeedbackData"
const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
    const [feedback, setFeedback] = useState(FeedbackData)
        // [{
        //     id:1,
        //     text:'This is from context.',
        //     rating:10
        // }]
    const [feedbackEdit,setFeedbackEdit] = useState({
        item : {},
        edit : false
    })

    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit : true
        })
    }

    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback])
    }
    const updateFeedback = (id,updItem) => {
        setFeedback(feedback.map((item) => (item.id === id) ? { ...item, ...updItem} : item))
    }
    const deleteFeedback = (id) => {
        if(window.confirm('Are you sure you want to delete?')){
          setFeedback(feedback.filter((item) => item.id !== id))
        }
        //console.log(id);
    }
    return (
        <FeedbackContext.Provider value={
            {
                feedback,
                addFeedback,
                deleteFeedback,
                editFeedback,
                feedbackEdit,
                updateFeedback
            }
        }>
            {children}
        </FeedbackContext.Provider>
    )
}

export default FeedbackContext