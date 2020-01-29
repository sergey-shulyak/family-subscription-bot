import Telegraf, { ContextMessageUpdate } from "telegraf"

export type Bot = Telegraf<ContextMessageUpdate>

declare module "telegraf" {
  interface ContextMessageUpdate {
    i18n: {
      t(
        languageCode?: string,
        resourceKey?: string,
        templateData?: object
      ): string
      t(resourceKey?: string, templateData?: object): string
      locale(): string
      locale(languageCode?: string): void
    }
  }

  interface SceneContextMessageUpdate {
    i18n: {
      t(
        languageCode?: string,
        resourceKey?: string,
        templateData?: object
      ): string
      t(resourceKey?: string, templateData?: object): string
      locale(): string
      locale(languageCode?: string): void
    }
  }
}
