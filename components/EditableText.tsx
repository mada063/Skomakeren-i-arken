"use client"

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface EditableTextProps {
  id: string
  defaultText: string
  className?: string
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  page: string
}

const EditableText: React.FC<EditableTextProps> = ({
  id,
  defaultText,
  className = '',
  tag = 'p',
  page
}) => {
  const { user } = useAuth()
  const [text, setText] = useState(defaultText)
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      const contentDoc = doc(db, 'content', 'main')
      const contentSnap = await getDoc(contentDoc)
      
      if (contentSnap.exists()) {
        const data = contentSnap.data()
        const content = data.contents?.find((item: any) => item.id === id)
        if (content) {
          setText(content.content)
        }
      }
    } catch (error) {
      console.error('Error loading content:', error)
    }
  }

  const handleSave = async () => {
    if (!user) return
    
    setSaving(true)
    
    try {
      const contentDoc = doc(db, 'content', 'main')
      const contentSnap = await getDoc(contentDoc)
      
      let contents = []
      if (contentSnap.exists()) {
        contents = contentSnap.data().contents || []
      }
      
      const existingIndex = contents.findIndex((item: any) => item.id === id)
      const contentItem = {
        id,
        title: `${page} - ${id}`,
        content: text,
        page
      }
      
      if (existingIndex >= 0) {
        contents[existingIndex] = contentItem
      } else {
        contents.push(contentItem)
      }
      
      await updateDoc(contentDoc, {
        contents,
        lastUpdated: new Date(),
        updatedBy: user.email
      })
      
      setIsEditing(false)
    } catch (error) {
      console.error('Error saving content:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSave()
    }
    if (e.key === 'Escape') {
      setIsEditing(false)
      setText(defaultText)
    }
  }

  const renderText = () => {
    const commonProps = {
      className: `${className} ${user ? 'cursor-pointer hover:bg-yellow-100 hover:bg-opacity-50 rounded px-1' : ''}`,
      onClick: user ? () => setIsEditing(true) : undefined,
      title: user ? 'Klikk for å redigere' : undefined
    }

    switch (tag) {
      case 'h1':
        return <h1 {...commonProps}>{text}</h1>
      case 'h2':
        return <h2 {...commonProps}>{text}</h2>
      case 'h3':
        return <h3 {...commonProps}>{text}</h3>
      case 'h4':
        return <h4 {...commonProps}>{text}</h4>
      case 'h5':
        return <h5 {...commonProps}>{text}</h5>
      case 'h6':
        return <h6 {...commonProps}>{text}</h6>
      case 'span':
        return <span {...commonProps}>{text}</span>
      default:
        return <p {...commonProps}>{text}</p>
    }
  }

  if (isEditing && user) {
    return (
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          className={`${className} w-full p-2 border-2 border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
          autoFocus
          rows={tag.startsWith('h') ? 1 : 3}
        />
        <div className="absolute top-0 right-0 mt-1 mr-1">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Lagrer...' : 'Lagre'}
          </button>
        </div>
      </div>
    )
  }

  return renderText()
}

export default EditableText 