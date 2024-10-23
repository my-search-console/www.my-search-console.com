import { navigate } from "gatsby"
import React from "react"
import { Container } from "../../ui/Container"
import { Logo } from "../../ui/Logo"
import { Drawer } from "../Drawer/Drawer"
import { FoudroyerLink } from "../FoudroyerLink/FoudroyerLink"
import { Help } from "../Help/Help"
import { NewsButton } from "../News/components/NewsButton/NewsButton"
import { NewsModal } from "../News/components/NewsModal/NewsModal"
import { SelectLanguageModal } from "../SelectLanguageModal/SelectLanguageModal"
import { connector, ContainerProps } from "./containers/Navbar.container"

export const Wrapper: React.FC<ContainerProps> = (props) => {
  return (
    <>
      <header
        id="navbar"
        className="relative z-30 w-full border-b border-slate-100"
      >
        <Container>
          <nav className="flex justify-between py-4">
            <div className="flex items-center md:gap-x-4">
              <FoudroyerLink to={"/"} ariaLabel="Home link">
                <Logo className="w-8" />
              </FoudroyerLink>

              {/* <div className="hidden items-center lg:flex">
                <NavLink
                  isActive={feature === "analytics"}
                  href={buildLinkDependingOnAuthStatus({
                    isAuth: props.authenticated,
                    website: websiteId,
                    tool: "analytics",
                    feature,
                  })}
                >
                  <FormattedMessage id="navbar/analytics" />
                </NavLink>

                <NavLink
                  isActive={feature === "keywords"}
                  href={buildLinkDependingOnAuthStatus({
                    isAuth: props.authenticated,
                    website: websiteId,
                    tool: "keywords",
                    feature,
                  })}
                >
                  <FormattedMessage id="navbar/keywords" />
                </NavLink>
              </div> */}
            </div>

            <div className="flex items-center">
              <NewsButton />

              <button
                type="button"
                name="menu"
                aria-label="menu"
                onClick={() =>
                  navigate(window?.location.pathname + "#menu=open")
                }
                className="inline-flex items-center justify-center rounded p-3 text-slate-900 transition duration-300 ease-in-out   hover:bg-pink-50  hover:text-pink-500 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </nav>
        </Container>
      </header>

      <NewsModal />
      <Drawer />
      <Help />
      <SelectLanguageModal />
    </>
  )
}

const Connected: React.FC<ContainerProps> = (props) => <Wrapper {...props} />

export const Navbar = connector(Connected)
