import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import { Loader } from "../components/general/Loader/Loader"
import { Seo } from "../components/general/Seo/Seo"
import { ButtonPrimary } from "../components/ui/Button/Button"

const NotFoundPage = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 5000)
  }, [])

  return (
    <>
      <Seo
        title="Not found"
        description={"This page is a not found page"}
        lang={"en"}
        index={false}
        langUrls={[]}
      />

      {loading && <Loader />}
      {!loading && (
        <section className="relative bg-white py-24 md:py-44 lg:flex lg:h-screen lg:py-0">
          <div className="container relative z-10 mx-auto px-4 lg:m-auto">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="mb-4 mt-2 font-display text-4xl font-bold leading-tight tracking-tighter md:text-5xl">
                Page not found
              </h2>
              <p className="mb-12 text-lg text-slate-500 md:text-xl">
                I wonder why you came here ? We are sorry if the website is
                broken.
              </p>
              <div className="flex flex-wrap justify-center">
                <Link to="/">
                  <ButtonPrimary>Go to the home page</ButtonPrimary>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default NotFoundPage
