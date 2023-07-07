import { forwardRef, ForwardedRef, useRef, MutableRefObject, useEffect } from "react"

export interface IClickOutsideProps {
  children: React.ReactNode
  wrapperId: string // Id of our outside wrapper where we will listen for click
  listen: boolean // Toggle to listen for click
  onClickOutside: () => void // 
}

export const ClickOutsideDetector = forwardRef((props: IClickOutsideProps, ref: ForwardedRef<HTMLDivElement>) => {
  const { children, listen, wrapperId, onClickOutside } = props
  const container = ref 
  const onKeyUp = (e: KeyboardEvent) => {
    if (e.code === 'Escape') onClickOutside()
  }

  const handleEvent = (e: KeyboardEvent | MouseEvent | TouchEvent) => {
    if ((container as MutableRefObject<HTMLDivElement>).current.contains(e.target as Node)) return
    const wrapperElm = document.getElementById(wrapperId)

    if (wrapperElm && wrapperElm.contains(e.target as Node)) return

    onClickOutside()
  }

  useEffect(() => {
    if (listen) {
      document.addEventListener('mousedown', handleEvent, false)
      document.addEventListener('touchend', handleEvent, false)
      document.addEventListener('keyup', onKeyUp, false)
    }

    return () => {
      document.removeEventListener('mousedown', handleEvent, false)
      document.removeEventListener('touchend', handleEvent, false)
      document.removeEventListener('keyup', onKeyUp, false)
    }
  })

  return <div ref={container}>{children}</div>
})

// 👇️ set display name
ClickOutsideDetector.displayName = 'ClickOutsideDetector';
export default ClickOutsideDetector;