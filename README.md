# 🌐 Next.js Multilingual RTL/LTR Web Application

[![Next.js](https://img.shields.io/badge/Next.js-14.0+-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A modern, internationalized Next.js application with full RTL (Right-to-Left) support, built with TypeScript and Tailwind CSS. This project demonstrates best practices for building multilingual web applications with seamless language switching capabilities.

## ✨ Features

- 🌍 Multilingual support with English and Arabic
- ⚡️ RTL/LTR layout switching
- 🎨 Responsive design with Tailwind CSS
- 🔄 Automatic locale detection
- 🛣️ Internationalized routing
- 🏗️ Type-safe development with TypeScript
- 🎯 SEO optimized
- 🔒 Middleware-based locale handling

## 🚀 Tech Stack

- **Framework**: [Next.js 13.5+](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Internationalization**: Built-in Next.js i18n
- **Formatting**: [Prettier](https://prettier.io/)
- **Linting**: [ESLint](https://eslint.org/)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [npm](https://www.npmjs.com/) (v8.0.0 or higher)
- [Git](https://git-scm.com/)

## 🛠️ Installation

1. Clone the repository:

```bash
git clone git@github.com:supunishara/arimactest.git
cd arimactest
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=your_TMDB_api_url_here
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   │   └──movie/[id]
            └── page.tsx
│   ├── components/
│   │   └── ui/
├── components/
├── lib/
├── hooks/
├── messages/
├── public/
├── styles/
├── types/
├── next.config.js
└── tailwind.config.js
```

## 🔧 Configuration

### Internationalization

Add new languages by updating the following files:

1. `i18n-config.ts`:

```typescript
export const i18n = {
  defaultLocale: "en",
  locales: ["en", "ar"],
} as const;
```

2. `middleware.ts`:

```typescript
const locales = ["en", "ar"];
```

### Styling

Tailwind CSS configuration can be modified in `tailwind.config.js`:

```javascript
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  // ...
};
```

## 🌐 Available Routes

- `/en/*` - English version of the site
- `/ar/*` - Arabic version of the site (RTL)

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Supun Ishara** - _Initial work_ - [YourGithub](https://github.com/supunishara)

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)

## 🤔 Support

For support, email supunishara3@gmail.com or create an issue in this repository.

---

Made with ❤️ by Supun Ishara(https://github.com/supunishara)
