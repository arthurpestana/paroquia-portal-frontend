import { useEffect } from 'react'

export const useSliderScroll = (ref: React.RefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    const element = ref.current
    if (!element) return

    let isDragging = false
    let startX = 0
    let scrollStart = 0

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true
      element.classList.add('drag-active')
      startX = e.pageX - element.offsetLeft
      scrollStart = element.scrollLeft
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      e.preventDefault()
      const x = e.pageX - element.offsetLeft
      const delementta = (x - startX) * 1.5
      element.scrollLeft = scrollStart - delementta
    }

    const onMouseUpOrLeave = () => {
      isDragging = false
      element.classList.remove('drag-active')
    }

    element.addEventListener('mousedown', onMouseDown)
    element.addEventListener('mousemove', onMouseMove)
    element.addEventListener('mouseup', onMouseUpOrLeave)
    element.addEventListener('mouselementeave', onMouseUpOrLeave)

    return () => {
      element.removeEventListener('mousedown', onMouseDown)
      element.removeEventListener('mousemove', onMouseMove)
      element.removeEventListener('mouseup', onMouseUpOrLeave)
      element.removeEventListener('mouselementeave', onMouseUpOrLeave)
    }
  }, [ref])
}
