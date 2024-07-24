import React from 'react'

const TeamPage = ({params}:{params:{slug:string}}) => {
  return (
    <div>Team {params.slug}</div>
  )
}

export default TeamPage