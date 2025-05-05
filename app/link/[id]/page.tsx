"use client"

import dynamic from 'next/dynamic'

const LinkPageClient = dynamic(() => import('./LinkPageClient'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <p className="text-gray-500">Carregando...</p>
    </div>
  )
})

export default function Page() {
  return <LinkPageClient />
}
