FROM node:20-alpine
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 appuser
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev
COPY --chown=appuser:nodejs . .
USER appuser
EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "server.js"]
