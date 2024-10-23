import * as React from "react"

import { NavigationMenuLink } from "@/components/ui/navigation-menu"

import { cn } from "@/lib/utils"
import { navigate } from "gatsby"
import { ButtonSecondary } from "../../ui/Button/Button"
import { Container } from "../../ui/Container"
import { Logo } from "../../ui/Logo"
import { Drawer } from "../Drawer/Drawer"
import { FormattedMessage } from "../FormattedMessage/FormattedMessage"
import { FoudroyerLink } from "../FoudroyerLink/FoudroyerLink"
import { Help } from "../Help/Help"
import { NewsButton } from "../News/components/NewsButton/NewsButton"
import { NewsModal } from "../News/components/NewsModal/NewsModal"
import { SelectLanguageModal } from "../SelectLanguageModal/SelectLanguageModal"
import { connector, ContainerProps } from "./containers/Navbar.container"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

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

              {/* <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      Getting started
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <a
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                              href="/"
                            >
                              <Logo className="h-6 w-6" />
                              <div className="mb-2 mt-4 text-lg font-medium">
                                My Search Console
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                Beautifully designed components that you can
                                copy and paste into your apps. Accessible.
                                Customizable. Open Source.
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <ListItem href="/docs" title="Introduction">
                          Re-usable components built using Radix UI and Tailwind
                          CSS.
                        </ListItem>
                        <ListItem
                          href="/docs/installation"
                          title="Installation"
                        >
                          How to install dependencies and structure your app.
                        </ListItem>
                        <ListItem
                          href="/docs/primitives/typography"
                          title="Typography"
                        >
                          Styles for headings, paragraphs, lists...etc
                        </ListItem>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                        {components.map((component) => (
                          <ListItem
                            key={component.title}
                            title={component.title}
                            href={component.href}
                          >
                            {component.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <a href="/docs">
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Documentation
                      </NavigationMenuLink>
                    </a>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu> */}
            </div>
            <div className="flex items-center gap-x-2">
              <NewsButton />

              {!props.authenticated && (
                <ButtonSecondary onClick={props.onLogin} size="sm">
                  <FormattedMessage id="navbar/login" />
                </ButtonSecondary>
              )}

              <button
                type="button"
                name="menu"
                aria-label="menu"
                onClick={() =>
                  navigate(window?.location.pathname + "#menu=open")
                }
                className="inline-flex items-center justify-center rounded p-2 text-slate-900 transition duration-300 ease-in-out   hover:bg-pink-50  hover:text-pink-500 focus:outline-none"
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

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export const Navbar = connector(Wrapper)
