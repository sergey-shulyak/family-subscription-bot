import isEmpty from "lodash/isEmpty"

export const formatUsername = (username?: string): string =>
  !isEmpty(username) ? `@${username}` : "unknown"
