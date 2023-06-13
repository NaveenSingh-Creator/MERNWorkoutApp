import { useState } from "react"
import { useWorkoutContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {

    const {dispatch} = useWorkoutContext()

    const [title, setTitle] = useState('');
    const [load, setLoad]  = useState('');
    const [reps, setReps] = useState('');
    const [error,setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    
    const handleSubmit = async(e) => {

        e.preventDefault();
        
        const workout = {title, load, reps};

        const response = await fetch('/api/workout',{

            method:'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type':'application/json'
            }
        })
        
        // Tells that the the json response has been taken and now converted into javascript
        const json = await response.json();

        if(!response.ok){
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }

        if(response.ok){
            setTitle('');
            setError('');
            setLoad('');
            setError(null);
            setEmptyFields([]);
            dispatch({type:'CREATE_WORKOUT',payload:json});
            console.log('new workout added',json);
            
        }

    }

    return (
            <form className="create" onSubmit={handleSubmit}>
                <h3>Create new workout</h3>
                <label>Workout Name: </label>
                <input
                    type="text"
                    onChange={(e) =>setTitle(e.target.value)} 
                    value={title}
                    className={emptyFields.includes('title') ? 'error' : '' }
                />

                <label>Load (in KG):</label>
                <input
                    type="number"
                    onChange={(e) =>setLoad(e.target.value)} 
                    value={load}
                    className={emptyFields.includes('load') ? 'error' : '' }
                />

                <label>Reps:</label>
                <input
                    type="number"
                    onChange={(e) =>setReps(e.target.value)} 
                    value={reps}
                    className={emptyFields.includes('reps') ? 'error' : '' }
                />

                <button>Add Workout</button>
                {error && <div className="error">{error}</div>}
            </form>
    )
}

export default WorkoutForm;

