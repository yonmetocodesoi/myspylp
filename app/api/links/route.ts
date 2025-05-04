import { NextResponse } from 'next/server'
import { nanoid } from 'nanoid'

export async function POST() {
  try {
    // Generate a unique ID for the link
    const id = nanoid(10)
    
    // Return the generated link
    return NextResponse.json({ 
      success: true,
      link: `/link/${id}`
    })
  } catch (error) {
    console.error('Error generating link:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate link' },
      { status: 500 }
    )
  }
} 