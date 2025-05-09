# Anime Search App 🎌

This is a mini project built for the Frontend Developer application at **YoPrint**.  
The goal of this app is to search for anime using the [Jikan API](https://docs.api.jikan.moe/) and display the results with pagination and detail pages.

## 📸 Screenshots

> Add screenshots or a GIF here if you want to show off your UI.
![image](https://github.com/user-attachments/assets/78c4ff6e-e8b2-4a9d-bd2f-ac1e5e38c3d0)


## 🧩 Features

- 🔍 Instant anime search with **debounced input**
- 📄 Anime **details page**
- 📚 **Pagination** with server-side data
- ⚡ Built using **React 18**, **TypeScript**, and **Tailwind CSS**
- 🎨 Clean and responsive UI
- 🚦 Error and loading state handling
- ✅ Follows modern React standards with hooks and functional components

## 🔧 Tech Stack

- React 18
- TypeScript (optional, included here)
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Jikan REST API (v4)

## 📁 Project Structure
src/
├── components/ # Reusable UI components
├── pages/ # Page components (Home, Details)
├── api/ # API request functions
├── types/ # Type definitions
├── App.tsx # Routing logic
└── main.tsx # App entry point

## ⚙️ Setup & Run Locally

```bash
git clone https://github.com/Djuraboyev/anime-search-app.git
cd anime-search-app
npm install
npm run dev
