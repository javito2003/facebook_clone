import axios from 'axios'
import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SidebarFriends from '../components/Friends/SidebarFriends'
import Header from '../components/Home/Header'
import { getNotifications } from '../redux/notifDucks'
import socket from '../utils/ws'

const Friends = () => {
    const dispatch = useDispatch()
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
                dispatch(getNotifications())
            }
        })
        .catch(err => {
            console.log(err.response);
        })
    }


    function acceptFriendRequest(id, userId){
        let config = {
            headers: {
                token: token
            }
        }
        axios.post("/acceptfriendrequest", {requestId: id}, config)
        .then(res => {
            if(res.data.status === 'success'){
                dispatch(getNotifications())
                getFriendRequest()
                socket.emit('accepted', userId)
            }
        })
        .catch(err => {
            console.log(err.response)
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
                <SidebarFriends requests={friendRequests} acceptFriendRequest={acceptFriendRequest} deleteRequest={rejectFriendRequest} />
            </div>
        </div>
    )
}

export default Friends
