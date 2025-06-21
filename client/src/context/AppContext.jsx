import React , { createContext , useState , useEffect } from 'react';
import { jobsData } from '../assets/assets';

export const AppContext = React.createContext();

export const AppContextProvider = (props) => {

    const [searchFilter, setSearchFilter] = React.useState(
        {
            title: '',
            location: '',
            // jobType: 'all', // 'all', 'full-time', 'part-time', etc.
            // experienceLevel: 'all' // 'all', 'entry-level', 'mid-level', 'senior'
        }
    )

    const [isSearched,setIsSearched]=React.useState(false);

    const[jobs,setJobs]=React.useState([])

    const [showRecruiterLogin, setShowRecruiterLogin] = React.useState(false);

    //func to fetch jobdata
    const fetchJobs = async () => {
        setJobs(jobsData)
    }
    React.useEffect(() => {
        // Call the fetchJobs function to load initial job data
        fetchJobs();
    }, []);
    const value = {
        // Define any state or functions you want to provide to the context
        setSearchFilter,searchFilter,
        isSearched,setIsSearched,
        jobs,setJobs,
        showRecruiterLogin, setShowRecruiterLogin,

    }

    return (
        <AppContext.Provider value={value}>
            {/* Children components will be wrapped here */
            props.children
            }
        </AppContext.Provider>
    );
}
