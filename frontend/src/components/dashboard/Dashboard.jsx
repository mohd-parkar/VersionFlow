// Dashboard has 3 section left , middle , right 
// left - suggested repository (all)
// middle - specific logged user repositories
// right - future events


import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios";
import "./dashboard.css";
import "../../index.css"

  

const Dashboard = ()=> {

    const [repositories,setRepositories] = useState([]);
    const [suggesteRepositories,setSuggestedRepositories] = useState([]);
    const [searchQuery,setSearchQuery] = useState([]);
    const [searchResult,setSearchResult] = useState([]);

    // as the page load , we want our data from backend => useEffect

    useEffect(()=>{
        // first fetched logged user's repo , thus we can find logged user id in localStorage
        const userId = localStorage.getItem("userId");

        const fetchRepositories = async() =>{
            const res = await axios.get(`http://localhost:3000/repo/user/${userId}`);

            const data = await res.data;
            console.log(data);
            setRepositories(data)
        }

        const fetchSuggestedRepo = async() =>{
            const res = await axios.get("http://localhost:3000/repo/all");

            const data = await res.data;
            console.log(data);
            setSuggestedRepositories(data);
        }

        fetchRepositories();
        fetchSuggestedRepo();

    },[])


    // now another useEffect fetching by specially when we get any search Query input 
    useEffect(()=>{
        if(searchQuery == ""){
            setSearchResult(repositories);
        }else{
            const filteredRepo = repositories.filter((repo) =>
            repo.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

            setSearchResult(filteredRepo);
        }
    },[searchQuery,repositories]);




    return (
        <section id='dashboard'>
            <aside>
                <h3>Suggested Repositories</h3>
                {suggesteRepositories.map((repo)=>{
                   return ( 
                   <div key={repo._id}>
                         <h4>{repo.name}</h4>
                         <p>{repo.description}</p>
                    </div>
                   )
                })}
            </aside>
            <main>
                 <h2>Your Repositories</h2>
                 <input type='text' placeholder='Search...' value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}></input>
                {searchResult.map((repo)=>{
                   return ( 
                   <div key={repo._id}>
                         <h4>{repo.name}</h4>
                         <p>{repo.description}</p>
                    </div>
                   )
                })}
            </main>
            <aside>
                <h3>Upcoming Events</h3>
                <ul>
                    <li><p>Tech Conference - 15 Dec</p></li>
                    <li><p>Developer Meetup - 20 Dec</p></li>
                    <li><p>React Summit - 1 Jan </p></li>
                </ul>
            </aside>
        </section>
    )
};

export default Dashboard;