## Run app in development mode:

```bash
# start stripe
npm run stripe

# start prisma
npm run prisma
# if there are another web server running, then stop it
systemctl stop apache2

# start next app
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Open [http://localhost:5555](http://localhost:5555) with your browser to see the db tables.

## Next.js & Vercel resources

- [Next.js Documentation](https://nextjs.org/docs)

- [Next.js GitHub repository](https://github.com/vercel/next.js/)

- [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

- This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

- This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Prisma

### `npx prisma generate` - command to generate schema based on created models

### `npx prisma db push` - push generated schema to live db

### `npx prisma studio` - prisma studio

### `npx prisma migrate reset` - reset prisma (run `$  npx prisma db push` after reset)

### `stripe listen --forward-to localhost:3000/api/webhook` run stripe
