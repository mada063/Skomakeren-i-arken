"use client"

import React, { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '@/lib/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { signOut } from 'firebase/auth'

interface EditableContent {
  id: string
  title: string
  content: string
  page: string
}

const Editor = () => {
  const [user, loading] = useAuthState(auth)
  const [contents, setContents] = useState<EditableContent[]>([])
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      loadContent()
    }
  }, [user])

  const loadContent = async () => {
    try {
      const contentDoc = doc(db, 'content', 'main')
      const contentSnap = await getDoc(contentDoc)
      
      if (contentSnap.exists()) {
        const data = contentSnap.data()
        setContents(data.contents || [])
      } else {
        // Initialize with default content
        const defaultContents: EditableContent[] = [
          // Home page content
          {
            id: 'hero-title',
            title: 'Hero Title',
            content: 'Velkommen til Skomakeren i Arken',
            page: 'home'
          },
          {
            id: 'hero-subtitle',
            title: 'Hero Subtitle',
            content: 'Din lokale skomaker og nøkkelmaker',
            page: 'home'
          },
          // Sko page content
          {
            id: 'sko-title',
            title: 'Sko Page Title',
            content: 'Våre tjenester',
            page: 'sko'
          },
          {
            id: 'sko-landing-title',
            title: 'Sko Landing Title',
            content: 'Ekspert skoreparasjon',
            page: 'sko'
          },
          {
            id: 'sko-landing-heading',
            title: 'Sko Landing Heading',
            content: 'Reparer skoene dine profesjonelt',
            page: 'sko'
          },
          {
            id: 'sko-landing-subheading',
            title: 'Sko Landing Subheading',
            content: 'Vi tilbyr førsteklasses skoreparasjon for alle typer sko. Bærekraftig, raskt og pålitelig.',
            page: 'sko'
          },
          // Bil-nokler page content
          {
            id: 'bilnokler-title',
            title: 'Bilnøkkler Page Title',
            content: 'Bilnøkkler',
            page: 'bil-nokler'
          },
          {
            id: 'bilnokler-landing-title',
            title: 'Bilnøkkler Landing Title',
            content: 'Bilnøkkel ekspertise',
            page: 'bil-nokler'
          },
          {
            id: 'bilnokler-landing-heading',
            title: 'Bilnøkkler Landing Heading',
            content: 'Profesjonell bilnøkkel service',
            page: 'bil-nokler'
          },
          {
            id: 'bilnokler-landing-subheading',
            title: 'Bilnøkkler Landing Subheading',
            content: 'Vi programmerer og kopierer bilnøkler for alle merker. Rask service og kvalitetsgaranti.',
            page: 'bil-nokler'
          },
          // Nokler page content
          {
            id: 'nokler-landing-title',
            title: 'Nokler Landing Title',
            content: 'Nøkkeltjenester',
            page: 'nokler'
          },
          {
            id: 'nokler-landing-heading',
            title: 'Nokler Landing Heading',
            content: 'Vi kopierer nøkler på stedet',
            page: 'nokler'
          },
          {
            id: 'nokler-landing-subheading',
            title: 'Nokler Landing Subheading',
            content: 'Trenger du en ekstranøkkel? Vi kopierer raskt og presist med kvalitetsgaranti.',
            page: 'nokler'
          },
          // Skilt page content
          {
            id: 'skilt-landing-title',
            title: 'Skilt Landing Title',
            content: 'Skilt og merking',
            page: 'skilt'
          },
          {
            id: 'skilt-landing-heading',
            title: 'Skilt Landing Heading',
            content: 'Profesjonelle skilt til alle formål',
            page: 'skilt'
          },
          {
            id: 'skilt-landing-subheading',
            title: 'Skilt Landing Subheading',
            content: 'Bestill dørskilt, navneskilt og kontorskilt med rask levering og høy kvalitet.',
            page: 'skilt'
          }
        ]
        setContents(defaultContents)
      }
    } catch (error) {
      console.error('Error loading content:', error)
    }
  }

  const handleContentChange = (id: string, newContent: string) => {
    setContents(prev => 
      prev.map(item => 
        item.id === id ? { ...item, content: newContent } : item
      )
    )
  }

  const handleSave = async () => {
    if (!user) return
    
    setSaving(true)
    setSaveStatus('')
    
    try {
      const contentDoc = doc(db, 'content', 'main')
      await updateDoc(contentDoc, {
        contents: contents,
        lastUpdated: new Date(),
        updatedBy: user.email
      })
      setSaveStatus('Innhold lagret!')
      setTimeout(() => setSaveStatus(''), 3000)
    } catch (error) {
      console.error('Error saving content:', error)
      setSaveStatus('Feil ved lagring')
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Laster...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Innholdsredigerer</h1>
              <p className="text-gray-600 mt-2">
                Logget inn som: {user.email}
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? 'Lagrer...' : 'Lagre endringer'}
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Logg ut
              </button>
            </div>
          </div>
          
          {saveStatus && (
            <div className={`mt-4 p-3 rounded-lg ${
              saveStatus.includes('Feil') 
                ? 'bg-red-100 text-red-700' 
                : 'bg-green-100 text-green-700'
            }`}>
              {saveStatus}
            </div>
          )}
        </div>

        {/* Content Editor */}
        <div className="space-y-6">
          {contents.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500">Side: {item.page}</p>
              </div>
              <textarea
                value={item.content}
                onChange={(e) => handleContentChange(item.id, e.target.value)}
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Skriv innhold her..."
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Editor 