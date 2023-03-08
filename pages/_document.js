import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html style={{ scrollBehavior: "auto" }}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
