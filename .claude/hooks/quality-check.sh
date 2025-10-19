#!/bin/bash

set -e

echo "> Running quality checks..."

npx prettier --write .
npx eslint src --ext .js,.ts --fix

echo "[PASS] Quality checks passed"
