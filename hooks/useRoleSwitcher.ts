import { useEffect, useRef, useState } from 'react'

interface RoleSwitcherOptions {
  roles: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pause?: number
}

interface RoleSwitcherResult {
  text: string
  isTyping: boolean
}

type Phase = 'typing' | 'deleting'

function useRoleSwitcher({
  roles,
  typingSpeed = 70,
  deletingSpeed = 35,
  pause = 1600,
}: RoleSwitcherOptions): RoleSwitcherResult {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [phase, setPhase] = useState<Phase>('typing')
  const [reduceMotion, setReduceMotion] = useState(false)

  const rolesKey = roles.join('\u0000')
  const rolesRef = useRef(roles)
  useEffect(() => {
    rolesRef.current = roles
  })

  useEffect(() => {
    setReduceMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    )
  }, [])

  useEffect(() => {
    setIndex(0)
    setText('')
    setPhase('typing')
  }, [rolesKey])

  useEffect(() => {
    const list = rolesRef.current
    if (list.length === 0) return

    const current = list[index % list.length]
    let timeout: ReturnType<typeof setTimeout> | undefined

    if (reduceMotion) {
      if (text !== current) {
        setText(current)
      } else if (list.length > 1) {
        timeout = setTimeout(() => setIndex((i) => i + 1), pause + 1000)
      }
      return () => clearTimeout(timeout)
    }

    if (phase === 'typing') {
      if (text === current) {
        if (list.length > 1) {
          timeout = setTimeout(() => setPhase('deleting'), pause)
        }
      } else {
        timeout = setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          typingSpeed,
        )
      }
    } else if (text === '') {
      timeout = setTimeout(() => {
        setIndex((i) => i + 1)
        setPhase('typing')
      }, 350)
    } else {
      timeout = setTimeout(() => setText(text.slice(0, -1)), deletingSpeed)
    }

    return () => clearTimeout(timeout)
  }, [text, phase, index, rolesKey, reduceMotion, typingSpeed, deletingSpeed, pause])

  const current = roles.length > 0 ? roles[index % roles.length] : ''
  const isTyping = !reduceMotion && (phase === 'deleting' || text !== current)

  return { text, isTyping }
}

export default useRoleSwitcher
