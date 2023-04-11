import React from 'react'
import logo from '../../assets/images/logo.png'

interface Props {
  size: number;
}

const Logo = ({size}: Props) => {
  return (
    <img width={`${size}px`} src={logo}/>
  )
}

export default Logo