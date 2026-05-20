'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

type HistoryEntry = {
  id: string
  prompt?: string
  text: string
  variant: 'command' | 'response' | 'info'
  fullText?: string
}

type CommandDefinition = {
  description: string
  execute: (args: string) => string | string[]
}

const commandRegistry = {} as Record<string, CommandDefinition>

const addCommand = (name: string, description: string, execute: (args: string) => string | string[]) => {
  commandRegistry[name] = { description, execute }
}

addCommand('help', 'Show available commands', () => {
  const commands = Object.entries(commandRegistry).map(
    ([name, command]) => `• ${name} — ${command.description}`
  )
  return ['Available commands:', '', ...commands]
})

addCommand('about', 'Learn about HG Labs', () =>
  'HG Labs — Midnight Space is a cozy midnight coding sanctuary built for ambient web experiments and quiet internet energy.'
)

addCommand('whoami', 'See the creator profile', () =>
  'Hairul | Information Systems student | infrastructure, devops, weird internet experiments'
)

addCommand('projects', 'View the project showcase overview', () => [
  'project explorer — floating lab cards with stack, links, and hidden experiments.',
  'focus room — immersive timer and productivity space.',
  'midnight radio — ambient sound player for late-night coding.',
])

addCommand('socials', 'See social links and contact hints', () => [
  'github — discover open-source labs and experiments.',
  'twitter — follow the midnight status and small updates.',
  'guestbook — leave a note in the lab.',
])

addCommand('focus', 'Enter focus mode and session tracking', () =>
  'Focus mode is ready. Use the focus room to track sessions, save progress, and stay in the zone.'
)

addCommand('online', 'Show active presence and lab status', () =>
  `Night coders online: 7
most active room: focus room
lab status: calm and connected`
)

addCommand('guestbook', 'Open the public guestbook space', () =>
  'Guestbook is a living mural of messages and midnight notes. Add your voice once you register.'
)

addCommand('status', 'Show current lab status and analytics', () => [
  'server: ambient',
  'traffic: quiet',
  'focus sessions: 12 active',
  'mood: soft neon, rain layer enabled',
])

addCommand('echo', 'Repeat a message back to you', (args) => (args.trim() ? args.trim() : 'echo what?'))

export function useTerminalCommands() {
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      id: 'initial',
      text: 'Type `help` to see available commands.',
      variant: 'info',
    },
  ])
  const [input, setInput] = useState('')
  const [cursorVisible, setCursorVisible] = useState(true)
  const [historyIndex, setHistoryIndex] = useState<number | null>(null)
  const [typingEntry, setTypingEntry] = useState<{ id: string; fullText: string } | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const commandHistory = useMemo(
    () => history.filter((entry) => entry.variant === 'command' && entry.prompt).map((entry) => entry.prompt as string),
    [history]
  )

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCursorVisible((current) => !current)
    }, 530)
    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!typingEntry) return

    let index = 0
    const interval = window.setInterval(() => {
      index += 1
      setHistory((prev) =>
        prev.map((entry) =>
          entry.id === typingEntry.id
            ? { ...entry, text: typingEntry.fullText.slice(0, index) }
            : entry
        )
      )

      if (index >= typingEntry.fullText.length) {
        setTypingEntry(null)
      }
    }, 24)

    return () => window.clearInterval(interval)
  }, [typingEntry])

  const pushHistory = (entries: HistoryEntry[]) => {
    setHistory((prev) => [...prev, ...entries])
  }

  const executeCommand = (value: string) => {
    const normalized = value.toLowerCase().trim()
    if (!normalized) return

    const [command, ...args] = normalized.split(' ')
    const argString = args.join(' ')

    if (command === 'clear') {
      setHistory([])
      return
    }

    const commandDefinition = commandRegistry[command]
    const output = commandDefinition ? commandDefinition.execute(argString) : `Unknown command: ${value}. Type help for available commands.`
    const timestamp = Date.now()

    const promptEntry = {
      id: `${command}-${timestamp}-prompt`,
      prompt: value,
      text: '',
      variant: 'command' as const,
    }

    if (Array.isArray(output)) {
      const responseEntries = output.map((line, index) => ({
        id: `${command}-${timestamp}-response-${index}`,
        text: line,
        variant: 'response' as const,
      }))

      pushHistory([promptEntry, ...responseEntries])
      setHistoryIndex(null)
      return
    }

    const responseId = `${command}-${timestamp}-response`
    pushHistory([
      promptEntry,
      {
        id: responseId,
        text: '',
        fullText: output,
        variant: 'response' as const,
      },
    ])

    setTypingEntry({ id: responseId, fullText: output })
    setHistoryIndex(null)
  }

  const handleSubmit = () => {
    const trimmed = input.trim()
    if (!trimmed) return
    executeCommand(trimmed)
    setInput('')
  }

  const handleKeyNavigation = (key: string) => {
    if (key !== 'ArrowUp' && key !== 'ArrowDown') return
    if (!commandHistory.length) return

    setHistoryIndex((current) => {
      const nextIndex = current === null ? (key === 'ArrowUp' ? commandHistory.length - 1 : 0) : key === 'ArrowUp' ? Math.max(0, current - 1) : Math.min(commandHistory.length - 1, current + 1)
      setInput(commandHistory[nextIndex] ?? '')
      return nextIndex
    })
  }

  return {
    history,
    input,
    setInput,
    handleSubmit,
    handleKeyNavigation,
    cursorVisible,
    inputRef,
    commandList: useMemo(() => Object.keys(commandRegistry), []),
  }
}
