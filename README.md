# 🗨️ Chatbot Widget

This project is a self-contained chatbot widget built with **Vite**, **React**, and **TypeScript**. It is designed to run standalone in development and be embedded via an **iframe** in production, initializing securely via `postMessage`.

---

## 🚀 Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Setup Checks and Formatter

```bash
npm run prepare
```

### 3. Environment variables

add a secret key .env file in the project root:

```
VITE_SECRET_KEY=<any generated secret key>
```

### 4. Run the dev server

```
npm run dev
```

The app will be available at: http://localhost:5173

### 5. Development auto-mount

In development mode, the widget automatically mounts for easier testing. You can also simulate initialization via URL params:

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

## 🧑‍💻 Commit Message Guidelines

Standardized commit messages enhance readability and facilitate integration with tools like Jira and CI/CD pipelines.

Format: `[Type] (Brief Description)`

Allowed Types:

- `[FEAT]`: New feature
- `[FIX]`: Bug fix
- `[DOCS]`: Documentation changes
- `[STYLE]`: Code style changes (formatting, etc.)
- `[REFACTOR]`: Code restructuring without functional changes
- `[TEST]`: Adding or updating tests
- `[CHORE]`: For general tasks and housekeeping.
- `[CLEAN]`: Removing Dead Code
- `[WIP]`: Work in progress

Examples:

- [FEAT] Implemented user authentication feature
- [FIX] Resolved null pointer exception in user registration
- [DOCS] Updated installation guide with new dependencies
- [STYLE] Adjusted code indentation for better readability
- [REFACTOR] Streamlined database query logic for better performance
- [TEST] Added unit tests for the user authentication module
- [CHORE] Updated build script to use the latest dependencies
- [CLEAN] Removed obsolete utility functions
- [WIP] Working on fixing issue #123
