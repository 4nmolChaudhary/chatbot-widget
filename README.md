# Chatbot Widget (Vite + React + TypeScript)

This project is a self-contained chatbot widget built with **Vite**, **React**, and **TypeScript**. It is designed to run standalone in development and be embedded via an **iframe** in production, initializing securely via `postMessage`.

---

## 🚀 Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

add a secret key .env file in the project root:

```
VITE_SECRET_KEY=<any generated secret key>
```

### 3. Run the dev server

```
npm run dev
```

The app will be available at: http://localhost:5173

### 4. Development auto-mount

In development mode, the widget automatically mounts for easier testing.

You can also simulate initialization via URL params:

http://localhost:5173/?action=assistant:init&key=your_secret_key

## 🧠 Initialization Logic

In production, the widget does not render automatically. It only mounts after receiving the following message:

```
window.postMessage({
  action: 'assistant:init',
  key: VITE_SECRET_KEY
})
```

If the key matches, React mounts the app and notifies the parent window that it is ready.

