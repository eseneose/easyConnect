import React from 'react'
import FollowersCard from '../followersCard/FollowersCard'
import InfoCard from '../infoCard/InfoCard'
import LogoSearch from '../logoSearch/LogoSearch'


function ProfileLeft() {
  return (
    <div className="ProfileSide">
        <LogoSearch/>
        <InfoCard/> 
        <FollowersCard/>
    </div>
  )
}

export default ProfileLeft