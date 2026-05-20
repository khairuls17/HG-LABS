# AUTH_SETUP — HG Labs — Midnight Space

This document explains the authentication architecture for HG Labs, including login/register flows, guest mode, protected routes, session management, and middleware recommendations.

## Authentication architecture

HG Labs uses Supabase Auth for user authentication and session management. The goal is to keep auth lightweight, immersive, and consistent with the site’s atmosphere.

### Core concepts

- `Auth client`: Supabase handles sign-in, sign-up, and token refresh.
- `Session`: stored in the browser via secure cookies or local storage.
- `Protected routes`: pages or API endpoints that require an authenticated user.
- `Guest mode`: allows browsing with limited access and no persistence.

## Login / register flow

### Register

1. User enters email, username, and password.
2. The frontend calls Supabase Auth sign-up.
3. Supabase creates the user and sends a confirmation flow if enabled.
4. The app stores the session and transitions the user into the protected experience.

### Login

1. User enters email and password.
2. The frontend calls Supabase Auth sign-in.
3. Supabase returns a session token.
4. The app stores the session and loads user-specific features.

### Logout

1. The user clicks `logout`.
2. The frontend calls Supabase Auth sign-out.
3. The app clears the local session and returns to guest mode.

## Guest mode flow

- Guest users can browse the app with limited access.
- Guest users can view content, explore the terminal, and see atmospheric features.
- Guest users cannot post to the guestbook, save focus sessions, or access protected backend routes.
- The UI should make guest mode feel natural and not blocked.

### Guest mode recommendations

- Provide clear messaging about restricted actions.
- Offer a smooth transition to register/login.
- Preserve theme and ambient state for guest visitors.

## Protected route strategy

### Client-side protection

- Use auth state from Supabase to conditionally render protected components.
- Redirect unauthenticated users to a login panel or guest landing page.
- Protect modal actions and buttons with guard checks.

### Server-side or API protection

- Use Supabase session verification in API routes.
- Validate the `Authorization` header or cookie session token.
- Reject unauthorized requests with `401 Unauthorized`.

### Example protected route logic

- If a user requests `/focus-room`, verify auth state before rendering a member-only view.
- For an API route that writes a focus session, require a valid Supabase session.

## Session management

- Supabase manages session expiration and refresh.
- The frontend should use Supabase client listeners for auth state changes.
- Store only non-sensitive profile data in local state.
- Clear session state on logout.

### Recommended auth state flow

1. Initialize Supabase client with public keys.
2. Check `supabase.auth.getSession()` on app load.
3. Store the session in a global state or context.
4. Listen for `onAuthStateChange` and update the UI.

## Middleware recommendations

### Use middleware to guard routes

- In Next.js App Router, use `middleware.ts` to inspect requests.
- Redirect unauthenticated users away from protected paths.
- Preserve guest-friendly routes.

### Example middleware behavior

- Allow `/`, `/about`, `/projects`, and public sections.
- Block or require auth for `/focus-room`, `/guestbook/post`, `/profile`.
- Redirect unauthorized clients to `/login` or a guest prompt.

## Security notes

- Do not store sensitive keys in client-side code.
- Use the `anon` key only on the client.
- Use the `service_role` key only in server-side code or secure API routes.
- Protect user data with row-level security policies in Supabase.

## UX recommendations

- Keep the auth UI minimal and atmospheric.
- Use terminal-style prompts or cozy modal panels for login/register.
- Provide a `continue as guest` option.
- Preserve user journey when switching from guest mode to authenticated mode.
