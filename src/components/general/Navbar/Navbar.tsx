import React, { ReactNode } from "react"
import { Fragment } from "react"
import { Container } from "../../UI/Container"
import { LogoFace } from "../../UI/Logo"
import { NavLink } from "../NavLink"
import { Link, navigate } from "gatsby"
import { ContainerProps, connector } from "./containers/Navbar.container"
import { useLocation } from "@reach/router"
import { getWebsiteIdFromUrl } from "../../../utils/getWebsiteIdFromUrl"
import { Menu, Transition } from "@headlessui/react"
import classNames from "classnames"
import { FormattedMessage } from "../FormattedMessage/FormattedMessage"
import { FoudroyerLink } from "../FoudroyerLink/FoudroyerLink"
import { useIntl } from "react-intl"
import { SelectLanguageModal } from "../SelectLanguageModal/SelectLanguageModal"
import { buildLinkDependingOnAuthStatus } from "../../../utils/buildLinkDependingOnAuthStatus"
import { PaymentPlansEntity, UserEntity } from "@foudroyer/interfaces"
import { ButtonPrimary, ButtonSecondary } from "../../UI/Button/Button"
import {
  BoltIcon,
  HashtagIcon,
  TrophyIcon,
  ChartBarIcon,
  ChevronDownIcon,
  UserIcon,
} from "@heroicons/react/20/solid"
import clsx from "clsx"
import { NewsButton } from "../News/components/NewsButton/NewsButton"
import { normalizeUrl } from "../../../utils/normalizeUrl"

