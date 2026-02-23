'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'
import { CodeBlock } from './CodeBlock'

interface MarkdownContentProps {
  content: string
  className?: string
}

export function MarkdownContent({ content, className = '' }: MarkdownContentProps) {
  return (
    <div className={`prose prose-invert prose-sm max-w-none
      prose-headings:text-white prose-headings:font-semibold
      prose-p:text-[var(--text)] prose-p:leading-relaxed
      prose-li:text-[var(--text)] prose-li:marker:text-[var(--accent)]
      prose-strong:text-white prose-strong:font-semibold
      prose-a:text-[var(--accent)] prose-a:no-underline hover:prose-a:underline
      prose-code:text-[var(--accent)] prose-code:bg-[var(--bg-base)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
      prose-pre:bg-[var(--bg-base)] prose-pre:border prose-pre:border-[var(--border)]
      markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
          code: ({ className, children }) => {
            const isBlock = className?.includes('language-')
            if (isBlock) {
              return (
                <code className={className} suppressHydrationWarning>
                  {children}
                </code>
              )
            }
            return (
              <code className="px-1.5 py-0.5 rounded-lg bg-[var(--bg-base)] text-[var(--accent-bright)] text-sm font-mono border border-[var(--border)]">
                {children}
              </code>
            )
          },
          h2: ({ children }) => (
            <h2 className="text-lg font-semibold text-white mt-8 mb-3 pb-2 border-b border-[var(--border)]">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base font-semibold text-[var(--text)] mt-6 mb-2">{children}</h3>
          ),
          ul: ({ children }) => <ul className="space-y-2 my-4">{children}</ul>,
          ol: ({ children }) => <ol className="space-y-2 my-4 list-decimal list-inside">{children}</ol>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
