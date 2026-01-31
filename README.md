# [`autobutler.org`](https://autobutler.org)

## Setup

**Note:** This project requires Node.js and npm. Bun is not compatible with this setup.

### Using NVM (Recommended)

```bash
nvm install
nvm use
npm install
```

### Alternative Setup

If not using NVM:

```bash
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run generate
npx serve .output/public
```
