# Complete Examples

These are full file examples that pass ALL 52 eslint-plugin-nextfriday rules with zero errors. Use these as templates when generating code.

## React Component File (`UserProfile.tsx`)

```tsx
import type { ReactElement } from "react";

import type { User } from "@/types/user";

interface UserProfileProps {
  email: string;
  name: string;
  onSave: (user: User) => void;
  avatar?: string;
  bio?: string;
}

interface UserAvatarProps {
  alt: string;
  src: string;
}

function UserAvatar(props: Readonly<UserAvatarProps>): ReactElement {
  const { alt, src } = props;

  return <img alt={alt} src={src} />;
}

function UserProfile(props: Readonly<UserProfileProps>): ReactElement {
  const { avatar, bio, email, name, onSave } = props;

  const isComplete = Boolean(avatar && bio);
  const displayName = `${name} (${email})`;

  const handleSave = (): void => {
    const user = { avatar, bio, email, name };
    onSave(user);
  };

  return (
    <section>
      <UserAvatar alt={name} src={avatar} />

      <div>
        <h1>{displayName}</h1>
        <p>{bio}</p>
      </div>

      <footer>
        {isComplete ? (
          <button type="button" onClick={handleSave}>
            {`Save ${name}`}
          </button>
        ) : (
          <p>{`Please complete your profile, ${name}`}</p>
        )}
      </footer>
    </section>
  );
}

export default UserProfile;
```

Key patterns: `import type` for types, `@/` absolute paths, `Props` suffix, required A-Z then optional A-Z, `Readonly<>` wrapper, props destructured inside body, explicit return types, `is` prefix on boolean, complex expressions extracted to const, template literals for mixed text, blank lines before return and after multi-line blocks, export at bottom.

## Utility File (`user-service.ts`)

```ts
import type { User } from "@/types/user";

const API_BASE_URL = "https://api.example.com";
const MAX_RETRIES = 3;

async function fetchUser({ userId }: FetchUserParams): Promise<User> {
  const url = `${API_BASE_URL}/users/${userId}`;
  const response = await fetch(url);
  const data = await response.json();

  return data;
}

async function fetchUsers(): Promise<User[]> {
  const url = `${API_BASE_URL}/users`;
  const response = await fetch(url);
  const data = await response.json();

  return data;
}

interface FetchUserParams {
  userId: string;
}

export { fetchUser, fetchUsers };
```

Key patterns: kebab-case filename, `import type`, SCREAMING_SNAKE_CASE constants, function declarations (not arrows), explicit return types, destructured params with named interface, async/await, blank line before return, export at bottom.

## Hook File (`user-profile.hook.ts`)

```ts
import { useCallback, useEffect, useState } from "react";

import type { User } from "@/types/user";

function useUserProfile({ userId }: UseUserProfileParams): UseUserProfileReturn {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleFetch = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setHasError(false);

    const response = await fetch(`/api/users/${userId}`);

    if (!response.ok) {
      setHasError(true);
      setIsLoading(false);

      return;
    }

    const data = await response.json();
    setUser(data);
    setIsLoading(false);
  }, [userId]);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return { hasError, isLoading, user };
}

interface UseUserProfileParams {
  userId: string;
}

interface UseUserProfileReturn {
  hasError: boolean;
  isLoading: boolean;
  user: User | null;
}

export { useUserProfile };
```

Key patterns: `use` prefix for hook function, `.hook.ts` kebab-case filename, `is`/`has` prefix on boolean state, guard clause (early return), blank line after multi-line blocks, interfaces sorted A-Z with required first.

## Next.js Page File (`ArticleList.tsx`)

```tsx
import { Suspense, lazy } from "react";

import type { ReactElement } from "react";

const ArticleCard = lazy(() => import("@/components/ArticleCard"));

interface ArticleListProps {
  category: "articles" | "dharma" | "faq";
  title: string;
  isPublished?: boolean;
}

interface ArticleItemProps {
  id: string;
  title: string;
}

function ArticleItem(props: Readonly<ArticleItemProps>): ReactElement {
  const { id, title } = props;

  return (
    <li key={id}>
      <Suspense fallback={<div>Loading...</div>}>
        <ArticleCard id={id} title={title} />
      </Suspense>
    </li>
  );
}

function ArticleList(props: Readonly<ArticleListProps>): ReactElement {
  const { category, isPublished, title } = props;

  if (!isPublished) {
    return <p>{`${title} is not published yet`}</p>;
  }

  const items = getArticles(category);

  return (
    <section>
      <h1>{title}</h1>

      <ul>
        {items.map((item) => (
          <ArticleItem id={item.id} title={item.title} />
        ))}
      </ul>
    </section>
  );
}

export default ArticleList;
```

Key patterns: inline literal union (not type alias), lazy component wrapped in `Suspense`, guard clause for early return, template literal for mixed text.
