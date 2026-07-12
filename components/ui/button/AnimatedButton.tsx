"use client";

import { Button } from "@/components/ui/button";
import AnimatedSplit, {
  AnimatedSplitHandle,
} from "@/components/ui/button/AnimatedSplit";
import Link from "next/link";
import { forwardRef, ReactNode, useRef } from "react";

type AnimatedButtonProps = React.ComponentProps<typeof Button> & {
  children: ReactNode;
  trailingContent?: ReactNode;
  href?: string;
};

const AnimatedButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  AnimatedButtonProps
>(({ children, trailingContent, className, href, ...rest }, ref) => {
  const textRef = useRef<AnimatedSplitHandle>(null);

  const mergeEvent =
    <T extends React.SyntheticEvent>(
      userHandler?: (e: T) => void,
      internalHandler?: (e: T) => void,
    ) =>
    (e: T) => {
      internalHandler?.(e);
      userHandler?.(e);
    };

  const content = (
    <>
      <AnimatedSplit ref={textRef}>{children}</AnimatedSplit>
      {trailingContent && <span>{trailingContent}</span>}
    </>
  );

  const sharedProps = {
    className: `group relative inline-flex items-center justify-center ${
      className ?? ""
    }`,
    onMouseEnter: mergeEvent(rest.onMouseEnter, () => textRef.current?.play()),
    onMouseLeave: mergeEvent(rest.onMouseLeave, () =>
      textRef.current?.reverse(),
    ),
    onFocus: mergeEvent(rest.onFocus, () => textRef.current?.play()),
    onBlur: mergeEvent(rest.onBlur, () => textRef.current?.reverse()),
  };

  if (href) {
    return (
      <Button asChild {...rest} {...sharedProps}>
        <Link href={href} ref={ref as React.Ref<HTMLAnchorElement>}>
          {content}
        </Link>
      </Button>
    );
  }

  return (
    <Button
      ref={ref as React.Ref<HTMLButtonElement>}
      {...rest}
      {...sharedProps}
    >
      {content}
    </Button>
  );
});

AnimatedButton.displayName = "AnimatedButton";
export default AnimatedButton;
