// With `trailingSlash: true` (needed for static export), usePathname() returns
// '/midnight/' instead of '/midnight' — normalize before comparing routes.
export function normalizePathname(pathname) {
  if (!pathname) return pathname;
  return pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

export function isMidnightPath(pathname) {
  return normalizePathname(pathname) === '/midnight';
}
