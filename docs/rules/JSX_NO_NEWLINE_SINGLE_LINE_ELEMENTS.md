# jsx-no-newline-single-line-elements

Disallow empty lines between single-line sibling JSX elements.

## Rule Details

This rule enforces that sibling JSX elements which are both single-line should not have empty lines between them. Single-line elements should be compact and grouped together.

Use with `jsx-newline-between-elements` which requires empty lines between multi-line siblings.

### Why?

1. **Readability**: Single-line elements that are visually similar should be grouped together without gaps
2. **Consistency**: Prevents inconsistent spacing between elements of the same visual weight
3. **Complementary**: Works alongside `jsx-newline-between-elements` to create clear visual separation only where it matters

## Examples

### ❌ Incorrect

```tsx
// Bad: Unnecessary empty line between single-line siblings
<div>
  <Panel id="courses">Courses</Panel>

  <Panel id="news">News</Panel>
</div>
```

```tsx
// Bad: Empty lines between single-line list items
<ul>
  <li>Item 1</li>

  <li>Item 2</li>

  <li>Item 3</li>
</ul>
```

### ✅ Correct

```tsx
// Good: Single-line siblings are compact
<div>
  <Panel id="courses">Courses</Panel>
  <Panel id="news">News</Panel>
</div>
```

```tsx
// Good: Multi-line sibling has empty line (handled by jsx-newline-between-elements)
<div>
  <Panel id="overview">
    <div className="grid gap-8">
      <div>Content</div>
    </div>
  </Panel>

  <Panel id="courses">Courses</Panel>
  <Panel id="news">News</Panel>
</div>
```

```tsx
// Good: Self-closing components without empty lines
<div>
  <Header />
  <Main />
  <Footer />
</div>
```

## When Not To Use It

If you prefer empty lines between all sibling JSX elements regardless of their line count, you can disable this rule.
