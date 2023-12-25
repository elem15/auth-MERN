export function getAge(dateStart: Date, dateEnd: Date) {
  //@ts-ignore
  return ((dateStart - dateEnd) as number) / (1000 * 60 * 60 * 24 * 365.25)
}
