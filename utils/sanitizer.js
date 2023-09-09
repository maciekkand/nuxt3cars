export function alphanumericAndSingleSpaces(inputString) {
  const sanitizedString = inputString.replace(/[^a-zA-Z0-9\.]+/g,"")
  const sanitizedStringWithSingleSpaces = sanitizedString.replace(/[^a-zA-Z0-9\.]+/g," ")

  return sanitizedStringWithSingleSpaces
}
