import { navigate } from "gatsby"
import React from "react"

import { Link } from "@reach/router"
import { useIntl } from "react-intl"
import languages from "../../constants/languages.json"
import { FormattedMessage } from "../general/FormattedMessage/FormattedMessage"
import { NavLink } from "../general/NavLink"
import { Container } from "../ui/Container"
import { Logo } from "../ui/Logo"

export function Footer() {
  const { locale } = useIntl()

  return (
    <footer className="mt-2 border-t border-slate-100 bg-slate-50">
      <Container>
        <div className="py-16">
          <Logo className="mx-auto h-10 w-auto" />

          <nav className="mt-10 text-sm" aria-label="quick links">
            {/* <div className="flex flex-wrap justify-center gap-x-6">
              <NavLink href="/analytics/">
                <FormattedMessage id="navbar/analytics" />
              </NavLink>
              <NavLink href="/keywords/">
                <FormattedMessage id="navbar/keywords" />
              </NavLink>
            </div> */}
            <div className="flex flex-wrap justify-center gap-x-6">
              <NavLink href="/legal-notice/">
                <FormattedMessage id="footer/legal-notice" />
              </NavLink>
              <NavLink href="/privacy/">
                <FormattedMessage id="footer/privacy" />
              </NavLink>
              <NavLink href="/terms-of-service/">
                <FormattedMessage id="footer/terms-of-use" />
              </NavLink>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6">
              {languages.map((lang) => (
                <Link
                  className="inline-flex  hover:bg-pink-50 hover:text-pink-400 h-10 items-center rounded-md px-4 font-display text-sm font-semibold transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2"
                  to={`/${lang.id}/`}
                >
                  {lang.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
        <div className="flex flex-col items-center border-t border-slate-400/10 py-10 sm:flex-row-reverse sm:justify-between">
          <div className="flex items-center gap-x-6">
            <a
              href={"https://twitter.com/KM_Marques"}
              target="_blank"
              aria-label="Twitter"
              className="group"
            >
              <svg
                aria-hidden="true"
                className="h-6 w-6 fill-slate-500 group-hover:fill-sky-400"
              >
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0 0 22 5.92a8.19 8.19 0 0 1-2.357.646 4.118 4.118 0 0 0 1.804-2.27 8.224 8.224 0 0 1-2.605.996 4.107 4.107 0 0 0-6.993 3.743 11.65 11.65 0 0 1-8.457-4.287 4.106 4.106 0 0 0 1.27 5.477A4.073 4.073 0 0 1 2.8 9.713v.052a4.105 4.105 0 0 0 3.292 4.022 4.093 4.093 0 0 1-1.853.07 4.108 4.108 0 0 0 3.834 2.85A8.233 8.233 0 0 1 2 18.407a11.615 11.615 0 0 0 6.29 1.84" />
              </svg>
            </a>

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
          <p className="mt-6 inline-block text-sm text-slate-500 sm:mt-0">
            <FormattedMessage
              id="footer/copy"
              values={{
                a: (props) => {
                  return (
                    <a
                      href="https://twitter.com/KM_Marques"
                      target="_blank"
                      className="underline"
                    >
                      {props}
                    </a>
                  )
                },
              }}
            />
          </p>
        </div>
      </Container>
    </footer>
  )
}
