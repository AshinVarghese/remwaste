# Skip Selection App

## Overview
This project is a React application for selecting skip hire options. It features:
- Professional, responsive UI/UX with grid and list views
- Rich filtering (on-road, heavy waste, price, size, hire period, forbidden, postcode)
- Visually distinct cards using react-icons for clear, accessible iconography
- Mobile-first design and accessibility best practices

## Approach
- **UI/UX**: All components use Tailwind CSS for consistent, scalable styling. Cards and filters are spaced and padded for clarity and touch-friendliness. The design uses gradients, bold colors, and clear focus states for accessibility.
- **Icons**: The `react-icons` library provides universally recognized icons for skip size, price, hire period, and features, making the UI intuitive for all users.
- **Filtering**: Filters are grouped in a card-like section with clear labels and toggles, supporting both desktop and mobile layouts. All filter logic is handled in the main page for performance and maintainability.
- **Responsiveness**: The layout adapts to all screen sizes, with grid/list toggles and mobile-friendly controls.
- **Code Quality**: Components are typed with TypeScript, and code is organized for maintainability and scalability.

## How to Run
1. Install dependencies (if not already):
   ```bash
   pnpm install
   pnpm add react-icons
   ```
2. Start the development server:
   ```bash
   pnpm run dev
   ```
3. Open the app in your browser at the provided local URL.

## Troubleshooting
If you see errors about missing modules (like `react-icons/fa`):
- Run the cleanup and install commands above to ensure all dependencies are present.
- Restart your development server after installing new packages.

## Customization
- To add more filters or change the UI, edit the components in `src/components/`.
- To update icons, use any icon from [react-icons](https://react-icons.github.io/react-icons/).

---
This project demonstrates best practices for modern React, TypeScript, and Tailwind CSS development in a real-world, enterprise-ready application.

