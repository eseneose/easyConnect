import React from 'react'
import Cover from '../../img/cover.png'
import Profile from '../../img/user3.png'
import './ProfileCard.css'
import {useSelector} from "react-redux"
import { Link } from 'react-router-dom'

function ProfileCard({location}) {

    const {user } = useSelector((state)=> state.authReducer.authData)
  const posts = useSelector((state)=> state.postReducer.posts)
    const publicServer = process.env.REACT_APP_PUBLIC_FOLDER

  return (
    <div className="ProfileCard">
        <div className="ProfileImages">
            <img src={user.coverPicture? publicServer + user.coverPicture:  Cover} alt=""/>
            <img src={user.profilePicture? publicServer + user.profilePicture:  Profile} alt=""/>
        </div>

        <div className="ProfileName">
            <span>{user.firstname} {user.lastname}</span>
            <span>{user.worksAt? user.worksAt: "Write about yourself"}</span>
        </div>

        <div className="FollowStatus">
            <hr/>
            <div>
                <div className="Follow">
                    <span>{user.following.length}</span>
                    <span>Following</span>
                </div>
                <div className="vl"></div>
                <div className="Follow">
                    <span>{user.followers.length}</span>
                    <span>Followers</span>
                </div>
                {
                    location ==='profilePage' &&(
                    <>
                        <div className="vl">

                        </div>
                        <div className="Follow">
                            <span>{posts.filter((post)=>post.userId === user._id).length} </span>
                            <span>Posts</span>
                        </div>
                    </>
                    )
                }
            </div>
            <hr/>
        </div>
        {
        location ==='profilePage'? '':
            <span>   
                <Link style={{textDecoration:"none", color:"inherit" }} to={`/profile/${user._id}`}>
                My Profile
                </Link>
                
            </span>
        }
        
    </div>
  )
}

export default ProfileCard