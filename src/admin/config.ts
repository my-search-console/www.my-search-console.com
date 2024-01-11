import { languagesAvailable } from "../constants/langs"

type Collection = {
  name: string
  summary?: string
  label: string
  sortable_fields?: string[]
  view_groups?: { label: string; field: string }[]
  view_filter?: { label: string; field: string; pattern: string | boolean }[]
  folder?: string
  create?: boolean
  slug?: string
  format?: string
  editor?: any
  fields?: Array<any>
  files?: Array<any>
}

const StringElement = ({
  label,
  name,
  defaultValue = "default text",
  hint = null,
  required = true,
}) => ({
  label,
  name,
  widget: "string",
  default: defaultValue,
  required,
  ...(hint ? { hint } : {}),
})

const NumberElement = ({
  label,
  name,
  defaultValue,
  valueType = "int",
  min = 0,
  max,
}) => ({
  label,
  name,
  widget: "number",
  default: defaultValue,
  value_type: valueType,
  max,
  min,
})

const UrlElement = (props: { optional?: boolean }) => ({
  label: "url",
  name: "url",
  widget: "string",
  hint: "The url must not begin with a slash /",
  required: props.optional ? false : true,
})

const UrlExternalElement = () => ({
  label: "url",
  name: "url",
  widget: "string",
  pattern: [
    "(^/)|(^https?.+)",
    "The url has to begin with a slash / for internal links, and http(s) for external links",
  ],
  hint: "The url has to begin with a slash / for internal links, and http(s) for external links",
})

const MarkdownElement = ({
  label,
  name,
  minimal = true,
  defaultValue = `Welcome to the edition mode! \n\nWhen you add links in your content, you can add nofollow links, obfuscation and more. \n\nIf you want **nofollow** or **obfuscation** on your links, add *$obfuscated* or *$nofollow* in the URL. \n\n**List of options** \n\n- [https://www.foudroyer.com$nofollow](https://www.foudroyer.com$nofollow) \n- [https://www.foudroyer.com$obfuscated](https://www.foudroyer.com$obfuscated)`,
  buttons = [
    "bold",
    "italic",
    "code",
    "link",
    "bulleted-list",
    "numbered-list",
  ],
}) => ({
  label,
  name,
  widget: "markdown",
  editor_components: [],
  modes: ["rich_text"],
  buttons,
  minimal,
  default: defaultValue,
})

const TagElement = ({
  label,
  name,
  fields = [],
  options = ["h1", "h2", "h3", "h4", "h5", "h6", "p"],
  defaultValue = "p",
}: {
  label: string
  name: string
  fields?: Array<any>
  options?: Array<string>
  defaultValue?: string
}) => ({
  label: label,
  name: name,
  widget: "object",

  summary: "{{fields.value}}",
  fields: [
    {
      label: "value",
      name: "value",
      widget: "string",
      default: "default text",
    },
    {
      label: "component",
      name: "component",
      widget: "select",
      hint: "HTML tag that will be used",
      options,
      default: defaultValue,
    },
    ...fields,
  ],
})

const ImageElement = ({
  label,
  name,
  hint = "The image should have a max with as 1200px. You can use https://www.iloveimg.com/resize-image for online resizer.",
  fields = [],
  required = true,
}) => ({
  label: label,
  name: name,
  widget: "object",
  summary: "{{fields.src}}",
  fields: [
    {
      label: "src",
      name: "src",
      widget: "image",
      choose_url: false,
      hint,
      required,
      media_library: {
        config: {
          max_file_size: 512000,
        },
      },
    },
    {
      label: "alt",
      name: "alt",
      widget: "string",
      default: "default alt",
    },
    ...fields,
  ],
})

const RelElement = () => ({
  label: "Rel",
  name: "rel",
  widget: "select",
  options: ["follow", "no-follow", "obfuscated"],
  default: "follow",
})

