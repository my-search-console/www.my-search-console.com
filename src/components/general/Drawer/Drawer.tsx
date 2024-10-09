import { Dialog, Transition } from "@headlessui/react"
import { useLocation } from "@reach/router"
import React, { Fragment } from "react"
import * as Components from "./components"

import { UserEntity } from "@foudroyer/interfaces"
import { navigate } from "gatsby"
import { useIntl } from "react-intl"
import logo from "../../../assets/logo/logo.svg"
import { buildLinkDependingOnAuthStatus } from "../../../utils/buildLinkDependingOnAuthStatus"
import { getCrispUrl } from "../../../utils/crisp"
import { ButtonPrimary } from "../../ui/Button/Button"
import { Avatar } from "../Avatar/Avatar"
import { FormattedMessage } from "../FormattedMessage/FormattedMessage"
import { connector, ContainerProps } from "./containers/Drawer.container"

export type DrawerProps = {
  user: UserEntity | null
  websiteId: string | null
  onLoginWithGoogle: () => void
  onLogout: () => void
}

export const Wrapper: React.FC<DrawerProps> = (props) => {
  const location = useLocation()
  const { locale } = useIntl()

  const isOpen = location.href?.includes("menu=open") || false

  const onClose = () => window?.history.back()

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className={`fixed inset-0 z-50 overflow-y-auto font-display`}
        onClose={() => window?.history.back()}
      >
        <div className="min-h-screen p-2 text-center sm:block">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-slate-900 bg-opacity-90 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative mx-auto max-w-3xl rounded-lg shadow-lg">
              <div className="shadow-xs divide-y-2 divide-slate-50 rounded-lg   bg-white">
                <div className="space-y-6 px-5 pb-6 pt-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <img
                        className="h-8 w-auto"
                        src={logo}
                        alt="Sudoku Academy"
                      />
                    </div>
                    <div className="-mr-2">
                      <button
                        type="button"
                        onClick={onClose}
                        className=":bg-slate-900 :text-slate-100 inline-flex items-center justify-center rounded-md p-2 text-slate-400 transition   duration-150  ease-in-out    hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 focus:outline-none"
                      >
                        <svg
                          className="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {props.user && (
                    <div className="flex w-full items-center">
                      <div className="flex items-center justify-center">
                        <Avatar size={72} name={props.user.email} />
                      </div>
                      <div className="ml-4 text-left">
                        <div className="font-display font-medium text-slate-900">
                          {props.user.username}
                        </div>
                        <div className="font-display text-sm text-slate-500">
                          {props.user.email}
                        </div>
                        {/* <div className="text-xs text-pink-500">
                          <PlanNavbarButton readonly />
                        </div> */}
                      </div>
                    </div>
                  )}

                  <div>
                    <nav className="grid gap-6">
                      <Components.Item
                        title={<FormattedMessage id="navbar/analytics" />}
                        to={buildLinkDependingOnAuthStatus({
                          isAuth: !!props.user,
                          website: props.websiteId,
                          tool: "analytics",
                          feature: "analytics",
                        })}
                        icon={
                          <>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
                            />
                          </>
                        }
                      />

                      <Components.Item
                        title={<FormattedMessage id="navbar/keywords" />}
                        to={buildLinkDependingOnAuthStatus({
                          isAuth: !!props.user,
                          website: props.websiteId,
                          tool: "keywords",
                          feature: "keywords",
                        })}
                        icon={
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5"
                          />
                        }
                      />

                      {/* {props.user && (
                        <Components.Item
                          title={<FormattedMessage id="navbar/settings" />}
                          to={`/user/`}
                          icon={
                            <>
                              <path
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                              />
                              <path
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                            </>
                          }
                        />
                      )} */}

                      {props.user && (
                        <Components.Item
                          title={<FormattedMessage id="home/navbar/help" />}
                          target="_blank"
                          to={getCrispUrl(props.user)}
                          icon={
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16.712 4.33a9.027 9.027 0 0 1 1.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 0 0-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 0 1 0 9.424m-4.138-5.976a3.736 3.736 0 0 0-.88-1.388 3.737 3.737 0 0 0-1.388-.88m2.268 2.268a3.765 3.765 0 0 1 0 2.528m-2.268-4.796a3.765 3.765 0 0 0-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 0 1-1.388.88m2.268-2.268 4.138 3.448m0 0a9.027 9.027 0 0 1-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0-3.448-4.138m3.448 4.138a9.014 9.014 0 0 1-9.424 0m5.976-4.138a3.765 3.765 0 0 1-2.528 0m0 0a3.736 3.736 0 0 1-1.388-.88 3.737 3.737 0 0 1-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 0 1-1.652-1.306 9.027 9.027 0 0 1-1.306-1.652m0 0 4.138-3.448M4.33 16.712a9.014 9.014 0 0 1 0-9.424m4.138 5.976a3.765 3.765 0 0 1 0-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 0 1 1.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 0 0-1.652 1.306A9.025 9.025 0 0 0 4.33 7.288"
                            />
                          }
                        />
                      )}

                      {!props.user && (
                        <Components.Item
                          title={<FormattedMessage id="home/navbar/help" />}
                          target="_blank"
                          to={getCrispUrl(props.user)}
                          icon={
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16.712 4.33a9.027 9.027 0 0 1 1.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 0 0-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 0 1 0 9.424m-4.138-5.976a3.736 3.736 0 0 0-.88-1.388 3.737 3.737 0 0 0-1.388-.88m2.268 2.268a3.765 3.765 0 0 1 0 2.528m-2.268-4.796a3.765 3.765 0 0 0-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 0 1-1.388.88m2.268-2.268 4.138 3.448m0 0a9.027 9.027 0 0 1-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0-3.448-4.138m3.448 4.138a9.014 9.014 0 0 1-9.424 0m5.976-4.138a3.765 3.765 0 0 1-2.528 0m0 0a3.736 3.736 0 0 1-1.388-.88 3.737 3.737 0 0 1-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 0 1-1.652-1.306 9.027 9.027 0 0 1-1.306-1.652m0 0 4.138-3.448M4.33 16.712a9.014 9.014 0 0 1 0-9.424m4.138 5.976a3.765 3.765 0 0 1 0-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 0 1 1.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 0 0-1.652 1.306A9.025 9.025 0 0 0 4.33 7.288"
                            />
                          }
                        />
                      )}

                      {!props.user && (
                        <ButtonPrimary
                          onClick={props.onLoginWithGoogle}
                          fullWidth
                          className="-m-2"
                        >
                          <FormattedMessage id="navbar/login" />
                        </ButtonPrimary>
                      )}

                      {props.user && (
                        <Components.Clickable
                          title={<FormattedMessage id="home/navbar/logout" />}
                          onClick={props.onLogout}
                          icon={
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                            />
                          }
                        />
                      )}

                      <div
                        onClick={() =>
                          navigate(
                            window?.location.pathname +
                              "#change-lang-modal=open"
                          )
                        }
                        className=":bg-slate-900 -m-3 flex cursor-pointer items-center space-x-4 rounded p-3 py-4 transition duration-150  ease-in-out hover:bg-slate-100"
                      >
                        <div
                          className={`flex flex-shrink-0 items-center text-slate-800`}
                        >
                          <img
                            className="h-6 w-6 rounded-full"
                            alt="choose language"
                            src={`/flags/${locale}.svg`}
                          />
                        </div>
                        <div className="text-base font-medium leading-6 text-slate-800">
                          <FormattedMessage id="drawer/change-lang" />
                        </div>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const Drawer = connector(Container)
