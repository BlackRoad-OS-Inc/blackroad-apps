FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY go.mod ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o roadworld .

FROM alpine:3.19
RUN apk --no-cache add ca-certificates
WORKDIR /app
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY --from=builder /app/roadworld .
USER appuser
EXPOSE 8080
CMD ["./roadworld"]
