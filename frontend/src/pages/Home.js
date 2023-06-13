import React, { useEffect, useState } from "react";
import WorkoutDetails from "../components/workDetails";
import WorkoutForm from "../components/workoutForm";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";
const BASE_URL = process.env.BASE_URL

const Home = () => {

    const {workouts, dispatch} = useWorkoutContext();

    useEffect(() => {
        const fetchWorkouts = async() => {
            try {
                const response = await fetch('http://localhost:5000/api/workout');
            const json = await response.json();

            if(response.ok){
                dispatch({type:'SET_WORKOUTS',payload: json})
            }
            else{
                console.error("Request failed with status:",response.status)
            }
                
            } catch (error) {
                console.error("Error fetching workouts:",error)
            }
            
        }
        
        fetchWorkouts();

    },[])


   return(
    <div className="home">
        <div className="workouts">
            {workouts && workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout = {workout}
            />))}
        </div>
        <WorkoutForm/>
    </div>
   )

}

export default Home