// Start of Selection
/**
 * Debounces a function, ensuring that it is only called after a specified delay
 * has passed since the last time it was invoked. This is useful for limiting the
 * rate at which a function can fire, such as during user input events.
 *
 * @param func - The function to debounce.
 * @param delay - The number of milliseconds to wait before invoking the function.
 * @returns A debounced version of the provided function.
 *
 * @example
 * const handleResize = debounce(() => {
 *   console.log('Window resized');
 * }, 300);
 *
 * window.addEventListener('resize', handleResize);
 */
export function debounce<Args extends unknown[], R>(
  func: (...args: Args) => R,
  delay: number,
): (...args: Args) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}
