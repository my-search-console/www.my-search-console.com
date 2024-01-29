import { Link, navigate } from "gatsby"
import React from "react"

import { Container } from "../UI/Container"
import { Logo } from "../UI/Logo"
import { NavLink } from "../general/NavLink"
import { FormattedMessage } from "../general/FormattedMessage/FormattedMessage"
import { useIntl } from "react-intl"

export function Footer() {
  const { locale } = useIntl()

  return (
    <footer className="relative mt-2 border-t border-slate-100 bg-slate-50">
      <Container>
        <div className="py-16">
          <Logo className="mx-auto h-10 w-auto" />

          <nav className="mt-10 text-sm" aria-label="quick links">
            <div className="-my-1 flex flex-wrap justify-center gap-x-6">
              <NavLink href="/analytics/">
                <FormattedMessage id="navbar/analytics" />
              </NavLink>
              <NavLink href="/keywords/">
                <FormattedMessage id="navbar/keywords" />
              </NavLink>
              <NavLink href="/opportunities/">
                <FormattedMessage id="navbar/opportunities" />
              </NavLink>
              <NavLink href="/legal-notice/">
                <FormattedMessage id="footer/legal-notice" />
              </NavLink>
              <NavLink href="/privacy/">
                <FormattedMessage id="footer/privacy" />
              </NavLink>
              <NavLink href="/terms-of-service/">
                <FormattedMessage id="footer/terms-of-use" />
              </NavLink>
              <NavLink href="/pricing/">
                <FormattedMessage id="navbar/pricing" />
              </NavLink>
              <a
                href="/refund/"
                className={
                  "inline-flex h-10 items-center rounded-md px-4 font-display text-sm font-semibold text-slate-900 transition duration-300 ease-in-out hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
                }
              >
                <FormattedMessage id="footer/refund" />
              </a>
            </div>
          </nav>
        </div>
        <div className="flex flex-col items-center border-t border-slate-400/10 py-10 sm:flex-row-reverse sm:justify-between">
          <div className="flex items-center gap-x-6">
            <div className="flex-shrink-0">
              <div
                onClick={() =>
                  navigate(
                    window?.location.pathname + "#change-lang-modal=open"
                  )
                }
                className="cursor-pointer rounded-full border border-slate-200 p-1 shadow-slate-200 transition duration-300 ease-in-out hover:bg-pink-50"
              >
                <img
                  className="rounded-full"
                  alt="choose language"
                  width={28}
                  height={28}
                  src={`/flags/${locale}.svg`}
                />
              </div>
            </div>
          </div>
          <p className="mt-6 text-sm text-slate-500 sm:mt-0">
            <FormattedMessage
              id="footer/message"
              values={{
                a: (children) => (
                  <a
                    href="https://twitter.com/KM_Marques"
                    target="_blank"
                    className="underline"
                  >
                    {children}
                  </a>
                ),
              }}
            />
          </p>
        </div>
      </Container>
    </footer>
  )
}
