declare module 'lucide-react';
declare module 'heic2any';
declare module 'canvas-confetti';

import 'framer-motion';

declare module 'framer-motion' {
  export interface HTMLMotionProps<T> {
    initial?: any;
    animate?: any;
    exit?: any;
    whileInView?: any;
    viewport?: any;
    transition?: any;
    layoutId?: any;
    whileHover?: any;
    whileTap?: any;
  }
}
