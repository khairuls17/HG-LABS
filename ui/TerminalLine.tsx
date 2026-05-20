'use client'

import { motion } from 'framer-motion'

type TerminalLineProps = {
  prompt?: string
  text: string
  variant?: 'command' | 'response' | 'info'
}

const variantStyles: Record<string, string> = {
  command: 'text-[#6EE7B7]',
  response: 'text-slate-300',
  info: 'text-slate-500',
}

export default function TerminalLine({ prompt, text, variant = 'response' }: TerminalLineProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
      className="w-full whitespace-pre-wrap break-words"
    >
      {prompt ? (
        <div className="flex flex-wrap gap-2 text-sm leading-6 text-slate-300 sm:text-base">
          <span className="font-mono text-[#6EE7B7]">›</span>
          <span className="font-mono text-white">{prompt}</span>
        </div>
      ) : null}
      <div className={`mt-1 text-sm leading-6 sm:text-base ${variantStyles[variant]}`}>
        {text}
      </div>
    </motion.div>
  )
}
