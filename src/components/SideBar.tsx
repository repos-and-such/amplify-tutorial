import React from 'react'
import './SideBar.css'
import SideBarButton from './SideBarButton'
import * as Constants from '../Constants'

function SideBar() {
  return (
    <div className="SideBar">
      <SideBarButton title={Constants.SIDEBAR_BUTTON.myChallenges} />
      <SideBarButton title={Constants.SIDEBAR_BUTTON.createChallenge} />
      <SideBarButton title={Constants.SIDEBAR_BUTTON.settings} />   
    </div>
  )
}

export default SideBar
