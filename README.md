# Zenith Inbox

An AI-powered app that automatically replies to your Shopify leads from your inbox, ensuring you never miss an opportunity.

[cloudflarebutton]

---

## Table of Contents

- [About The Project](#about-the-project)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Development](#development)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## About The Project

Zenith Inbox is an intelligent automation platform designed to capture, understand, and respond to Shopify leads from your email inbox. It connects securely to Gmail or Outlook, automatically detects lead inquiries, and uses AI to draft or send personalized replies based on your brand's voice and services.

The core workflow is designed around five key actions: **Capture** (syncing emails), **Understand** (classifying lead intent), **Reply** (composing responses), **Follow-up** (scheduling automated sequences), and **Track** (monitoring lead status). The platform features a visual scenario builder for custom automation rules, detailed analytics on response times and outcomes, and a comprehensive settings panel to fine-tune the AI's behavior, ensuring you never miss a valuable lead again.

## Key Features

- **Automated Lead Handling**: Connect your Gmail or Outlook inbox to automatically capture and respond to Shopify leads.
- **AI-Powered Replies**: Leverages AI to understand lead intent and draft personalized, on-brand replies.
- **Customizable Voice & Tone**: Define your brand's voice (Friendly, Expert, Concise) to ensure all communication is consistent.
- **Visual Automation Builder**: Create powerful, custom workflows with a node-based scenario builder.
- **Template Management**: Build and manage email templates for initial replies and multi-step follow-up sequences.
- **Inbox & Review Queue**: A smart inbox to review AI-drafted replies, approve, edit, or send them with a single click.
- **Lead Tracking**: A centralized dashboard to view all leads, their status, and conversation history.
- **Powerful Analytics**: Gain insights into response times, reply rates, and follow-up effectiveness to optimize your strategy.
- **Quick 60-Second Setup**: A guided onboarding flow to get you up and running in minutes.

## Technology Stack

This project is built with a modern, high-performance stack:

- **Frontend**:
  - [React](https://reactjs.org/)
  - [Vite](https://vitejs.dev/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Shadcn/UI](https://ui.shadcn.com/)
  - [Framer Motion](https://www.framer.com/motion/) for animations
  - [Zustand](https://zustand-demo.pmnd.rs/) for state management
  - [Lucide React](https://lucide.dev/) for icons
- **Backend**:
  - [Cloudflare Workers](https://workers.cloudflare.com/)
  - [Hono](https://hono.dev/)
  - [Cloudflare D1](https://developers.cloudflare.com/d1/) (via Durable Objects) for database
  - [Cloudflare AI](https://developers.cloudflare.com/ai/) for AI inference
- **Tooling**:
  - [TypeScript](https://www.typescriptlang.org/)
  - [Bun](https://bun.sh/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine.
- A [Cloudflare account](https://dash.cloudflare.com/sign-up).
- The [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed and authenticated.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/zenith-inbox.git
    cd zenith-inbox
    ```

2.  **Install dependencies:**
    ```sh
    bun install
    ```

### Configuration

Before running the application, you need to configure your Cloudflare environment variables.

1.  Rename `wrangler.jsonc` to `wrangler.toml` if you prefer the TOML format, or continue using `wrangler.jsonc`.
2.  Update `wrangler.jsonc` (or `wrangler.toml`) with your Cloudflare account ID.
3.  Set up the required secrets for the AI Gateway. These should **not** be committed to your repository.
    ```sh
    npx wrangler secret put CF_AI_BASE_URL
    npx wrangler secret put CF_AI_API_KEY
    ```
    Follow the prompts to enter your Cloudflare AI Gateway URL and a valid API key.

    > **IMPORTANT**: The template uses Cloudflare's AI Gateway for security and observability. You must configure a gateway and provide the URL and a token. Never expose API keys directly in client-side code.

## Development

To start the local development server, which runs both the Vite frontend and the Cloudflare Worker backend concurrently:

```sh
bun dev
```

- The frontend will be available at `http://localhost:3000`.
- The worker's API endpoints will be available at the same origin, proxied by Vite.

The application supports hot-reloading, so any changes you make to the source code in `src/` or `worker/` will be reflected instantly in your browser.

## Deployment

This project is designed for seamless deployment to Cloudflare's global network.

1.  **Build the application:**
    ```sh
    bun run build
    ```
    This command bundles the React frontend and prepares the worker script for production.

2.  **Deploy to Cloudflare:**
    ```sh
    bun run deploy
    ```
    This command will publish your application, including the frontend assets and the backend worker, to your Cloudflare account. Wrangler will provide you with the public URL upon completion.

Or deploy directly from GitHub with one click:

[cloudflarebutton]

## Project Structure

The codebase is organized into two main parts:

-   `src/`: Contains all the frontend code for the React application.
    -   `components/`: Reusable UI components, including Shadcn/UI elements.
    -   `pages/`: Top-level page components corresponding to application views.
    -   `lib/`: Utility functions and shared client-side logic.
    -   `hooks/`: Custom React hooks.
-   `worker/`: Contains all the backend logic running on Cloudflare Workers.
    -   `index.ts`: The entry point for the worker.
    -   `agent.ts`: The core `ChatAgent` Durable Object implementation.
    -   `userRoutes.ts`: Hono route definitions for the application's API.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

## License

Distributed under the MIT License. See `LICENSE` for more information.