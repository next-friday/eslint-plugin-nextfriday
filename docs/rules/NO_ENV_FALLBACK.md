# no-env-fallback

Disallow fallback values for environment variables as they can be dangerous in production.

## Rule Details

This rule prevents using fallback values with `process.env` environment variables. When environment variables have fallback values (using `||`, `??`, or ternary operators), applications can silently run with default values instead of failing when required configuration is missing. This can lead to security issues, incorrect behavior in production, or hard-to-debug problems.

It's safer to let the application fail explicitly when required environment variables are missing, rather than continuing with potentially incorrect default values.

## Examples

**Incorrect** code for this rule:

```js
const apiKey = process.env.API_KEY || "default-key";
const dbUrl = process.env.DATABASE_URL ?? "localhost";
const port = process.env.PORT ? "8080" : "3000";

const config = {
  secret: process.env.SECRET_KEY || "unsafe-default",
  region: process.env.AWS_REGION ?? "us-east-1",
};

function getToken() {
  return process.env.AUTH_TOKEN || "abc123";
}
```

**Correct** code for this rule:

```js
const apiKey = process.env.API_KEY;
const dbUrl = process.env.DATABASE_URL;
const port = process.env.PORT;

const config = {
  secret: process.env.SECRET_KEY,
  region: process.env.AWS_REGION,
};

function getToken() {
  return process.env.AUTH_TOKEN;
}

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is required");
}
```

## When Not To Use It

If your application intentionally uses default values for optional configuration and you have explicit handling for required vs optional environment variables, you may want to disable this rule. However, it's generally safer to validate required environment variables at application startup rather than using fallback values.
