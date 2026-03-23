# no-inline-return-properties

Require return object properties to use shorthand notation by extracting non-shorthand values to const variables.

## Rule Details

This rule enforces that all properties in a returned object literal use shorthand notation. When a return statement contains an object with renamed or computed properties, the values should be extracted into const variables before the return statement.

### Why?

Return objects with a mix of shorthand and non-shorthand properties are harder to scan. Extracting values into named constants before returning keeps the return statement clean and makes the data flow easier to follow.

## Examples

### Incorrect

```ts
function useBranch() {
  return {
    admins,
    branch,
    coursesCurrentPage: coursePage,
    coursesTotalPages: Math.ceil(sortedLearning.length / COURSES_PER_PAGE) || 1,
    members,
    membersHref: `/branch/${branchNumber}/members`,
    news,
    newsCurrentPage: newsData?.currentPage ?? 1,
    newsTotalPages: newsData?.pages ?? 1,
    stats,
  };
}
```

```ts
function useJoin() {
  return {
    error,
    isSubmitting,
    onJoin: handleJoin,
  };
}
```

### Correct

```ts
function useBranch() {
  const coursesCurrentPage = coursePage;
  const coursesTotalPages = Math.ceil(sortedLearning.length / COURSES_PER_PAGE) || 1;
  const membersHref = `/branch/${branchNumber}/members`;
  const newsCurrentPage = newsData?.currentPage ?? 1;
  const newsTotalPages = newsData?.pages ?? 1;

  return {
    admins,
    branch,
    coursesCurrentPage,
    coursesTotalPages,
    members,
    membersHref,
    news,
    newsCurrentPage,
    newsTotalPages,
    stats,
  };
}
```

```ts
function useJoin() {
  const onJoin = handleJoin;

  return {
    error,
    isSubmitting,
    onJoin,
  };
}
```

## When Not To Use It

If your project prefers inline property values in return statements for brevity.
