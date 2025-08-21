# Setup Guide

## Firebase Configuration

To use the authentication and content editing features, you need to set up Firebase:

1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Authentication (Email/Password)
3. Enable Firestore Database
4. Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
```

5. Create a user account in Firebase Authentication
6. Set up Firestore security rules to allow authenticated users to read/write

## Features Implemented

### 1. Header
- ✅ Logo and hamburger menu are black on all pages except home page
- ✅ Logo is clickable and takes users to home page
- ✅ Hamburger menu closes when changing pages

### 2. Sko Page
- ✅ Services list is now 50% viewport width

### 3. Bilnokler Page
- ✅ Created bilnokler page with same style as Sko page
- ✅ Added search function for services
- ✅ Ready for database integration

### 4. Login
- ✅ Created login page with Firebase authentication
- ✅ Users can log in with email/password

### 5. Editor
- ✅ Created editor page accessible after login
- ✅ Text elements are editable when logged in
- ✅ Changes save to Firebase database
- ✅ EditableText component for inline editing

## Usage

1. Start the development server: `npm run dev`
2. Navigate to `/login` to access the admin panel
3. Log in with your Firebase credentials
4. Click on any text element to edit it inline
5. Changes are automatically saved to Firebase

## Database Structure

The Firestore database uses the following structure:

```
content/
  main/
    contents: [
      {
        id: string,
        title: string,
        content: string,
        page: string
      }
    ]
    lastUpdated: timestamp,
    updatedBy: string
``` 