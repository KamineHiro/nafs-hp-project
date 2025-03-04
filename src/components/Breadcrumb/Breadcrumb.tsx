"use client"

import Link from "next/link"
import React from "react"

export interface BreadcrumbProps {
  currentPage?: string
  items?: Array<{
    label: string
    href: string
  }>
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ currentPage, items }) => {
  if (currentPage) {
    return (
      <div className="flex items-center text-white/90 text-sm">
        <Link 
          href="/" 
          className="text-[#FFD700] hover:text-[#FFF] hover:underline transition-all duration-300"
        >
          ホーム
        </Link>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 mx-2" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 5l7 7-7 7" 
          />
        </svg>
        <span className="text-white">{currentPage}</span>
      </div>
    )
  }
  
  if (items && items.length > 0) {
    return (
      <nav className="text-sm">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className="mx-2 text-white/60">/</span>}
            {index === items.length - 1 ? (
              <span className="text-white">{item.label}</span>
            ) : (
              <Link href={item.href} className="text-white/80 hover:text-white">
                {item.label}
              </Link>
            )}
          </React.Fragment>
        ))}
      </nav>
    )
  }
  
  return null
}

export default Breadcrumb 