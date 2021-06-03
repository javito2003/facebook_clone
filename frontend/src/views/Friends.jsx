import axios from 'axios'
import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import SidebarFriends from '../components/Friends/SidebarFriends'
import Header from '../components/Home/Header'
import socket from '../utils/ws'

const Friends = () => {
    const token = useSelector((store) => store.user.user.token)
    const [friendRequests, setFriendRequests] = useState([])
    function getFriendRequest(){
        let config = {
            headers:{
                token: token
            }
        }

        axios.get('/friendRequests', config)
        .then(res => {
            setFriendRequests(res.data.data)
        })
        .catch(err => {
            console.log(err.response);
        })
    }
    function rejectFriendRequest(id){
        let config = {
            headers:{
                token:token
            },
            params:{
                requestId: id
            }
        }
        axios.delete('/friendrequest', config)
        .then(res => {
            if(res.data.status === 'success'){
                getFriendRequest()
            }
        })
        .catch(err => {
            console.log(err.response);
        })
    }

    React.useEffect(() => {
        getFriendRequest()
        socket.on('new-request', getFriendRequest)
    }, [])


    return (
        <div className="h-screen overflow-hidden">
            <Header />
            <div className="flex overflow-hidden">
                <SidebarFriends requests={friendRequests} deleteRequest={rejectFriendRequest} />
            </div>
        </div>
    )
}

export default Friends