const TargetElement = () => ({
  label: "Target",
  name: "target",
  widget: "select",
  options: ["self", "blank"],
  default: "self",
})

const FaqElement = ({ label, name }) => ({
  label,
  name,
  widget: "list",
  fields: [
    {
      label: "question",
      name: "question",
      widget: "string",
      default: "The question",
    },
    {
      label: "answer",
      name: "answer",
      widget: "string",
      default: "The answer",
    },
    {
      label: "component",
      name: "component",
      widget: "select",
      hint: "html tag that will be used for the question element",
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "p"],
      default: "p",
    },
  ],
})

const MetaElement = ({ fields = [] }) => ({
  label: "meta",
  name: "meta",
  widget: "object",
  fields: [
    {
      label: "title",
      name: "title",
      widget: "string",
    },
    {
      label: "description",
      name: "description",
      widget: "string",
    },
    {
      label: "indexable",
      name: "indexable",
      widget: "boolean",
      default: true,
    },
    ...(fields || []),
  ],
})

const LinkElement = ({
  label,
  name,
  fields = [],
}: {
  label?: string
  name?: string
  fields: any[]
}) => ({
  label,
  name,
  widget: "object",
  summary: "{{fields.label}}",

  fields: [
    {
      label: "Label",
      name: "label",
      widget: "string",
      default: "default text",
    },
    UrlExternalElement(),
    RelElement(),
    TargetElement(),
    ...fields,
  ],
})

const PublicationDateElements = () => [
  {
    label: "Published At",
    name: "published_at",
    widget: "datetime",
    date_format: "DD.MM.YYYY",
    time_format: "HH:mm",
    picker_utc: false,
  },
  {
    label: "Updated At",
    name: "updated_at",
    widget: "datetime",
    date_format: "DD.MM.YYYY",
    time_format: "HH:mm",
    picker_utc: false,
  },
]

const IdElement = () => ({
  label: "id",
  name: "id",
  widget: "uuid",
  hint: "This unique id was generated automacally, you cannot modify it",
})

const VersionElement = () => ({
  label: "version",
  name: "version",
  widget: "select",
  options: ["v1", "v2"],
})

const BooleanElement = ({ label, name }) => ({
  label,
  name,
  widget: "boolean",
  default: false,
})

const TypeElement = ({ value }) => ({
  label: "type",
  name: "type",
  widget: "hidden",
  default: value,
})

const LangElement = () => ({
  label: "lang",
  name: "lang",
  widget: "select",
  options: languagesAvailable,
})

const MarketingHero = {
  label: "💅 Hero",
  name: "marketing/hero",
  widget: "object",
  summary: "{{fields.title.value}}",
  fields: [
    TagElement({ label: "Label", name: "label" }),
    TagElement({ label: "Title", name: "title" }),
    MarkdownElement({
      label: "Description",
      name: "description",
      buttons: ["bold", "italic", "link"],
      defaultValue:
        "We’re different. Flex is the only saas business platform that lets you run your business on one platform, seamlessly across all digital channels.",
    }),
  ],
}

const MarketingTitle = {
  label: "💅 Title",
  name: "marketing/title",
  widget: "object",
  summary: "{{fields.title.value}}",
  fields: [TagElement({ label: "Title", name: "title" })],
}

const MarketingText = {
  label: "💅 Text",
  name: "marketing/text",
  widget: "object",
  summary: "{{fields.title.value}}",
  fields: [MarkdownElement({ label: "value", name: "value" })],
}

const MarketingAuthor = {
  label: "💅 Author",
  name: "marketing/author",
  widget: "object",
  summary: "{{fields.title.value}}",
  fields: [
    ImageElement({ label: "illustration", name: "illustration" }),
    StringElement({ name: "name", label: "name" }),
  ],
}

