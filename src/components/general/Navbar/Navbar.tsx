import { PaymentPlansEntity, UserEntity } from "@foudroyer/interfaces"
import { useLocation } from "@reach/router"
import { navigate } from "gatsby"
import React from "react"
import { buildLinkDependingOnAuthStatus } from "../../../utils/buildLinkDependingOnAuthStatus"
import { getWebsiteIdFromUrl } from "../../../utils/getWebsiteIdFromUrl"
import { UnsubscribeModal } from "../../payment/UnsubscribeModal/UnsubscribeModal"
import { ButtonPrimary } from "../../uiii/Button/Button"
import { Container } from "../../uiii/Container"
import { Logo } from "../../uiii/Logo"
import { Drawer } from "../Drawer/Drawer"
import { FormattedMessage } from "../FormattedMessage/FormattedMessage"
import { FoudroyerLink } from "../FoudroyerLink/FoudroyerLink"
import { Help } from "../Help/Help"
import { NavLink } from "../NavLink"
import { NewsButton } from "../News/components/NewsButton/NewsButton"
import { NewsModal } from "../News/components/NewsModal/NewsModal"
import { SelectLanguageModal } from "../SelectLanguageModal/SelectLanguageModal"
import { connector, ContainerProps } from "./containers/Navbar.container"

export const Wrapper: React.FC<{
  breadcrumb?: Array<{ url: string; label: string }>
  authenticated: boolean
  onLogin: () => void
  onLogout: () => void
  onOpenOnboardingModal: () => void
  onOpenPremiumModal: (params: { isUpsell: boolean }) => void
  plans: Set<PaymentPlansEntity>
  isFetching: boolean
  user: UserEntity | null
}> = (props) => {
  const { href } = useLocation()
  const { websiteId, feature } = getWebsiteIdFromUrl(href || "")

  return (
    <>
      <header className="relative z-30 w-full border-b border-slate-100">
        <Container>
          <nav className="flex justify-between py-4">
            <div className="flex items-center md:gap-x-4">
              <FoudroyerLink to={"/"} ariaLabel="Home link">
                <Logo className="w-8" />
              </FoudroyerLink>

              <div className="hidden items-center lg:flex">
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

                {/* {props.authenticated && (
                  <NavLink
                    isActive={feature === "user"}
                    href={buildLinkDependingOnAuthStatus({
                      isAuth: props.authenticated,
                      website: websiteId,
                      tool: "user",
                      feature,
                    })}
                  >
                    <FormattedMessage id="navbar/settings" />
                  </NavLink>
                )} */}
              </div>
            </div>

            <div className="flex items-center">
              <NewsButton />

              {!props.authenticated && (
                <ButtonPrimary
                  size="sm"
                  onClick={props.onLogin}
                  className="mx-2"
                >
                  <FormattedMessage id="landing/try" />
                </ButtonPrimary>
              )}

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
      <UnsubscribeModal />
      <SelectLanguageModal />
    </>
  )
}

const Connected: React.FC<ContainerProps> = (props) => <Wrapper {...props} />

export const Navbar = connector(Connected)
