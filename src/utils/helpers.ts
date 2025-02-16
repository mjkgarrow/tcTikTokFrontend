export function timeAgo(input: string): string {
  const date = new Date(input);
  const formatter = new Intl.RelativeTimeFormat("en");

  // Define a type for the range keys to be specific
  const ranges: {
    [key in
      | "years"
      | "months"
      | "weeks"
      | "days"
      | "hours"
      | "minutes"
      | "seconds"]: number;
  } = {
    years: 3600 * 24 * 365,
    months: 3600 * 24 * 30,
    weeks: 3600 * 24 * 7,
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    seconds: 1,
  };

  const secondsElapsed = (date.getTime() - Date.now()) / 1000;

  // Iterate through the ranges, now the key is type-safe
  for (let key in ranges) {
    // Make sure key is a valid key of the ranges object
    const rangeKey = key as keyof typeof ranges;

    if (ranges[rangeKey] < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / ranges[rangeKey];
      return formatter.format(Math.round(delta), rangeKey);
    }
  }

  // Default return in case no condition is met
  return "Just now";
}
