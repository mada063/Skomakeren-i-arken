// Content cache for instant updates
interface CachedContent {
  id: string
  title: string
  content: string
  page: string
  component?: string
  lastUpdated: Date
  isDirty?: boolean // Has unsaved changes
}

class ContentCache {
  private cache: Map<string, CachedContent> = new Map()
  private saveQueue: Set<string> = new Set()
  private saveInProgress: Set<string> = new Set()

  // Get content from cache
  get(id: string): CachedContent | null {
    return this.cache.get(id) || null
  }

  // Set content in cache (instant update)
  set(id: string, content: CachedContent): void {
    this.cache.set(id, {
      ...content,
      lastUpdated: new Date(),
      isDirty: true
    })
    
    // Add to save queue if not already saving
    if (!this.saveInProgress.has(id)) {
      this.saveQueue.add(id)
      this.processSaveQueue()
    }
  }

  // Load all content for a page from Firebase and cache it
  async loadPageFromFirebase(page: string): Promise<CachedContent[]> {
    const { doc, getDoc } = await import('firebase/firestore')
    const { db } = await import('./firebase')
    
    try {
      const contentDoc = doc(db, 'content', page)
      const contentSnap = await getDoc(contentDoc)
      
      if (contentSnap.exists()) {
        const data = contentSnap.data()
        const pageContents = data.contents || []
        
        // Cache all content for this page
        pageContents.forEach((item: any) => {
          this.cache.set(item.id, {
            ...item,
            lastUpdated: new Date(),
            isDirty: false
          })
        })
        
        return pageContents
      }
      return []
    } catch (error) {
      console.error('Error loading page from Firebase:', error)
      return []
    }
  }

  // Process save queue (background saves)
  private async processSaveQueue(): Promise<void> {
    if (this.saveQueue.size === 0) return

    const { doc, setDoc } = await import('firebase/firestore')
    const { db } = await import('./firebase')
    const { auth } = await import('./firebase')

    // Get items to save
    const itemsToSave = Array.from(this.saveQueue)
    this.saveQueue.clear()

    // Mark as saving
    itemsToSave.forEach(id => this.saveInProgress.add(id))

    try {
      // Group by page
      const pageGroups: { [page: string]: CachedContent[] } = {}
      
      itemsToSave.forEach(id => {
        const item = this.cache.get(id)
        if (item) {
          if (!pageGroups[item.page]) {
            pageGroups[item.page] = []
          }
          pageGroups[item.page].push(item)
        }
      })

      // Save each page
      const savePromises = Object.entries(pageGroups).map(async ([pageName, pageContents]) => {
        const contentDoc = doc(db, 'content', pageName)
        
        // Filter out undefined values
        const cleanContents = pageContents.map(item => {
          const cleanItem: any = {
            id: item.id,
            title: item.title,
            content: item.content,
            page: item.page
          }
          if (item.component) {
            cleanItem.component = item.component
          }
          return cleanItem
        })
        
        await setDoc(contentDoc, {
          contents: cleanContents,
          lastUpdated: new Date(),
          updatedBy: auth.currentUser?.email,
          page: pageName,
          initialized: true
        }, { merge: true })
      })

      await Promise.all(savePromises)

      // Mark as saved
      itemsToSave.forEach(id => {
        const item = this.cache.get(id)
        if (item) {
          this.cache.set(id, { ...item, isDirty: false })
        }
        this.saveInProgress.delete(id)
      })

    } catch (error) {
      console.error('Error saving to Firebase:', error)
      
      // Re-add failed items to queue
      itemsToSave.forEach(id => {
        this.saveQueue.add(id)
        this.saveInProgress.delete(id)
      })
    }

    // Process any new items that were added while saving
    if (this.saveQueue.size > 0) {
      setTimeout(() => this.processSaveQueue(), 1000)
    }
  }

  // Get all cached content
  getAll(): CachedContent[] {
    return Array.from(this.cache.values())
  }

  // Get content for a specific page
  getPageContent(page: string): CachedContent[] {
    return Array.from(this.cache.values()).filter(item => item.page === page)
  }

  // Check if there are unsaved changes
  hasUnsavedChanges(): boolean {
    return Array.from(this.cache.values()).some(item => item.isDirty)
  }

  // Force save all dirty items
  async forceSaveAll(): Promise<void> {
    const dirtyItems = Array.from(this.cache.values())
      .filter(item => item.isDirty)
      .map(item => item.id)
    
    dirtyItems.forEach(id => this.saveQueue.add(id))
    await this.processSaveQueue()
  }
}

// Export singleton instance
export const contentCache = new ContentCache()
