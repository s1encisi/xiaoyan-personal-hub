"use client";

// React Bits / David Haz. See LICENSE.md for the upstream license.
import React from 'react';
import { cn } from '@/lib/utils';
import './StarBorder.css';

type StarBorderProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {
  as?: T;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  color?: string;
  speed?: React.CSSProperties['animationDuration'];
  thickness?: number;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
};

const StarBorder = <T extends React.ElementType = 'button'>({
  as,
  className = '',
  style,
  color = 'var(--starlight)',
  speed = '6s',
  thickness = 1,
  backgroundColor = 'var(--navy)',
  textColor = 'var(--surface)',
  borderColor = 'var(--line)',
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component: React.ElementType = as || 'button';

  return (
    <Component
      className={cn('star-border-container', className)}
      {...(Component === 'button' ? { type: 'button' } : {})}
      {...rest}
      style={{
        padding: `${thickness}px 0`,
        ...style
      }}
    >
      <div
        className="border-gradient-bottom"
        aria-hidden="true"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      ></div>
      <div
        className="border-gradient-top"
        aria-hidden="true"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      ></div>
      <div className="inner-content" style={{ background: backgroundColor, color: textColor, borderColor }}>
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;
