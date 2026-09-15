import type { ElementType, HTMLAttributes } from "react";

type HtmlProps = {
  html: string;
  as?: ElementType;
} & HTMLAttributes<HTMLElement>;

export function Html({ html, as: Tag = "span", ...rest }: HtmlProps) {
  return <Tag {...rest} dangerouslySetInnerHTML={{ __html: html }} />;
}
