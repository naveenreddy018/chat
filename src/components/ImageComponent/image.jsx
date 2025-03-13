import React from 'react'

function ImageComponent(props) {
    const {src,alt,width} = props
  return (
    <div>
      <img  
    
        src={src}
        alt = {alt}
        width={width}
        {...props}
      
      />
    </div>
  )
}

export default ImageComponent;
