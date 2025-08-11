export const Currencies = [
  { value: "USD", label: "$ Dollar", locale: "en-US" },
  { value: "EUR", label: "€ Euro", locale: "de-DE" }, // German for Euro
  { value: "GBP", label: "£ Pound", locale: "en-GB" }, // British Pound
  { value: "JPY", label: "¥ Yen", locale: "ja-JP" },   // Japanese Yen
];

export type Currency = (typeof Currencies)[0];