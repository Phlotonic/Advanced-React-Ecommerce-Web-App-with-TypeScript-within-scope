# Environment Variables Documentation

This file documents the environment variables used in the React E-commerce application
for Firebase configuration. These variables should be set in your `.env.local` file
in the project root directory.

## Firebase Configuration Variables

### VITE_FIREBASE_API_KEY
- **Purpose**: Firebase Web API Key for client authentication
- **Type**: String
- **Required**: Yes
- **Description**: This key is used by the Firebase SDK to authenticate requests from your web application to Firebase services. It's safe to expose this in client-side code as it's designed for public use.

### VITE_FIREBASE_AUTH_DOMAIN  
- **Purpose**: Firebase Authentication domain
- **Type**: String (URL format)
- **Required**: Yes
- **Description**: The domain used by Firebase Authentication for hosting the authentication UI and handling auth callbacks. Usually in the format `your-project-id.firebaseapp.com`

### VITE_FIREBASE_PROJECT_ID
- **Purpose**: Unique Firebase project identifier
- **Type**: String
- **Required**: Yes
- **Description**: The unique identifier for your Firebase project. This is used to route requests to the correct Firebase project and its associated resources.

### VITE_FIREBASE_STORAGE_BUCKET
- **Purpose**: Firebase Storage bucket URL
- **Type**: String (URL format)  
- **Required**: Yes
- **Description**: The URL of the Firebase Storage bucket where files and media assets are stored. Usually in the format `your-project-id.appspot.com`

### VITE_FIREBASE_MESSAGING_SENDER_ID
- **Purpose**: Firebase Cloud Messaging sender ID
- **Type**: String (numeric)
- **Required**: Yes
- **Description**: Used for Firebase Cloud Messaging (FCM) to send push notifications to your application users.

### VITE_FIREBASE_APP_ID
- **Purpose**: Firebase application identifier  
- **Type**: String
- **Required**: Yes
- **Description**: A unique identifier for your Firebase web application, used by Firebase Analytics and other services to identify your specific app.

## Security Notes

- All variables are prefixed with `VITE_` to make them available in the Vite build process
- These values are embedded in the client-side bundle and are publicly visible
- Firebase API keys are designed to be public and are restricted by Firebase security rules
- Never put sensitive server-side secrets in these environment variables
- Always configure proper Firebase Security Rules to protect your data

## Setup Instructions

1. Create a `.env.local` file in your project root directory
2. Copy the template from `.env.example` (if available)
3. Replace the placeholder values with your actual Firebase configuration
4. Restart your development server after making changes
5. Ensure `.env.local` is in your `.gitignore` file to prevent accidental commits

## Example .env.local structure:
```
VITE_FIREBASE_API_KEY="your-api-key-here"
VITE_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="your-project-id"
VITE_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"
VITE_FIREBASE_MESSAGING_SENDER_ID="123456789012"
VITE_FIREBASE_APP_ID="1:123456789012:web:abcdef123456"
```