
const parseDayOfWeek = (number: number): string => {
  if (number == 0) {
    return "SUN"
  }
  if (number == 1) {
    return "MON"
  }

  if (number == 2) {
    return "TUE"
  }

  if (number == 3) {
    return "WED"
  }

  if (number == 4) {
    return "THU"
  }

  if (number == 5) {
    return "FRI"
  }

  return "SAT"
}

export default parseDayOfWeek;
