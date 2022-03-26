import { Button } from 'antd'
import React from 'react'
import Text from '../Text/Text'

const HeadAndContent = ({heading,btn,children,styles=''}) => {
  return (
    <div className={`p-40 flex flex-col space-y-40 ${styles} max-md:p-20`}>
   
    <div className="flex items-center space-x-40 mb-40 max-md:flex-col max-md:space-x-0 max-md:items-start ">
         <Text type="h3"  bold>{heading}</Text>
    {btn &&  <Button  type="primary"  danger size="medium" onClick={btn.buttonHandler}>
      {btn.name}
     </Button>}
     </div>
     {children}
     </div>
  )
}

export default HeadAndContent