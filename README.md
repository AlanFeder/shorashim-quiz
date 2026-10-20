# shorashim-quiz

The existing static page now serves its JavaScript and compiled Tailwind CSS from local `assets/` files. It no longer executes unpinned CDN scripts or transpiles JSX in visitors’ browsers. Package versions and transitive dependencies are captured in `package-lock.json` and audited in CI.

Use Node 22.13+ (CI uses Node 24):

```sh
npm ci
npm run build
npm test
npm audit
```

Commit updated `assets/` with source/lock changes; CI verifies the deployed files are reproducible from the lock. Serve the repository as static files, retaining `index.html` at its existing path. No account, secret, backend, or database migration is needed. Third-party license notices are in `assets/THIRD-PARTY-NOTICES.txt`.