const VideoElements = () => [
  BooleanElement({ label: "autoplay", name: "autoplay" }),
  {
    label: "src",
    name: "src",
    widget: "file",
    choose_url: false,
  },
  {
    label: "illustration",
    name: "illustration",
    widget: "image",
    choose_url: false,
    media_library: {
      config: {
        max_file_size: 512000,
      },
    },
  },
  {
    label: "alt",
    name: "alt",
    widget: "string",
    default: "default alt",
  },
]

const MarketingVideo = {
  label: "💅 Video",
  name: "marketing/video",
  fields: [...VideoElements()],
}

const MarketingPricing = {
  label: "💅 Pricing",
  name: "marketing/pricing",
  fields: [BooleanElement({ label: "show", name: "show" })],
}

const MarketingFaq = {
  label: "💅 Faq",
  name: "marketing/faq",
  fields: [BooleanElement({ label: "show", name: "show" })],
}

const MarketingTestimonials = {
  label: "💅 Testimonials",
  name: "marketing/testimonials",
  fields: [BooleanElement({ label: "show", name: "show" })],
}

const MarketingFeatures = {
  label: "💅 Features",
  name: "marketing/features",
  fields: [
    TagElement({
      label: "label",
      name: "label",
    }),

    TagElement({
      label: "title",
      name: "title",
    }),

    StringElement({
      label: "description",
      name: "description",
    }),

    {
      label: "features",
      name: "features",
      widget: "list",
      create: true,
      fields: [
        TagElement({
          label: "title",
          name: "title",
        }),

        StringElement({
          label: "description",
          name: "description",
        }),
        {
          label: "video",
          name: "video",
          widget: "object",
          fields: [...VideoElements()],
        },
      ],
    },
  ],
}

const RingElement = () => ({
  label: "ring",
  name: "ring",
  widget: "select",
  options: ["white", "pink", "blue", "green"],
  default: "white",
})

// const ArticleContentImage = ImageElement({
//   label: "📝 Image",
//   name: "article/image",
//   fields: [
//     StringElement({
//       label: "legend",
//       name: "legend",
//       required: false,
//       defaultValue: "",
//       hint: ""
//     }),
//   ],
// })

const Plans: Collection = {
  name: "plans",
  label: "💸 Plans",
  folder: "cms/plans",
  create: true,
  format: "json",
  editor: {
    preview: false,
  },
  slug: "{{name}}",
  summary: "{{name}}",
  fields: [
    {
      label: "Name",
      name: "name",
      widget: "string",
    },
  ],
}

const EmailContentRichText = {
  label: "📝 Text",
  name: "email/rich_text",
  widget: "object",
  summary: "{{fields.content}}",
  fields: [
    {
      label: "text",
      name: "text",
      widget: "markdown",
      minimal: false,
    },
  ],
}

const EmailContentImage = ImageElement({
  label: "📝 Image",
  name: "email/image",
  fields: [],
})

// const Emails: Collection = {
//   name: "email",
//   label: "📮 Emails",
//   folder: "cms/emails",
//   create: true,
//   format: "json",
//   editor: {
//     preview: false,
//   },
//   slug: "{{year}}-{{month}}-{{day}}-{{hour}}-{{minute}}-{{second}}",
//   summary: "{{lang}} • {{title}}",
//   view_groups: [{ label: "lang", field: "lang" }],
//   fields: [
//     IdElement(),
//     TypeElement({ value: "email" }),
//     {
//       label: "plans",
//       name: "plans",
//       widget: "relation",
//       collection: "plans",
//       value_field: "name",
//       search_fields: ["name"],
//       display_fields: ["name"],
//       multiple: true,
//       default: ["free", "newbie", "pro", "enterprise"],
//     },
//     StringElement({
//       label: "title",
//       name: "title",
//       defaultValue: "Indexez vos pages pour 9€ par mois.",
//     }),
//     StringElement({
//       label: "preview",
//       name: "preview",
//     }),
//     {
//       label: "Content",
//       name: "content",
//       widget: "list",
//       types: [EmailContentRichText, ArticleContentImage],
//     },
//   ],
// }

