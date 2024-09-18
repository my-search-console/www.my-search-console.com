import {
  BuilderWebsiteEntity,
  BuilderWebsiteTheme,
} from "@foudroyer/interfaces"

export const BuilderWebsiteNoDomain: BuilderWebsiteEntity = {
  id: "234567-345678-345677",
  domain: "$$$",
  fk_user_id: "",
  theme: BuilderWebsiteTheme.PURITY,
}

export const BuilderWebsiteWithDomain: BuilderWebsiteEntity = {
  id: "234567-345bg8-345677",
  domain: "purity.foudroyer.com",
  fk_user_id: "",
  theme: BuilderWebsiteTheme.PURITY,
}

export const BuilderWebsiteWithDomainMur: BuilderWebsiteEntity = {
  id: "09876-butyu4567h-ghj45678",
  domain: "mur.foudroyer.com",
  fk_user_id: "",
  theme: BuilderWebsiteTheme.MUR,
}
