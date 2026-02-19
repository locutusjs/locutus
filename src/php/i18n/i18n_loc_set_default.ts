import { ensurePhpRuntimeState, setPhpLocaleDefault } from '../_helpers/_phpRuntimeState.ts'
import type { PhpValue } from '../_helpers/_phpTypes.ts'

export function i18n_loc_set_default(name: string): boolean {
  //  discuss at: https://locutus.io/php/i18n_loc_set_default/
  // original by: Brett Zamir (https://brett-zamir.me)
  //      note 1: Renamed in PHP6 from locale_set_default(). Not listed yet at php.net
  //      note 1: List of locales at https://demo.icu-project.org/icu-bin/locexp (use for implementing other locales here)
  //      note 1: To be usable with sort() if it is passed the SORT_LOCALE_STRING sorting flag: https://php.net/manual/en/function.sort.php
  //   example 1: i18n_loc_set_default('pt_PT')
  //   returns 1: true

  const runtime = ensurePhpRuntimeState()

  runtime.locales.en_US_POSIX = {
    sorting: function (left: PhpValue, right: PhpValue): number {
      // @todo: This one taken from strcmp, but need for other locales;
      // we don't use localeCompare since its locale is not settable
      const str1 = String(left)
      const str2 = String(right)
      return str1 === str2 ? 0 : str1 > str2 ? 1 : -1
    },
  }

  setPhpLocaleDefault(name)

  return true
}
