"use client"

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { contentCache } from '@/lib/contentCache'

interface EditableTextProps {
  id: string
  defaultText: string
  className?: string
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  page: string
  component?: string
}

const EditableText: React.FC<EditableTextProps> = ({
  id,
  defaultText,
  className = '',
  tag = 'p',
  page,
  component
}) => {
  const { user } = useAuth()
  const [text, setText] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      // First check cache
      const cachedContent = contentCache.get(id)
      if (cachedContent) {
        setText(cachedContent.content)
        setIsLoading(false)
        return
      }

      // If not in cache, load from Firebase and cache it
      await contentCache.loadPageFromFirebase(page)
      
      // Check cache again after loading
      const newlyCachedContent = contentCache.get(id)
      if (newlyCachedContent) {
        setText(newlyCachedContent.content)
      } else {
        // If still not found, use default text
        setText(defaultText)
      }
    } catch (error) {
      console.error('Error loading content:', error)
      // On error, fall back to default text
      setText(defaultText)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    if (!user) return
    
    setSaving(true)
    
    try {
      // Update cache immediately (instant UI update)
      const contentItem = {
        id,
        title: `${page} - ${id}`,
        content: text,
        page,
        lastUpdated: new Date(),
        ...(component && { component }) // Only include component if it exists
      }
      
      contentCache.set(id, contentItem)
      
      // Update local state immediately
      setText(text)
      setIsEditing(false)
    } catch (error) {
      console.error('Error saving content:', error)
      // Revert text on error
      setText(defaultText)
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
    // Show loading state while content is being loaded
    if (isLoading) {
      const loadingProps = {
        className: `${className} shadow-lg rounded-lg animate-pulse`,
        style: { 
          minHeight: tag.startsWith('h') ? '2em' : '1.5em',
          width: tag.startsWith('h') ? '60%' : '80%'
        }
      }
      
      switch (tag) {
        case 'h1':
          return <h1 {...loadingProps}></h1>
        case 'h2':
          return <h2 {...loadingProps}></h2>
        case 'h3':
          return <h3 {...loadingProps}></h3>
        case 'h4':
          return <h4 {...loadingProps}></h4>
        case 'h5':
          return <h5 {...loadingProps}></h5>
        case 'h6':
          return <h6 {...loadingProps}></h6>
        case 'span':
          return <span {...loadingProps}></span>
        default:
          return <p {...loadingProps}></p>
      }
    }

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