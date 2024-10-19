🎬 Movie Search Application
A modern, responsive movie search application built with Next.js 13+, featuring server-side rendering, RTL support, dark mode, and pagination.

✨ Features

🎯 Server-side rendering (SSR) for optimal performance
🌓 Dark mode/light mode support
🌐 Internationalization (i18n) with RTL language support
📱 Responsive design for all devices
🔍 Real-time search with debouncing
📄 Pagination for better data handling
✅ Comprehensive test coverage
🎨 Modern UI with Tailwind CSS and shadcn/ui

🛠️ Technologies Used

Framework: Next.js 14
Language: TypeScript
State Management: Redux Toolkit
Styling:

Tailwind CSS
shadcn/ui components
Framer Motion for animations

Testing:

Jest
React Testing Library

Internationalization: next-intl
API: TMDB (The Movie Database)
Others:

ESLint
Prettier

📋 Prerequisites
Before you begin, ensure you have:

Node.js 18.0 or later
npm or yarn
A TMDB API key (Get one here)

🚀 Getting Started

1. Clone the repository

git clone git@github.com:supunishara/arimactest.git
cd arimactest

2. Install dependencies

npm install

# or

yarn install

3. Environment Setup
   Create a .env.local file in the root directory:

NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here

4. Run the development server

npm run dev

# or

yarn dev

Open http://localhost:3000 in your browser.

🧪 Running Tests

# Run all tests

npm test

# Run tests in watch mode

npm run test:watch

# Generate coverage report

npm run test:coverage

📁 Project Structure

movie-search-app/
├── app/
└── [locale]/
│ ├── layout.tsx
│ └── page.tsx
[movie]/
└── page.tsx
├── components/
├── ui(Shadcn components)  
 ├── HomePage.tsx
├── language-toggle.tsx
├── MovieCard.tsx
├── PageTransition.tsx
├── SearchBar.tsx
├── theme-provider.tsx
└── theme-toggle
├── hooks/
├──useDebounce.ts
├── lib/
├── [features]
├── movieDetailSlice.ts
├── moviesSlice
├── themeSlice.ts
├── useDebounce.ts
├── api.ts
├── providers.tsx
└── store.ts
└── utils.ts
├── messages/
│ ├── en.json
│ └── ar.json
├── public/
├── types
├── **tests**/
└── ...configuration files

🔍 Key Features Implementation
Server-Side Rendering
The application implements SSR for the initial data load, providing:

Faster initial page load
Better SEO
Improved performance

Internationalization
Supports multiple languages with:

RTL layout support
Language switching
Localized content
Persisted language preference

Theme Support
Implements a theme system with:

Light/dark mode
System preference detection
Smooth theme transitions
Persisted theme preference

Search Functionality
Features a robust search system with:

Debounced search
Real-time results
Error handling
Loading states

🔄 State Management
The application uses Redux Toolkit for state management, handling:

Movie data
Search state
Pagination
Loading states
Error handling

📱 Responsive Design
The UI is fully responsive and tested across:

Mobile devices
Tablets
Desktop screens
Different browsers

⚙️ Configuration Options
Environment Variables

NEXT_PUBLIC_TMDB_API_KEY=your_api_key
NEXT_PUBLIC_API_URL=https://api.themoviedb.org/3

Internationalization
Supported languages:

English (LTR)
Arabic (RTL)

Add more languages by:

Creating a new translation file in /messages
Adding the locale to the language toggle
Updating the middleware configuration

📜 License
This project is licensed under the MIT License - see the LICENSE.md file for details.
🙏 Acknowledgments

TMDB for the movie data API
shadcn/ui for the beautiful UI components
next-intl for internationalization support

📞 Contact
supunishara3@gmail.com
Project Link: https://github.com/supunishara/arimactest
