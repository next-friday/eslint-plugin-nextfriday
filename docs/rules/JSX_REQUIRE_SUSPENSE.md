# jsx-require-suspense

Require lazy-loaded components to be wrapped in `<Suspense>`.

## Rule Details

This rule ensures that components created with `lazy()` or `React.lazy()` are always wrapped in a `<Suspense>` boundary. Without Suspense, lazy components will throw an error when they try to render before their code has loaded.

### Why?

- **Required by React**: Lazy components must be wrapped in Suspense to handle the loading state
- **Error Prevention**: Prevents runtime errors from missing Suspense boundaries
- **User Experience**: Ensures a fallback UI is shown while lazy components load

## Examples

### ❌ Incorrect

```tsx
const AsyncComponent = lazy(() => import("./Component"));
const LazyModal = React.lazy(() => import("./Modal"));

// Missing Suspense wrapper
<AsyncComponent />

// Nested in div but no Suspense
<div>
  <LazyModal />
</div>
```

### ✅ Correct

```tsx
const AsyncComponent = lazy(() => import("./Component"));
const LazyModal = React.lazy(() => import("./Modal"));

// Wrapped in Suspense with fallback
<Suspense fallback={<Skeleton />}>
  <AsyncComponent />
</Suspense>

// Nested inside Suspense
<Suspense fallback={<Loading />}>
  <div>
    <LazyModal />
  </div>
</Suspense>

// Multiple lazy components in same Suspense
<Suspense fallback={<div>Loading...</div>}>
  <AsyncComponent />
  <LazyModal />
</Suspense>
```

## When Not To Use It

- If you're using a framework that handles Suspense boundaries automatically
- If you have a global Suspense boundary at your app root

## Related

- [React Suspense Documentation](https://react.dev/reference/react/Suspense)
- [React.lazy Documentation](https://react.dev/reference/react/lazy)
