import React from "react";
import { CSSProperties, forwardRef, ReactNode } from "react";

interface TitleProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  level?: 1 | 2 | 3 | 4 | 5;
}

interface TextProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  type?: "default" | "secondary" | "success" | "warning" | "danger";
  mark?: boolean;
  code?: boolean;
  strong?: boolean;
  disabled?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  small?: boolean;
  weight?: number;
  lineHeight?: string;
  align?: "left" | "center" | "right" | "justify";
}

interface LinkProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  target?: "_blank" | "_self" | "_parent" | "_top" | "framename";
  href?: string;
  onClick?: any;
}

interface TypographyProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

function Title(props: TitleProps) {
  const { children, className = "", style, level = 2 } = props;

  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <HeadingTag className={`${`h${level}`} ${className}`} style={style}>
      {children}
    </HeadingTag>
  );
}

function Text(props: TextProps) {
  const {
    children,
    className = "",
    style,
    type = "default",
    mark,
    code,
    strong,
    disabled = false,
    small = false,
    underline = false,
    strikethrough = false,
    weight,
    lineHeight,
  } = props;

  const Tag =
    (mark && "mark") || (code && "code") || (strong && "strong") || "span";

  return (
    <Tag
      style={{
        ...(underline
          ? {
              borderBottom: "1px solid var(--color-n700)",
            }
          : {}),
        ...(strikethrough
          ? {
              textDecoration: "line-through",
            }
          : {}),
        ...(weight
          ? {
              fontWeight: weight,
            }
          : {}),
        ...(lineHeight
          ? {
              lineHeight: lineHeight,
            }
          : {}),
        ...style,
      }}
      className={`${className}`}
    >
      {children}
    </Tag>
  );
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  props,
  ref
) {
  const { children, className, style, target, href, onClick } = props;

  return (
    <a
      onClick={onClick}
      className={` ${className}`}
      href={href}
      target={target}
      rel="noopener noreferrer"
      style={style}
      ref={ref}
    >
      {children}
    </a>
  );
});

export default function Typography(props: TypographyProps) {
  const { children, className, style } = props;

  return (
    <div style={style} className={` ${className}`}>
      {children}
    </div>
  );
}

Typography.Title = Title;
Typography.Text = Text;
Typography.Link = Link;
