# Soul Link - Mental Wellness Platform Setup Guide

## Overview

Soul Link is a comprehensive mental wellness platform that combines a React frontend with backend API integration for chat functionality, appointment booking, and user management.

## Project Structure

```
slf/
├── soul-linklwellness-platform/     # Main React application
│   ├── aastha/                      # Aastha AI wellness companion
│   ├── components/                  # Shared components
│   ├── pages/                      # Page components
│   └── hooks/                       # Custom React hooks
├── api/                            # Backend API handlers
├── forum.html                      # Forum page
├── auth.html                       # Authentication page
├── booking.html                    # Appointment booking
└── server.js                       # Development server
```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account
- Google Cloud Console account (for Gemini AI)
- Google Sheets API access (for appointment booking)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

1. Copy `.env.example` to `.env`
2. Fill in the required environment variables:
   - `GEMINI_API_KEY`: Get from Google AI Studio
   - `GOOGLE_CREDENTIALS`: Service account JSON for Google Sheets
   - `SPREADSHEET_ID`: Your Google Sheets ID for appointments

### 3. Supabase Database Setup

Create the following tables in your Supabase project:

#### Users Table

```sql
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Posts Table (for forum)

```sql
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  user_id UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Replies Table (for forum)

```sql
CREATE TABLE replies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  post_id UUID REFERENCES posts(id),
  user_id UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Appointments Table

```sql
CREATE TABLE appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  student_id TEXT,
  counsellor_name TEXT,
  appointment_time TIMESTAMP,
  status TEXT DEFAULT 'booked',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 4. Row Level Security (RLS)

Enable RLS on all tables and create appropriate policies:

```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Example policies (adjust as needed)
CREATE POLICY "Users can view their own data" ON users
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "Anyone can view posts" ON posts
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create posts" ON posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### 5. Development Server

```bash
# Install development dependencies
npm install express cors

# Start the development server
node server.js
```

### 6. Production Build

```bash
npm run build
```

## Features

### Frontend Features

- **React Application**: Modern React with TypeScript
- **Aastha AI Companion**: AI-powered wellness assistant
- **Forum**: Peer support community
- **Appointment Booking**: Schedule counseling sessions
- **Mood Tracking**: Personal wellness tracking
- **Diary**: Private journaling space

### Backend Features

- **Chat API**: Integration with Gemini AI
- **Authentication**: Supabase Auth
- **Database**: PostgreSQL via Supabase
- **Appointment Booking**: Google Sheets integration
- **Forum**: Real-time community features

## API Endpoints

### Chat API (`/api/chat`)

- **Method**: POST
- **Body**: `{ "message": "user message", "history": [...] }`
- **Response**: `{ "response": "AI response" }`

### Appointment Booking (`/api/book-appointment`)

- **Method**: POST
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ "student_id": "...", "counsellor_name": "...", "appointment_time": "..." }`

## Deployment

### Frontend (Vercel/Netlify)

1. Connect your repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables

### Backend (Vercel Functions)

1. Deploy API functions to Vercel
2. Update frontend API URLs
3. Configure environment variables

## Troubleshooting

### Common Issues

1. **Build Errors**: Check TypeScript configuration
2. **API Errors**: Verify environment variables
3. **Database Errors**: Check RLS policies
4. **Authentication**: Verify Supabase configuration

### Development Tips

- Use `npm run dev` for development
- Check browser console for errors
- Verify API responses in Network tab
- Test authentication flow thoroughly

## Support

For issues and questions, please check the documentation or contact the development team.
