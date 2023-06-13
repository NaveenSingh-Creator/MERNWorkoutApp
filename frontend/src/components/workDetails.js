import {useWorkoutContext} from '../hooks/useWorkoutsContext'
import { AiFillDelete } from "react-icons/ai";

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const WorkoutDetails = ({workout}) => {

    const {dispatch} = useWorkoutContext();

    const handleDelete = async() => {

        const response = await fetch('/api/workout/' + workout._id , {
            method:'DELETE'
        })
        
        const json = await response.json();

        if(response.ok){
            dispatch({type:'DELETE_WORKOUT',payload:json})
        }
    }


    
    const {title, reps, load} = workout;
    return(
        <div className="workout-details">
            <h4>{title}</h4>
            <p><strong>Load(Kg): </strong>{load}</p>
            <p><strong>Reps: </strong>{reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix : true})}</p>
            <span onClick={handleDelete}><AiFillDelete/></span>
        </div>
    )
}

export default WorkoutDetails;
