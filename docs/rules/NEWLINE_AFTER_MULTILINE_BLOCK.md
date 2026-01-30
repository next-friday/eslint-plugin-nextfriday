# newline-after-multiline-block

Require a blank line before and after multi-line statements.

## Rule Details

This rule enforces a blank line before and after any statement that spans multiple lines. This improves code readability by visually separating logical blocks. Single-line statements do not require blank lines between them.

### Examples

#### Incorrect

```ts
const apiClient = axios.create({
  baseURL: process.env.API_URL,
  timeout: 5000,
});
const fetchUsers = () => apiClient.get("/users");
```

```ts
const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().positive(),
});
const validateUser = (data: unknown) => userSchema.parse(data);
```

```ts
function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}
```

Missing blank line before a multi-line statement:

```ts
const pathname = "/categories/electronics";
const nestedCategory = CATEGORIES.flatMap((category) => category.children ?? []).find(
  (child) => child.href === pathname,
);
```

#### Correct

Multi-line statements need a blank line before and after them:

```ts
const apiClient = axios.create({
  baseURL: process.env.API_URL,
  timeout: 5000,
});

const fetchUsers = () => apiClient.get("/users");
```

```ts
const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().positive(),
});

const validateUser = (data: unknown) => userSchema.parse(data);
```

```ts
function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}
```

Blank line before a multi-line statement:

```ts
const pathname = "/categories/electronics";

const nestedCategory = CATEGORIES.flatMap((category) => category.children ?? []).find(
  (child) => child.href === pathname,
);
```

Single-line statements do not require blank lines:

```ts
const API_URL = "https://api.example.com";
const TIMEOUT = 5000;
const MAX_RETRIES = 3;
```

```ts
const config = { timeout: 5000, retries: 3 };
const options = { headers: { "Content-Type": "application/json" } };
```

## When Not To Use It

If you prefer compact code without blank lines after multi-line statements, or if your team has different formatting preferences.

## Fixable

This rule is auto-fixable. Running ESLint with the `--fix` flag will automatically insert blank lines after multi-line statements when needed.