const Item: React.FC<{
  title: ReactNode
  to: string
  description: ReactNode
  icon: ReactNode
  theme: "pink" | "emerald" | "blue" | "orange"
}> = (props) => (
  <div className="p-1">
    <Link
      to={props.to}
      className={clsx(
        "group flex w-full items-start rounded p-4 transition-all duration-300 ease-in-out ",
        props.theme === "pink" && "hover:bg-pink-50",
        props.theme === "emerald" && "hover:bg-emerald-50",
        props.theme === "orange" && "hover:bg-orange-50",
        props.theme === "blue" && "hover:bg-blue-50"
      )}
    >
      <span
        className={clsx(
          "mt-1 flex-shrink-0  transition-all duration-300 ease-in-out ",
          props.theme === "pink" && " text-pink-400",
          props.theme === "emerald" && "text-emerald-400",
          props.theme === "orange" && "text-orange-400",
          props.theme === "blue" && "text-blue-400"
        )}
      >
        {props.icon}
      </span>
      <div className="pl-4">
        <p
          className={clsx(
            "font-display text-sm font-semibold text-slate-900 transition-all duration-300 ease-in-out ",
            props.theme === "pink" && "group-hover:text-pink-400",
            props.theme === "emerald" && "group-hover:text-emerald-400",
            props.theme === "orange" && "group-hover:text-orange-400",
            props.theme === "blue" && "group-hover:text-blue-400"
          )}
        >
          {props.title}
        </p>
        <p
          className={clsx(
            "text-xs text-slate-600 transition-all duration-300 ease-in-out ",
            props.theme === "pink" && " group-hover:text-pink-400",
            props.theme === "emerald" && "group-hover:text-emerald-400",
            props.theme === "orange" && "group-hover:text-orange-400",
            props.theme === "blue" && "group-hover:text-blue-400"
          )}
        >
          {props.description}
        </p>
      </div>
    </Link>
  </div>
)

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
  const breadcrumb = props.breadcrumb || []
  const { href } = useLocation()
  const { websiteId, feature } = getWebsiteIdFromUrl(href || "")
  const { locale } = useIntl()
  const isPremium = props.plans.size > 0

  return (
    <>
      <header className="relative z-30 w-full border-b border-slate-100">
        <Container>
          <nav className="flex justify-between py-4">
            <div className="flex items-center md:gap-x-4">
              <FoudroyerLink
                to={"/"}
                className="flex items-center font-display text-xs"
                ariaLabel="Home link"
              >
                <LogoFace className="w-7" />
              </FoudroyerLink>

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

              <NavLink
                isActive={feature === "opportunities"}
                href={buildLinkDependingOnAuthStatus({
                  isAuth: props.authenticated,
                  website: websiteId,
                  tool: "opportunities",
                  feature,
                })}
              >
                <FormattedMessage id="navbar/opportunities" />
              </NavLink>

              {(!props.authenticated || !isPremium) && (
                <NavLink href={"/pricing/"}>
                  <FormattedMessage id="navbar/pricing" />
                </NavLink>
              )}

              {props.authenticated && (
                <NavLink
                  isActive={feature === "settings"}
                  href={buildLinkDependingOnAuthStatus({
                    isAuth: props.authenticated,
                    website: websiteId,
                    tool: "settings",
                    feature,
                  })}
                >
                  <FormattedMessage id="navbar/settings" />
                </NavLink>
              )}
            </div>

            <div className="flex items-center gap-x-4 md:gap-x-2">
              {!isPremium && props.authenticated && (
                <ButtonSecondary
                  size="sm"
                  onClick={() => props.onOpenPremiumModal({ isUpsell: false })}
                >
                  Free
                </ButtonSecondary>
              )}
              {props.plans.has(PaymentPlansEntity.newbie) && (
                <ButtonSecondary
                  size="sm"
                  onClick={() => props.onOpenPremiumModal({ isUpsell: true })}
                >
                  Newbie
                </ButtonSecondary>
              )}
              {props.plans.has(PaymentPlansEntity.indexation) && (
                <ButtonSecondary
                  size="sm"
                  onClick={() => props.onOpenPremiumModal({ isUpsell: true })}
                >
                  Pro
                </ButtonSecondary>
              )}

              {props.plans.has(PaymentPlansEntity.enterprise) && (
                <ButtonSecondary size="sm">Enterprise</ButtonSecondary>
              )}

              {props.authenticated && (
                <>
                  <Menu as="div" className="relative">
                    <Menu.Button
                      className="flex items-center"
                      aria-label="Main menu"
                    >
                      <ButtonSecondary size="sm">
                        <UserIcon className="h-5 w-5" />
                      </ButtonSecondary>
                    </Menu.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white font-display font-medium shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {props.user && (
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href={`https://go.crisp.chat/chat/embed/?website_id=b5235ee2-e9d5-4d06-9c92-488f64e57c8d&user_email=${props.user?.email}&token_id=${props.user?.id}&session_merge=true&crisp_sid=${props.user?.id}`}
                                  className={classNames(
                                    active ? "bg-pink-100 text-pink-500" : "",
                                    "block w-full px-4  py-2 text-left text-sm transition-all duration-300 ease-in-out"
                                  )}
                                  target="_blank"
                                  aria-label="Help link"
                                >
                                  <FormattedMessage id="home/navbar/help"></FormattedMessage>
                                </a>
                              )}
                            </Menu.Item>
                          )}

                          <Menu.Item>
                            {({ active }) => (
                              <a
                                className={classNames(
                                  active ? "bg-pink-100 text-pink-500" : "",
                                  "block w-full px-4  py-2 text-left text-sm transition-all duration-300 ease-in-out"
                                )}
                                href="/administration?tool=settings"
                              >
                                <FormattedMessage id="navbar/settings"></FormattedMessage>
                              </a>
                            )}
                          </Menu.Item>

                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={classNames(
                                  active ? "bg-pink-100 text-pink-500" : "",
                                  "block w-full px-4  py-2 text-left text-sm transition-all duration-300 ease-in-out"
                                )}
                                onClick={() => props.onLogout()}
                              >
                                <FormattedMessage id="home/navbar/logout"></FormattedMessage>
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </>
              )}

              {!props.authenticated && (
                <ButtonPrimary size="sm" onClick={props.onLogin}>
                  <FormattedMessage id="landing/try" />
                </ButtonPrimary>
              )}

              <div className="flex-shrink-0">
                <button
                  onClick={() =>
                    navigate(
                      window?.location.pathname + "#change-lang-modal=open"
                    )
                  }
                  className="cursor-pointer rounded-full border border-slate-200 p-1 shadow-slate-200 transition duration-300 ease-in-out hover:bg-slate-100"
                >
                  <img
                    className="rounded-full"
                    alt="choose language"
                    width={28}
                    height={28}
                    src={`/flags/${locale}.svg`}
                  />
                </button>
              </div>
            </div>
          </nav>
        </Container>

        {breadcrumb && breadcrumb.length > 0 && (
          <div className="whitespace-nowrap border-b border-slate-100">
            <Container>
              <div className="max-w-container mx-auto flex justify-between space-x-8 py-3 text-sm font-medium leading-6 text-slate-900">
                <div className="flex items-center space-x-2">
                  {breadcrumb.map(({ url, label }, index) => (
                    <Fragment key={index}>
                      {index > 0 && <span className="text-slate-200">/</span>}
                      <NavLink
                        href={url}
                        disabled={index === breadcrumb.length - 1}
                      >
                        {label}
                      </NavLink>
                    </Fragment>
                  ))}
                </div>
              </div>
            </Container>
          </div>
        )}
      </header>

      <SelectLanguageModal />
    </>
  )
}

const Connected: React.FC<ContainerProps> = (props) => <Wrapper {...props} />

export const Navbar = connector(Connected)
