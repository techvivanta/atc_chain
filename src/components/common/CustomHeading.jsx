import { motion, useInView } from 'framer-motion';
import * as React from 'react';

export function CustomHeading({
  title,
  className = '',
  headingClassName = 'flex flex-wrap gap-0.5 md:gap-2',
  direction = 'up',
  staggerChildren = 0.05,
  as = 'h2',
  delay = 0,
}) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px 0px',
  });

  const FADE_ANIMATION = {
    hidden: {
      opacity: 0,
      y:
        direction === 'down'
          ? -30
          : direction === 'left'
          ? 0
          : direction === 'right'
          ? 0
          : 30,
      x:
        direction === 'left'
          ? 30
          : direction === 'right'
          ? -30
          : 0,
    },
    show: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 14,
        delay,
      },
    },
  };

  const words = title.split(' ');
  const HeadingTag = as;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'show' : 'hidden'}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren } },
      }}
      className={`inline-block ${className}`}
    >
      {/* Remove overflow-hidden from heading to prevent Y clipping */}
      <HeadingTag className={headingClassName}>
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={FADE_ANIMATION}
            className="inline-block mr-2"
            style={{
              whiteSpace: 'nowrap',
              display: 'inline-block',
              overflow: 'visible', // ensures text like 'y', 'g' isn't clipped
            }}
          >
            {word}
          </motion.span>
        ))}
      </HeadingTag>
    </motion.div>
  );
}
