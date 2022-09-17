import React from 'react'
import {Link, LinkProps, useMatch, useResolvedPath} from 'react-router-dom'

export default function CustomLink({children, to,setCurrent, ...props}: LinkProps) {
  const resolved = useResolvedPath(to)
  const match = useMatch({path: resolved.pathname, end: true})
  //
  return (
    <div>
      <Link
        className={`
          ${match ? 'ant-menu-item-selected' : ''} `}
        to={to}
        {...props}
      
      >
        {children}
      </Link>
    </div>
  )
}