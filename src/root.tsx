// @refresh reload
import { Suspense } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import { HttpHeader } from "solid-start/server";

import Footer from "./components/Footer";

import "./root.css";
import "./client-polyfills";

export default function Root() {
  return (
    <>
      <HttpHeader
        name="Cache-Control"
        value="s-maxage=86400000, stale-while-revalidate"
      />
      <Html lang="en" class="h-screen">
        <Head>
          <Title>My Wedding Playlist Requests</Title>
          <Meta charset="utf-8" />
          <Meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Body class="h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-400 to-rose-400">
          <Suspense>
            <ErrorBoundary>
              <Routes>
                <FileRoutes />
              </Routes>
              <Footer />
            </ErrorBoundary>
          </Suspense>
          <Scripts />
        </Body>
      </Html>
    </>
  );
}
