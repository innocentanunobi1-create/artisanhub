import React from 'react'
import Link from 'next/link'
import styles from './Button.module.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  fullWidth?: boolean
  href?: string
}

export function Button({ children, variant = 'primary', fullWidth = false, href, style, ...props }: ButtonProps) {
  
  const baseClass = `${styles.btn} ${styles[variant]} ${fullWidth ? styles.fullWidth : ''}`
  
  if (href) {
    return (
      <Link href={href} className={baseClass} style={style}>
        {children}
      </Link>
    )
  }

  return (
    <button className={baseClass} style={style} {...props}>
      {children}
    </button>
  )
}
