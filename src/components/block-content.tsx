import React from 'react';

import { cn } from '@/lib/utils';

type BlockContentProps = React.ComponentProps<'div'> & {
  content: string | TrustedHTML;
};

export default function BlockContent({ content, className, ...props }: BlockContentProps) {
  return (
    <div
      {...props}
      className={cn('blockcontent', className)}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
