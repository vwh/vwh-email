"use client";

interface HtmlEmailProps {
  html: string;
}

export default function HtmlEmail({ html }: HtmlEmailProps) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
