#!/bin/sh
# Script to run Drizzle migrations
# Usage: ./scripts/migrate.sh [generate|push|migrate]

set -e

command=${1:-push}

echo "Running Drizzle migration: $command"

case $command in
  generate)
    echo "Generating migration files..."
    npm run db:generate
    ;;
  push)
    echo "Pushing schema to database..."
    npm run db:push
    ;;
  migrate)
    echo "Running migrations..."
    npm run db:migrate
    ;;
  *)
    echo "Unknown command: $command"
    echo "Available commands: generate, push, migrate"
    exit 1
    ;;
esac

echo "Migration completed successfully!"
