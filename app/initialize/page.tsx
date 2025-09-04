"use client";

import { useState } from 'react'
import { initializeContent } from '@/lib/initializeContent'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'

export default function InitializePage() {
  const [user, loading] = useAuthState(auth)
  const [initializing, setInitializing] = useState(false)
  const [status, setStatus] = useState('')
  const router = useRouter()

  const handleInitialize = async () => {
    if (!user) {
      setStatus('Du må være logget inn for å initialisere innhold')
      return
    }

    setInitializing(true)
    setStatus('Initialiserer innhold i Firebase...')

    try {
      const success = await initializeContent()
      if (success) {
        setStatus('Innhold initialisert vellykket! Du kan nå gå til redigeringssiden.')
      } else {
        setStatus('Feil ved initialisering av innhold')
      }
    } catch (error) {
      console.error('Error:', error)
      setStatus('Feil ved initialisering av innhold')
    } finally {
      setInitializing(false)
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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Ikke logget inn</h1>
          <p className="mb-4">Du må være logget inn for å initialisere innhold</p>
          <button
            onClick={() => router.push('/login')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Gå til innlogging
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Initialiser Firebase Innhold</h1>
          
          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              Denne siden initialiserer all innhold i Firebase Firestore. Dette må gjøres én gang for å sette opp alle EditableText komponenter.
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Merk:</strong> Dette vil overskrive eksisterende innhold hvis det allerede finnes.
            </p>
          </div>

          <button
            onClick={handleInitialize}
            disabled={initializing}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {initializing ? 'Initialiserer...' : 'Initialiser Innhold'}
          </button>

          {status && (
            <div className={`mt-4 p-3 rounded-lg ${
              status.includes('vellykket') 
                ? 'bg-green-100 text-green-700' 
                : status.includes('Feil')
                ? 'bg-red-100 text-red-700'
                : 'bg-blue-100 text-blue-700'
            }`}>
              {status}
            </div>
          )}

          {status.includes('vellykket') && (
            <div className="mt-4">
              <button
                onClick={() => router.push('/editor')}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700"
              >
                Gå til Redigeringsside
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
