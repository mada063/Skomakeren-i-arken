"use client"

import React, { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/lib/firebase'
import { contentCache } from '@/lib/contentCache'
import { useRouter } from 'next/navigation'

interface EditableContent {
  id: string
  title: string
  content: string
  page: string
  component?: string
}

const Editor = () => {
  const [user, loading] = useAuthState(auth)
  const [contents, setContents] = useState<EditableContent[]>([])
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState('')
  const [activeTab, setActiveTab] = useState<string>('')
  const [collapsedComponents, setCollapsedComponents] = useState<Record<string, boolean>>({})
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
      // Load content from cache first
      const cachedContents = contentCache.getAll()
      
      if (cachedContents.length > 0) {
        setContents(cachedContents)
        
        // Initialize active tab and collapsed state
        const firstPage = cachedContents[0].page
        setActiveTab(firstPage)
        
        // Initialize all components as collapsed
        const componentCollapsedState: Record<string, boolean> = {}
        cachedContents.forEach((item: EditableContent) => {
          if (item.component) {
            const componentKey = `${item.page}-${item.component}`
            componentCollapsedState[componentKey] = true
          }
        })
        setCollapsedComponents(componentCollapsedState)
        return
      }

      // If cache is empty, load from Firebase
      const pages = ['home', 'sko', 'bil-nokler', 'nokler', 'skilt', 'kontakt', 'apningstider']
      const allContents: EditableContent[] = []
      
      for (const pageName of pages) {
        const pageContents = await contentCache.loadPageFromFirebase(pageName)
        allContents.push(...pageContents)
      }
      
      setContents(allContents)
      
      // Initialize active tab and collapsed state
      if (allContents.length > 0) {
        const firstPage = allContents[0].page
        setActiveTab(firstPage)
        
        // Initialize all components as collapsed
        const componentCollapsedState: Record<string, boolean> = {}
        allContents.forEach((item: EditableContent) => {
          if (item.component) {
            const componentKey = `${item.page}-${item.component}`
            componentCollapsedState[componentKey] = true
          }
        })
        setCollapsedComponents(componentCollapsedState)
      } else {
        // Initialiserer med standardinnhold
        const defaultContents: EditableContent[] = [
          // Hjemmeside-innhold - LandingHero
          {
            id: 'hero-title',
            title: 'Hero Title',
            content: 'Skomakeren i Arken',
            page: 'home',
            component: 'LandingHero'
          },
          {
            id: 'hero-location',
            title: 'Hero Location',
            content: 'Åsane senter, Bygg B',
            page: 'home',
            component: 'LandingHero'
          },
          {
            id: 'hero-contact-button',
            title: 'Hero Contact Button',
            content: 'Kontakt oss',
            page: 'home',
            component: 'LandingHero'
          },
          // Hjemmeside-innhold - HomeBreak
          {
            id: 'home-break-title',
            title: 'Home Break Title',
            content: 'Reparer i dag!',
            page: 'home',
            component: 'HomeBreak'
          },
          {
            id: 'home-break-description',
            title: 'Home Break Description',
            content: 'Kom innom oss eller kontakt oss for en gratis befaring. Noen av våre tjenester kan ta mer enn 1 dag, men de fleste kan gjøres menst du venter.',
            page: 'home',
            component: 'HomeBreak'
          },
          // Hjemmeside-innhold - HomeSection
          {
            id: 'home-section-category',
            title: 'Home Section Category',
            content: 'Kvalitet',
            page: 'home',
            component: 'HomeSection'
          },
          {
            id: 'home-section-title',
            title: 'Home Section Title',
            content: 'Din lokale reperatør',
            page: 'home',
            component: 'HomeSection'
          },
          {
            id: 'home-section-description',
            title: 'Home Section Description',
            content: 'Hos oss er vår spesialitet sko, vi tilbyr også tjenester som nøkkelreperasjon og kopiering, slik at du aldri mister tilgang til tingene dine! Vi tilbyr også skiltlaging.',
            page: 'home',
            component: 'HomeSection'
          },
          {
            id: 'home-section-shoes-title',
            title: 'Home Section Shoes Title',
            content: 'Ekspert skoreparasjon',
            page: 'home',
            component: 'HomeSection'
          },
          {
            id: 'home-section-shoes-description',
            title: 'Home Section Shoes Description',
            content: 'Få nytt liv i skoene dine med vår ekspertise.',
            page: 'home',
            component: 'HomeSection'
          },
          {
            id: 'home-section-shoes-button',
            title: 'Home Section Shoes Button',
            content: 'Skoreparasjon',
            page: 'home',
            component: 'HomeSection'
          },
          {
            id: 'home-section-car-title',
            title: 'Home Section Car Title',
            content: 'Bilnøkler',
            page: 'home',
            component: 'HomeSection'
          },
          {
            id: 'home-section-car-description',
            title: 'Home Section Car Description',
            content: 'Har du mistet nøklene dine? Vi kan hjelpe deg med å lage nye.',
            page: 'home',
            component: 'HomeSection'
          },
          {
            id: 'home-section-car-button',
            title: 'Home Section Car Button',
            content: 'Bilnøkler',
            page: 'home',
            component: 'HomeSection'
          },
          {
            id: 'home-section-keys-title',
            title: 'Home Section Keys Title',
            content: 'Nøkler',
            page: 'home',
            component: 'HomeSection'
          },
          {
            id: 'home-section-keys-description',
            title: 'Home Section Keys Description',
            content: 'Vi tilbyr nøkkelkopiering og reparasjon for alle typer nøkler.',
            page: 'home',
            component: 'HomeSection'
          },
          {
            id: 'home-section-keys-button',
            title: 'Home Section Keys Button',
            content: 'Nøkler',
            page: 'home',
            component: 'HomeSection'
          },
          {
            id: 'home-section-signs-title',
            title: 'Home Section Signs Title',
            content: 'Skiltlaging',
            page: 'home',
            component: 'HomeSection'
          },
          {
            id: 'home-section-signs-description',
            title: 'Home Section Signs Description',
            content: 'Spesialtilpassede skilt for ditt behov. Vi graverer på metall.',
            page: 'home',
            component: 'HomeSection'
          },
          {
            id: 'home-section-signs-button',
            title: 'Home Section Signs Button',
            content: 'Skiltlaging',
            page: 'home',
            component: 'HomeSection'
          },
          // Hjemmeside-innhold - WhoHome
          {
            id: 'who-title',
            title: 'Who Title',
            content: 'Hvem er vi',
            page: 'home',
            component: 'WhoHome'
          },
          {
            id: 'who-description',
            title: 'Who Description',
            content: 'Bedriften eies og driftes av Shukri Helshani',
            page: 'home',
            component: 'WhoHome'
          },
          // Hjemmeside-innhold - InfoSection
          {
            id: 'info-title',
            title: 'Info Title',
            content: 'Hvorfor oss?',
            page: 'home',
            component: 'InfoSection'
          },
          {
            id: 'info-description',
            title: 'Info Description',
            content: 'Eksempeltekst pioakpdsofakpsdfkoaspdo aspdfko aspdofk pasddkofpo ooasdpfasdof osdodaofoasodfo oooo  oosam,mvb bsåp,åpqdlksdv naldskmvåwqåpåf åpsfåasdckmavsdvpaom',
            page: 'home',
            component: 'InfoSection'
          },
          {
            id: 'info-contact-button',
            title: 'Info Contact Button',
            content: 'Kontakt oss',
            page: 'home',
            component: 'InfoSection'
          },
          // Sko-side innhold - SkoLanding
          {
            id: 'sko-category',
            title: 'Sko Category',
            content: 'Skoreperasjon',
            page: 'sko',
            component: 'SkoLanding'
          },
          {
            id: 'sko-landing-title',
            title: 'Sko Landing Title',
            content: 'Ekspert skoreparasjon',
            page: 'sko',
            component: 'SkoLanding'
          },
          {
            id: 'sko-landing-heading',
            title: 'Sko Landing Heading',
            content: 'Reparer skoene dine profesjonelt',
            page: 'sko',
            component: 'SkoLanding'
          },
          {
            id: 'sko-landing-subheading',
            title: 'Sko Landing Subheading',
            content: 'Vi tilbyr førsteklasses skoreparasjon for alle typer sko. Bærekraftig, raskt og pålitelig.',
            page: 'sko',
            component: 'SkoLanding'
          },
          // Sko-side innhold - ShoeService
          {
            id: 'shoe-service-title',
            title: 'Shoe Service Title',
            content: 'Våre tjenester',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-1-name',
            title: 'Shoe Service 1 Name',
            content: 'Flikk (hælsåling)',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-1-price',
            title: 'Shoe Service 1 Price',
            content: '350,- kr',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-2-name',
            title: 'Shoe Service 2 Name',
            content: 'Såling (halvsåling)',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-2-price',
            title: 'Shoe Service 2 Price',
            content: '400,- kr',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-3-name',
            title: 'Shoe Service 3 Name',
            content: 'Såling + flikk',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-3-price',
            title: 'Shoe Service 3 Price',
            content: '650,- kr',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-4-name',
            title: 'Shoe Service 4 Name',
            content: 'Typpesåling (1/4 såling)',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-4-price',
            title: 'Shoe Service 4 Price',
            content: '350,- kr',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-5-name',
            title: 'Shoe Service 5 Name',
            content: 'Vibram flikk',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-5-price',
            title: 'Shoe Service 5 Price',
            content: '400,- kr',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-6-name',
            title: 'Shoe Service 6 Name',
            content: 'Vibram såling',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-6-price',
            title: 'Shoe Service 6 Price',
            content: '470,- kr',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-7-name',
            title: 'Shoe Service 7 Name',
            content: 'Vibram såling + flikk',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-7-price',
            title: 'Shoe Service 7 Price',
            content: '770,- kr',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-8-name',
            title: 'Shoe Service 8 Name',
            content: 'Helsåling',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-8-price',
            title: 'Shoe Service 8 Price',
            content: '650,- kr',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-9-name',
            title: 'Shoe Service 9 Name',
            content: 'Flikk med lær',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-9-price',
            title: 'Shoe Service 9 Price',
            content: '400,- kr',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-10-name',
            title: 'Shoe Service 10 Name',
            content: 'Såling med lær',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-10-price',
            title: 'Shoe Service 10 Price',
            content: '470,- kr',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-11-name',
            title: 'Shoe Service 11 Name',
            content: 'Flikk + såling med lær',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-11-price',
            title: 'Shoe Service 11 Price',
            content: '700,- kr',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-12-name',
            title: 'Shoe Service 12 Name',
            content: 'Grimme rep (sålekant)',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-12-price',
            title: 'Shoe Service 12 Price',
            content: '300,- kr',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-13-name',
            title: 'Shoe Service 13 Name',
            content: 'Hælfesting',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-13-price',
            title: 'Shoe Service 13 Price',
            content: '250,- kr',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-14-name',
            title: 'Shoe Service 14 Name',
            content: 'Ny gelenk plate',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-14-price',
            title: 'Shoe Service 14 Price',
            content: '300,- kr',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-15-name',
            title: 'Shoe Service 15 Name',
            content: 'Liming av løse såler',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-15-price',
            title: 'Shoe Service 15 Price',
            content: 'Må se skoen',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-16-name',
            title: 'Shoe Service 16 Name',
            content: 'Mokkasinsøm',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-16-price',
            title: 'Shoe Service 16 Price',
            content: '250,- kr',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-17-name',
            title: 'Shoe Service 17 Name',
            content: 'Hælkappe',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-17-price',
            title: 'Shoe Service 17 Price',
            content: '300,- kr',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-18-name',
            title: 'Shoe Service 18 Name',
            content: 'Blokking av sko',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-18-price',
            title: 'Shoe Service 18 Price',
            content: '200,- kr',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-19-name',
            title: 'Shoe Service 19 Name',
            content: 'Glidelås skinn jakke',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-19-price',
            title: 'Shoe Service 19 Price',
            content: '700,- kr',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-20-name',
            title: 'Shoe Service 20 Name',
            content: 'Glidelås støvleter',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-20-price',
            title: 'Shoe Service 20 Price',
            content: '450,- kr',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-21-name',
            title: 'Shoe Service 21 Name',
            content: 'Reparasjon av glidelås',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-21-price',
            title: 'Shoe Service 21 Price',
            content: '200,- kr',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-22-name',
            title: 'Shoe Service 22 Name',
            content: 'Sy merker på vest/jakke',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-22-price',
            title: 'Shoe Service 22 Price',
            content: '450,- kr',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-23-name',
            title: 'Shoe Service 23 Name',
            content: 'Ny bukse knapp',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-23-price',
            title: 'Shoe Service 23 Price',
            content: '100,- kr',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-24-name',
            title: 'Shoe Service 24 Name',
            content: 'Lapping av skinn',
            page: 'sko',
            component: 'ShoeService'
          },
          {
            id: 'shoe-service-24-price',
            title: 'Shoe Service 24 Price',
            content: '200,- kr',
            page: 'sko',
            component: 'ShoeService'
          },
          // Bil-nøkkel side innhold - BilNoklerLanding
          {
            id: 'bilnokler-category',
            title: 'Bilnøkkler Category',
            content: 'Bilnøkler',
            page: 'bil-nokler',
            component: 'BilNoklerLanding'
          },
          {
            id: 'bilnokler-landing-title',
            title: 'Bilnøkkler Landing Title',
            content: 'Bilnøkkel ekspertise',
            page: 'bil-nokler',
            component: 'BilNoklerLanding'
          },
          {
            id: 'bilnokler-landing-heading',
            title: 'Bilnøkkler Landing Heading',
            content: 'Profesjonell bilnøkkel service',
            page: 'bil-nokler',
            component: 'BilNoklerLanding'
          },
          {
            id: 'bilnokler-landing-subheading',
            title: 'Bilnøkkler Landing Subheading',
            content: 'Vi programmerer og kopierer bilnøkler for alle merker. Rask service og kvalitetsgaranti.',
            page: 'bil-nokler',
            component: 'BilNoklerLanding'
          },
          // Nøkkel side innhold - NoklerLanding
          {
            id: 'nokler-category',
            title: 'Nøkler Category',
            content: 'Nøkler',
            page: 'nokler',
            component: 'NoklerLanding'
          },
          {
            id: 'nokler-landing-title',
            title: 'Nokler Landing Title',
            content: 'Nøkkeltjenester',
            page: 'nokler',
            component: 'NoklerLanding'
          },
          {
            id: 'nokler-landing-heading',
            title: 'Nokler Landing Heading',
            content: 'Vi kopierer nøkler på stedet',
            page: 'nokler',
            component: 'NoklerLanding'
          },
          {
            id: 'nokler-landing-subheading',
            title: 'Nokler Landing Subheading',
            content: 'Trenger du en ekstranøkkel? Vi kopierer raskt og presist med kvalitetsgaranti.',
            page: 'nokler',
            component: 'NoklerLanding'
          },
          {
            id: 'nokler-services-button',
            title: 'Nøkler Services Button',
            content: 'Se våre tjenester',
            page: 'nokler',
            component: 'NoklerLanding'
          },
          // Skilt side innhold - SkiltLanding
          {
            id: 'skilt-category',
            title: 'Skilt Category',
            content: 'Skilt',
            page: 'skilt',
            component: 'SkiltLanding'
          },
          {
            id: 'skilt-landing-title',
            title: 'Skilt Landing Title',
            content: 'Flotte skilt',
            page: 'skilt',
            component: 'SkiltLanding'
          },
          {
            id: 'skilt-landing-heading',
            title: 'Skilt Landing Heading',
            content: 'Profesjonelle skilt til alle formål',
            page: 'skilt',
            component: 'SkiltLanding'
          },
          {
            id: 'skilt-landing-subheading',
            title: 'Skilt Landing Subheading',
            content: 'Bestill dørskilt, navneskilt og kontorskilt med rask levering og høy kvalitet. Vi lager blant annet postkasseskilt, dørskilt, navneskilt, hundemerker, hestegrimeskilt i plast messing og aluminium',
            page: 'skilt',
            component: 'SkiltLanding'
          },
          {
            id: 'skilt-contact-button',
            title: 'Skilt Contact Button',
            content: 'Kontakt oss',
            page: 'skilt',
            component: 'SkiltLanding'
          },
          // Kontakt side innhold - ContactLanding
          {
            id: 'contact-category',
            title: 'Contact Category',
            content: 'Lokalt',
            page: 'kontakt',
            component: 'ContactLanding'
          },
          {
            id: 'contact-title',
            title: 'Contact Title',
            content: 'Kontakt oss',
            page: 'kontakt',
            component: 'ContactLanding'
          },
          {
            id: 'contact-description',
            title: 'Contact Description',
            content: 'Vi setter stor pris på at du ønsker å komme i kontakt med oss! Enten du har spørsmål, tilbakemeldinger, ønsker å samarveide, eller trenger hjelp med en tjeneste eller et produkt, står vi klare til å hjelpe deg',
            page: 'kontakt',
            component: 'ContactLanding'
          },
          {
            id: 'contact-phone-heading',
            title: 'Contact Phone Heading',
            content: 'Du kan nå oss på nummeret vårt:',
            page: 'kontakt',
            component: 'ContactLanding'
          },
          {
            id: 'contact-phone-number',
            title: 'Contact Phone Number',
            content: '+47 468 39 387',
            page: 'kontakt',
            component: 'ContactLanding'
          },
          {
            id: 'contact-email-heading',
            title: 'Contact Email Heading',
            content: 'Du kan også nå oss på eposten vår:',
            page: 'kontakt',
            component: 'ContactLanding'
          },
          {
            id: 'contact-email-address',
            title: 'Contact Email Address',
            content: 'shukri9@hotmail.com',
            page: 'kontakt',
            component: 'ContactLanding'
          },
          // Åpningstider side innhold - Openings
          {
            id: 'openings-title',
            title: 'Openings Title',
            content: 'Åpningstider',
            page: 'apningstider',
            component: 'Openings'
          },
          {
            id: 'openings-day-1',
            title: 'Openings Day 1',
            content: 'Mandag',
            page: 'apningstider',
            component: 'Openings'
          },
          {
            id: 'openings-time-1',
            title: 'Openings Time 1',
            content: '10:00–21:00',
            page: 'apningstider',
            component: 'Openings'
          },
          {
            id: 'openings-day-2',
            title: 'Openings Day 2',
            content: 'Tirsdag',
            page: 'apningstider',
            component: 'Openings'
          },
          {
            id: 'openings-time-2',
            title: 'Openings Time 2',
            content: '10:00–21:00',
            page: 'apningstider',
            component: 'Openings'
          },
          {
            id: 'openings-day-3',
            title: 'Openings Day 3',
            content: 'Onsdag',
            page: 'apningstider',
            component: 'Openings'
          },
          {
            id: 'openings-time-3',
            title: 'Openings Time 3',
            content: '10:00–21:00',
            page: 'apningstider',
            component: 'Openings'
          },
          {
            id: 'openings-day-4',
            title: 'Openings Day 4',
            content: 'Torsdag',
            page: 'apningstider',
            component: 'Openings'
          },
          {
            id: 'openings-time-4',
            title: 'Openings Time 4',
            content: '10:00–21:00',
            page: 'apningstider',
            component: 'Openings'
          },
          {
            id: 'openings-day-5',
            title: 'Openings Day 5',
            content: 'Fredag',
            page: 'apningstider',
            component: 'Openings'
          },
          {
            id: 'openings-time-5',
            title: 'Openings Time 5',
            content: '10:00–21:00',
            page: 'apningstider',
            component: 'Openings'
          },
          {
            id: 'openings-day-6',
            title: 'Openings Day 6',
            content: 'Lørdag',
            page: 'apningstider',
            component: 'Openings'
          },
          {
            id: 'openings-time-6',
            title: 'Openings Time 6',
            content: '10:00–21:00',
            page: 'apningstider',
            component: 'Openings'
          },
          {
            id: 'openings-day-7',
            title: 'Openings Day 7',
            content: 'Søndag',
            page: 'apningstider',
            component: 'Openings'
          },
          {
            id: 'openings-time-7',
            title: 'Openings Time 7',
            content: '10:00–21:00',
            page: 'apningstider',
            component: 'Openings'
          }
        ]
        setContents(defaultContents)
        
        // Initialize active tab and collapsed state for default content
        if (defaultContents.length > 0) {
          const firstPage = defaultContents[0].page
          setActiveTab(firstPage)
          
          // Initialize all components as collapsed
          const componentCollapsedState: Record<string, boolean> = {}
          defaultContents.forEach((item: EditableContent) => {
            if (item.component) {
              const componentKey = `${item.page}-${item.component}`
              componentCollapsedState[componentKey] = true
            }
          })
          setCollapsedComponents(componentCollapsedState)
        }
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

  const handleSaveItem = async (item: EditableContent) => {
    if (!user) return
    
    try {
      // Update cache immediately (instant UI update)
      const contentItem = {
        id: item.id,
        title: item.title,
        content: item.content,
        page: item.page,
        lastUpdated: new Date(),
        ...(item.component && { component: item.component })
      }
      
      contentCache.set(item.id, contentItem)
      
      setSaveStatus(`${item.title} lagret!`)
      setTimeout(() => setSaveStatus(''), 2000)
    } catch (error) {
      console.error('Error saving item:', error)
      setSaveStatus(`Feil ved lagring av ${item.title}`)
      setTimeout(() => setSaveStatus(''), 3000)
    }
  }

  const toggleComponentCollapse = (page: string, component: string) => {
    const componentKey = `${page}-${component}`
    setCollapsedComponents(prev => ({
      ...prev,
      [componentKey]: !prev[componentKey]
    }))
  }

  const handleSave = async () => {
    if (!user) return
    
    setSaving(true)
    setSaveStatus('')
    
    try {
      // Force save all unsaved changes to Firebase
      await contentCache.forceSaveAll()
      
      setSaveStatus('Alle endringer lagret til Firebase!')
      setTimeout(() => setSaveStatus(''), 3000)
    } catch (error) {
      console.error('Error saving content:', error)
      setSaveStatus('Feil ved lagring til Firebase')
    } finally {
      setSaving(false)
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
    <div className="min-h-screen bg-custom-lightblue py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="text-center">
            <h1 className="font-cormorant text-4xl font-semibold text-gray-900 mb-2">Innholdsredigerer</h1>
            <p className="font-inter text-gray-600 mb-4">
                Logget inn som: {user.email}
              </p>
                             <button
                 onClick={handleSave}
                 disabled={saving}
                 className="bg-custom-blue text-white px-6 py-3 rounded-lg transition-all duration-300 hover:bg-opacity-80 hover:scale-105 hover:shadow-lg inline-block font-inter font-medium disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 {saving ? 'Lagrer til Firebase...' : 'Lagre alle til Firebase'}
               </button>
          </div>
          
          {saveStatus && (
            <div className={`mt-4 p-3 rounded-lg text-center ${
              saveStatus.includes('Feil') 
                ? 'bg-red-100 text-red-700' 
                : 'bg-green-100 text-green-700'
            }`}>
              {saveStatus}
            </div>
          )}
        </div>

        {/* Innholdsredigerer */}
        <div className="bg-white rounded-lg shadow-sm">
          {(() => {
            // Group contents by page
            const groupedContents = contents.reduce((acc, item) => {
              if (!acc[item.page]) {
                acc[item.page] = []
              }
              acc[item.page].push(item)
              return acc
            }, {} as Record<string, EditableContent[]>)

            const pages = Object.keys(groupedContents)
            const pageNames: Record<string, string> = {
              'home': 'Hjemmeside',
              'sko': 'Sko',
              'bil-nokler': 'Bilnøkler',
              'nokler': 'Nøkler',
              'skilt': 'Skilt',
              'kontakt': 'Kontakt',
              'apningstider': 'Åpningstider'
            }

            return (
              <>
                {/* Faner */}
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex space-x-8 px-6">
                    {pages.map((page) => (
                      <button
                        key={page}
                        onClick={() => setActiveTab(page)}
                        className={`py-4 px-1 border-b-2 font-inter font-medium text-sm transition-colors ${
                          activeTab === page
                            ? 'border-custom-blue text-gray-900'
                            : 'border-transparent text-gray-500 hover:text-custom-blue hover:border-custom-blue'
                        }`}
                      >
                        {pageNames[page] || page}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Faneinnhold */}
                <div className="p-6">
                  {activeTab && groupedContents[activeTab] && (() => {
                    const pageContents = groupedContents[activeTab]
                    
                    // Group page contents by component
                    const componentGroups = pageContents.reduce((acc, item) => {
                      const component = item.component || 'General'
                      if (!acc[component]) {
                        acc[component] = []
                      }
                      acc[component].push(item)
                      return acc
                    }, {} as Record<string, EditableContent[]>)

                    return Object.entries(componentGroups).map(([component, componentContents]) => {
                      const componentKey = `${activeTab}-${component}`
                      const isCollapsed = collapsedComponents[componentKey] ?? true

                      return (
                        <div key={component} className="mb-6">
                          <button
                            onClick={() => toggleComponentCollapse(activeTab, component)}
                            className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <h3 className="text-lg font-semibold text-gray-700 font-inter">
                              {component}
                            </h3>
                            <svg
                              className={`w-5 h-5 transform transition-transform ${
                                isCollapsed ? 'rotate-0' : 'rotate-180'
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          
                          {!isCollapsed && (
                            <div className="mt-4 space-y-4">
                                                             {componentContents.map((item) => (
                                 <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                                   <div className="mb-3">
                                     <h4 className="text-md font-medium text-gray-800 font-inter">{item.title}</h4>
                                     <p className="text-xs text-gray-500 font-inter">ID: {item.id}</p>
              </div>
                                   <div className="relative">
              <textarea
                value={item.content}
                onChange={(e) => handleContentChange(item.id, e.target.value)}
                                       className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none text-sm font-inter pr-20"
                placeholder="Skriv innhold her..."
              />
                                     <button
                                       onClick={() => handleSaveItem(item)}
                                       className="absolute top-2 right-2 px-3 py-1 bg-custom-blue text-white text-xs rounded hover:bg-opacity-80 transition-colors font-inter"
                                       title="Lagre endringer"
                                     >
                                       Lagre
                                     </button>
                                   </div>
            </div>
          ))}
                            </div>
                          )}
                        </div>
                      )
                    })
                  })()}
                </div>
              </>
            )
          })()}
        </div>
      </div>
    </div>
  )
}

export default Editor 