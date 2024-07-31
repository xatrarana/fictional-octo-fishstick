import React from 'react'

const ImagePage = ({params}:{params:{id:string}}) => {
  console.log(params)
  return (
    <div>ImagePage {params.id}</div>
  )
}

export default ImagePage

