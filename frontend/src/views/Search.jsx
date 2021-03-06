import React from 'react'
import { useLocation } from 'react-router'
import Header from '../components/Home/Header'
import Results from '../components/Search/Results'
import Sidebar from '../components/Search/Sidebar'
import { useSelector } from 'react-redux'
function useQuery(){
    return new URLSearchParams(useLocation().search)
}

const Search = () => {
    const userDB = useSelector(store => store.userDB.userDB)
    let query = useQuery()
    let name = query.get('name')

    return (
        <div className="h-screen overflow-hidden">
            <Header />
            <div className="flex overflow-hidden">
                <Sidebar />
                <Results query={name} userDB={userDB} />
            </div>
        </div>
    )
}

export default Search
