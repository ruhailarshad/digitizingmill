import { Avatar } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Text } from '../../../core'

const UserCard = ({name, userId}) => {
  return (
    <Link  to={`${userId}`} className='cursor-pointer rounded-[20px] border-none p-20 bg-white flex items-center hover:bg-gray-10 active:bg-gray-20 '>
       <Avatar size={40}>RA</Avatar>
        <Text styles="ml-20" type="h4" med>{name}</Text>
    </Link>
  )
}

export default UserCard