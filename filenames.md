# Project Documentation

## Project Overview
A modern landing page for The Idea Folk built with React, TypeScript, Vite, and shadcn/ui. Features a dark theme, modern animations, and interactive components.

## Tech Stack
- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.1
- **Language**: TypeScript 5.5.3
- **UI Framework**: shadcn/ui with Tailwind CSS
- **Animation**: Framer Motion
- **Routing**: React Router DOM
- **Form Handling**: React Hook Form
- **3D Graphics**: Three.js with @react-three/fiber
- **State Management**: React Query
- **Code Quality**: ESLint, TypeScript-ESLint

## File Structure

### Root Configuration Files
- `package.json` - Project dependencies and scripts
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` - TypeScript configuration
- `vite.config.ts` - Vite configuration with plugins and aliases
- `tailwind.config.ts` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `eslint.config.js` - ESLint configuration
- `components.json` - shadcn/ui configuration

### Source Files (`/src`)

#### Core Files
- `main.tsx` - Application entry point
- `App.tsx` - Root component with routing and providers
- `index.css` - Global styles and Tailwind imports

#### Pages (`/src/pages`)
- `Index.tsx` - Homepage component
- `NotFound.tsx` - 404 error page

#### Components (`/src/components`)

##### Layout Components (`/layout`)
- `Navbar.tsx` - Main navigation component
- `Footer.tsx` - Site footer component

##### Section Components (`/sections`)
- `Hero.tsx` - Hero section with animations
- `Services.tsx` - Services showcase
- `About.tsx` - Team information
- `CaseStudies.tsx` - Portfolio showcase
- `Calculator.tsx` - Project cost calculator
- `CalculatorModal.tsx` - Modal wrapper for calculator
- `Contact.tsx` - Contact section
- `FAQ.tsx` - Frequently asked questions
- `InquiryForm.tsx` - Contact form component

##### Animation Components (`/animations`)
- `ButtonEffect.tsx` - Button hover animations
- `CursorEffect.tsx` - Custom cursor effects
- `SciFiText.tsx` - Text scramble animation
- `ScrollProgress.tsx` - Scroll progress indicator

##### UI Components (`/ui`)
Extensive collection of shadcn/ui components including:
- `button.tsx` - Button component
- `dialog.tsx` - Modal dialogs
- `select.tsx` - Select dropdowns
- `toast.tsx` - Toast notifications
- And many more base components

#### Hooks (`/hooks`)
- `use-mobile.tsx` - Mobile detection hook
- `use-toast.ts` - Toast notification hook

#### Utilities (`/lib`)
- `utils.ts` - Utility functions including className merging

### Public Assets (`/public`)
- `the-idea-folk-logo.png` - Company logo
- `spark-icon.svg` - Favicon

## Key Features

### UI/UX
- Dark theme with neon accents
- Interactive animations
- Responsive design
- Custom cursor effects
- Scroll progress indicator

### Components
- Multi-step cost calculator
- Case study portfolio
- Contact form
- Service pricing cards
- Team showcase

### Performance
- Code splitting with React Router
- Optimized images
- Efficient animations with Framer Motion

## Dependencies

### Core Dependencies
- React and React DOM
- TypeScript
- Vite

### UI Dependencies
- Tailwind CSS
- shadcn/ui components
- Radix UI primitives
- Framer Motion
- Lucide React icons

### Form and Data
- React Hook Form
- Zod validation
- TanStack Query

### Development Dependencies
- ESLint
- TypeScript ESLint
- Various Tailwind plugins

## Scripts
- `dev` - Start development server
- `build` - Production build
- `build:dev` - Development build
- `lint` - Run ESLint
- `preview` - Preview production build