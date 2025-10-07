#!/bin/bash

set -e

echo "> Running Prettier check..."
pnpm prettier:check

echo "[PASS] Prettier check passed"

echo "> Running ESLint fix..."
pnpm eslint

echo "[PASS] ESLint fix passed"
echo "[PASS] All quality checks passed!"
