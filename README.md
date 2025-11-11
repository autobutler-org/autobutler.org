# [`autobutler.org`](https://autobutler.org)

## Bun

### Setup

```bash
make setup/js
```

### Development Server

Start the development server on `http://localhost:3000`:

```bash
bun run dev
# or
make run
```

### Production

Build the application for production:

```bash
bun run generate
npx serve .output/public
```

## NVM

### Setup

```bash
nvm install
nvm use
npm install
```

### Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

### Production

Build the application for production:

```bash
npm run generate
npx serve .output/public
```
