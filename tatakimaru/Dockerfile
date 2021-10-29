FROM golang:1.16

COPY go.mod /backend/go.mod
COPY go.sum /backend/go.sum
WORKDIR /backend
RUN go mod download
COPY . /backend
# CMD go run main.go