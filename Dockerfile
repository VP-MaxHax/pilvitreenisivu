FROM ubuntu

WORKDIR /app

EXPOSE 8000

COPY . .

RUN apt update
RUN apt install -y curl
RUN curl https://deb.nodesource.com/setup_18.x | bash
RUN apt install -y nodejs
RUN node -v && npm -v
RUN npm install
RUN npm install -g http-server

CMD http-server
