#!/bin/sh
set -e

# Run migrations if RUN_MIGRATIONS is set
if [ "$RUN_MIGRATIONS" = "true" ]; then
    echo "🔄 Running database migrations..."
    bun run migrate
    echo "✅ Migrations completed"
fi

# Execute the main command
exec "$@"
