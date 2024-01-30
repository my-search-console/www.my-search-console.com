import React from "react"
import { Container } from "../../UI/Container"
import Helmet from "react-helmet"
import { getFaq } from "../../general/Seo/Seo"
import { ITranslations } from "../../../interfaces/ITranslations"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"

const faqs: Array<{
  question: ITranslations["keys"]
  answer: ITranslations["keys"]
}> = [
  {
    question: "faq/indexation-success-rate/question",
    answer: "faq/indexation-success-rate/answer",
  },
  {
    question: "faq/indexation-indexing-api/question",
    answer: "faq/indexation-indexing-api/answer",
  },
  {
    question: "faq/indexation-how-many-time/question",
    answer: `faq/indexation-how-many-time/answer`,
  },
  {
    question: "faq/indexation-trust/question",
    answer: `faq/indexation-trust/answer`,
  },
  {
    question: "faq/indexation-pricing/question",
    answer: `faq/indexation-pricing/answer`,
  },
]

export const Faq = () => {
  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(getFaq(faqs))}
        </script>
      </Helmet>

      <Container>
        <div className="mx-auto w-full max-w-3xl px-6 py-24 lg:px-8">
          <div className="mx-auto">
            <h2 className="relative text-center font-display text-4xl font-semibold leading-tight tracking-tight text-slate-900">
              <FormattedMessage id="faq/title" />
            </h2>

            <dl className="mt-20 space-y-10 divide-y divide-slate-900/5">
              {faqs.map((faq, index) => (
                <div key={index} className="flex pt-10">
                  <div className="mr-10 font-display text-2xl font-semibold text-blue-300">
                    0{index + 1}
                  </div>
                  <div>
                    <dt className="">
                      <div className="flex w-full items-start justify-between text-left text-slate-900">
                        <h3 className="font-display text-2xl font-semibold">
                          <FormattedMessage id={faq.question} />
                        </h3>
                      </div>
                    </dt>
                    <dd className="mt-2">
                      <p className="text-base text-slate-500">
                        <FormattedMessage id={faq.answer} />
                      </p>
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </>
  )
}
