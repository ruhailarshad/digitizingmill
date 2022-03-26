import React from 'react'
import './Text.css'
const Text = ({type = 'p', med, semi, bold, styles = '', children}: any) => {
  const getAttribute = () => {
    if (med) return `${type}-med`
    if (semi) return `${type}-semi`
    if (bold) return `${type}-bold`
    return ''
  }

  const pType_func = (type: any) => {
    if (type === 'p') {
      if (med) return `font-medium`
      if (semi) return `font-semibold`
      if (bold) return `font-bold`
      return ''
    }
    return ''
  }

  const Type = type.toLowerCase()

  return (
    <Type className={`${getAttribute()} ${styles} ${pType_func(type)}`}>
      {children}
    </Type>
  )
}

export default Text