// const Articles: Collection = {
//   name: "article",
//   label: "🖊 Articles",
//   folder: "cms/articles",
//   create: true,
//   format: "json",
//   editor: {
//     preview: false,
//   },
//   slug: "{{year}}-{{month}}-{{day}}-{{hour}}-{{minute}}-{{second}}",
//   summary: "{{lang}} • {{title}}",
//   view_groups: [{ label: "lang", field: "lang" }],
//   fields: [
//     IdElement(),
//     TypeElement({ value: "article" }),
//     VersionElement(),
//     BooleanElement({ label: "Is Hidden", name: "hidden" }),
//     LangElement(),
//     {
//       label: "canonical",
//       name: "canonical",
//       widget: "relation",
//       collection: "article",
//       value_field: "id",
//       search_fields: ["title"],
//       display_fields: ["lang", "title"],
//       required: false,
//     },
//     UrlElement({}),
//     MetaElement({}),
//     ...PublicationDateElements(),
//     {
//       label: "category",
//       name: "category",
//       widget: "relation",
//       collection: "category",
//       value_field: "id",
//       search_fields: ["name"],
//       display_fields: ["lang", "name"],
//     },
//     {
//       label: "author",
//       name: "author",
//       widget: "relation",
//       collection: "author",
//       value_field: "id",
//       search_fields: ["name"],
//       display_fields: ["lang", "name"],
//     },
//     StringElement({
//       label: "title",
//       name: "title",
//     }),
//     MarkdownElement({
//       label: "description",
//       name: "description",
//       buttons: ["bold", "italic", "link"],
//       defaultValue: "",
//     }),
//     ImageElement({ label: "illustration", name: "illustration" }),
//     {
//       label: "Content",
//       name: "content",
//       widget: "list",

//       types: [
//         ArticleContentTitle,
//         ArticleContentRichText,
//         ArticleContentImage,
//         ArticleRecipe,
//         ArticleProduct,
//         ArticleToArticle,
//         ArticleContentVideo,
//         {
//           label: "📝 TOC",
//           name: "article/toc",
//           widget: "object",
//           summary: "{{fields.title.value}}",
//           fields: [TagElement({ label: "Title", name: "title" })],
//         },
//         ArticleContentQuote,
//       ],
//     },
//   ],
// }

const Pages: Collection = {
  name: "pages",
  label: "🖊 Pages",
  folder: "cms/pages",
  create: true,
  format: "json",
  editor: {
    preview: false,
  },
  slug: "{{lang}}-{{url}}",
  summary: "/{{lang}}/{{url}}",
  view_groups: [{ label: "lang", field: "lang" }],
  fields: [
    IdElement(),
    TypeElement({ value: "page" }),
    LangElement(),
    UrlElement({}),
    MetaElement({}),
    ...PublicationDateElements(),
    {
      label: "Content",
      name: "content",
      widget: "list",
      types: [
        MarketingHero,
        MarketingTitle,
        MarketingText,
        MarketingAuthor,
        MarketingVideo,
        MarketingPricing,
        MarketingFeatures,
        MarketingFaq,
        MarketingTestimonials,
      ],
    },
  ],
}

export const config = {
  backend: {
    name: "git-gateway",
    branch: "main",
    commit_messages: {
      create: "Create {{collection}} “{{slug}}”",
      update: "Update {{collection}} “{{slug}}”",
      delete: "Delete {{collection}} “{{slug}}”",
      uploadMedia: "[skip ci] Upload “{{path}}”",
      deleteMedia: "[skip ci] Delete “{{path}}”",
    },
  },
  show_preview_links: false,
  slug: {
    encoding: "ascii",
    clean_accents: true,
    sanitize_replacement: "_",
  },
  search: false,
  publish_mode: "editorial_workflow",
  local_backend: true,
  media_folder: "cms/assets",
  public_folder: "../assets",
  collections: [Pages],
}
