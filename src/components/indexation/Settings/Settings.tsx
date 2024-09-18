import { Cog6ToothIcon } from "@heroicons/react/20/solid"
import React from "react"
import { PremiumModal } from "../../payment/UpsellConfirmationModal/UpsellConfirmationModal"
import { AddManuallyPagesToIndexation } from "../../settings/AddManuallyPagesToIndexation/AddManuallyPagesToIndexation"
import { GoogleKeyUpdate } from "../../settings/GoogleKeyUpdate/GoogleKeyUpdate"
import { UpdateSitemap } from "../../settings/UpdateSitemap/UpdateSitemap"
import { ButtonSecondary } from "../../UI/Button/Button"
import { GoogleKeysModal } from "../GoogleKeysModal/GoogleKeysModal"
import { ResetWebsiteModal } from "../ResetWebsiteModal/ResetWebsiteModal"
import { UpdateSitemapModal } from "../UpdateSitemapModal/UpdateSitemapModal"
import { connector, ContainerProps } from "./containers/Settings.containers"

export const SettingsWrapper: React.FC<ContainerProps> = (props) => {
  if (!props.isOpen) return <></>

  return (
    <>
      <GoogleKeyUpdate />
      <UpdateSitemap />
      <AddManuallyPagesToIndexation />

      {/* <ResetDataWebsite /> */}

      <ResetWebsiteModal />
      <UpdateSitemapModal />
      <GoogleKeysModal />
      <PremiumModal />
    </>
  )
}

const SettingsContainer: React.FC<ContainerProps> = (props) => (
  <SettingsWrapper {...props} />
)

export const Settings = connector(SettingsContainer)

/**
 *
 *
 *
 *
 *
 *
 *
 * Button Wrapper
 *
 *
 *
 *
 *
 *
 *
 */

export const SettingsToggleButtonWrapper: React.FC<ContainerProps> = (
  props
) => {
  return (
    <>
      <ButtonSecondary onClick={props.onToggle} active={props.isOpen} size="sm">
        <Cog6ToothIcon className="h-5 w-5" />
      </ButtonSecondary>
    </>
  )
}

const SettingsToggleButtonContainer: React.FC<ContainerProps> = (props) => (
  <SettingsToggleButtonWrapper {...props} />
)

export const SettingsToggleButton = connector(SettingsToggleButtonContainer)
