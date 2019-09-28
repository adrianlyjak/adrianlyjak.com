import React from "react"
import Head from "next/head"
import { useRouter } from 'next/router'
import "./css/main.css"
import Logo from "./Logo"

export function App ({ children }) {

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css?family=Playfair+Display&display=swap" rel="stylesheet" />
      </Head>
      <AppContainer>
        <Nav>
          <NavItem><Logo /></NavItem>
          <NavItem><NavAnchor path="/">Home</NavAnchor></NavItem>
          <NavItem><NavAnchor path="/game">One</NavAnchor></NavItem>
          <NavItem><NavAnchor path="/game">Two</NavAnchor></NavItem>
        </Nav>
        <AppContent>{children}</AppContent>
      </AppContainer>
    </>
  )
}

function AppContainer({ children }) {
  return <div className="max-w-5xl px-4 lg:px-0 mx-auto">{children}</div>
}

function AppContent({ children }) {
  return <section className="pt-6">{children}</section>
}

function Nav({ children }) {
  return <div className="mt-4"><ul className="d-flex mt-4 font-sans flex-row list-none justify-around border-t border-gray-700" role="navigation">
    {children}
  </ul></div>
}

function NavItem({ children }) {
  return <li className="inline-block flex-auto ">
    {children}
  </li>
}

function NavAnchor({ children, path }: { children: any, path: string }) {
  const router = useRouter();
  const active = path == router.pathname;
  return <a 
    href={path}
    className={`cursor-pointer inline-block m-1 p-3 px-2 border-t hover:border-t ${active ? "border-gray-500" : "border-transparent hover:border-gray-600"}`}
  >
    {children}
  </a>
}