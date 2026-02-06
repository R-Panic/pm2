FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

# Runtime: "node" or "bun"
ARG RUNTIME=node
ENV RUNTIME=${RUNTIME}
# Node.js version (default: 20, ignored if RUNTIME=bun)
ARG NODE_VERSION=20

# Install base dependencies
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    git \
    bash \
    python3 \
    php \
    bc \
    procps \
    ca-certificates \
    gnupg \
    unzip \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Always install Node.js (required for PM2 daemon and tests)
RUN mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && \
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_${NODE_VERSION}.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list && \
    apt-get update && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

# Additionally install Bun if RUNTIME=bun
RUN if [ "$RUNTIME" = "bun" ]; then \
        curl -fsSL https://bun.sh/install | bash && \
        ln -s /root/.bun/bin/bun /usr/local/bin/bun && \
        ln -s /root/.bun/bin/bunx /usr/local/bin/bunx; \
    fi

# Install mocha globally
RUN npm install -g mocha

WORKDIR /var/pm2

# Copy package files first (for layer caching)
COPY package*.json ./

# Install dependencies (always use npm for consistency)
RUN npm install

# Environment
ENV PM2_DISCRETE_MODE=true
ENV PM2_SILENT=true
ENV NODE_ENV=test

CMD ["bash"]
