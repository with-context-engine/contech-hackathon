'use client';
import { cn } from '@/lib/utils';
import { motion, stagger, useAnimate } from 'framer-motion';
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export const TextGenerateEffect = ({
  words,
  className,
  filter = false,
  duration = 0.02,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      'span',
      {
        opacity: 1,
        filter: filter ? 'blur(0px)' : 'none',
      },
      {
        duration: duration,
        delay: stagger(0.02),
      },
    );
  }, [animate, filter, duration]);

  return (
    <div className={cn('text-sm', className)}>
      <motion.div ref={scope} className="space-y-1">
        <ReactMarkdown
          components={{
            p: ({ children }) => (
              <motion.p className="leading-relaxed">
                {String(children)
                  .split(' ')
                  .map((word) => (
                    <motion.span
                      key={word}
                      className="opacity-0 inline-block"
                      style={{
                        filter: filter ? 'blur(8px)' : 'none',
                      }}
                    >
                      {word}{' '}
                    </motion.span>
                  ))}
              </motion.p>
            ),
          }}
        >
          {words}
        </ReactMarkdown>
      </motion.div>
    </div>
  );
};
