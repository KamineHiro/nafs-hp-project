"use client"

import Link from "next/link"

type BreadcrumbProps = {
  currentPage: string
}

export default function Breadcrumb({ currentPage }: BreadcrumbProps) {
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