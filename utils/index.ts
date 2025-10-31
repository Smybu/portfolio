export function isInViewport(element: HTMLElement, callback: () => void, threshold = 0.4) {
  const observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries

      if (entry.isIntersecting) {
        console.log('Element has entered the viewport')
        callback()
      }
    },
    {
      threshold: threshold,
    },
  )

  observer.observe(element)

  return observer
}
