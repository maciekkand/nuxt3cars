export function alphanumericAndSingleSpaces(inputString) {
  const sanitizedString = inputString.replace(/[^a-z0-9\s-]+/gi, '')
  const sanitizedStringWithSingleSpaces = sanitizedString.replace(/\s+/g, ' ')
  return sanitizedStringWithSingleSpaces
}

export function alphanumeric(inputString) {
  const sanitizedString = inputString.replace(/[^a-z0-9]+/gi, '')
  return sanitizedString
}
