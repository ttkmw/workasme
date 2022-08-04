
export const parseDayOfWeekAlias = (number: number): string => {
  if (number === 0) {
    return "SUN"
  }
  if (number === 1) {
    return "MON"
  }

  if (number === 2) {
    return "TUE"
  }

  if (number === 3) {
    return "WED"
  }

  if (number === 4) {
    return "THU"
  }

  if (number === 5) {
    return "FRI"
  }

  return "SAT"
}

export const parseDayOfWeek = (number: number): string => {
  if (number === 0) {
    return "SUNDAY"
  }
  if (number === 1) {
    return "MONDAY"
  }

  if (number === 2) {
    return "TUESDAY"
  }

  if (number === 3) {
    return "WEDNESDAY"
  }

  if (number === 4) {
    return "THURSDAY"
  }

  if (number === 5) {
    return "FRIDAY"
  }

  return "SATURDAY"
}



export default {parseDayOfWeekAlias, parseDayOfWeek};
