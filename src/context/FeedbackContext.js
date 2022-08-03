import { createContext, useState, useEffect } from "react";
//import FeedbackData from "../data/FeedbackData"
const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [feedback, setFeedback] = useState([])
        // [{
        //     id:1,
        //     text:'This is from context.',
        //     rating:10
        // }]
    const [feedbackEdit,setFeedbackEdit] = useState({
        item : {},
        edit : false
    })
    useEffect(() => {
        fetchFeedback()
    },[])
    const fetchFeedback = async () => {
        const response = await
        fetch(`/feedback?_sort=id&_oreder=desc`)
        const data = await response.json()
        
        setFeedback(data)
        setIsLoading(false)
    }
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit : true
        })
    }

    const addFeedback = async (newFeedback) => {
        const res = await fetch('/feedback',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFeedback)
        })
        const data = await res.json()
        setFeedback([data, ...feedback])
    }
    const updateFeedback = async (id,updItem) => {
        const res = await fetch('/feedback',{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updItem)
        })
        const data = await res.json()
        setFeedback(feedback.map((item) => (item.id === id) ? { ...item, ...data} : item))
    }
    const deleteFeedback = async (id) => {
        if(window.confirm('Are you sure you want to delete?')){
            await fetch(`/feedback/${id}`,{ method: 'DELETE' })
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
                updateFeedback,
                isLoading
            }
        }>
            {children}
        </FeedbackContext.Provider>
    )
}

export default FeedbackContext