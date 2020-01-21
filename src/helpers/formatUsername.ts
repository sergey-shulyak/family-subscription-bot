import R from "ramda"

export const formatUsername = (username?: string): string =>
  !R.isEmpty(username) ? `@${username}` : "unknown"
