/**
 * Single source of truth for prices shown on the lead pages.
 * Change a number here and every page, table and JSON-LD block updates on the next build.
 * All prices are SAR, before VAT.
 */

export const PRICE_YEAR = new Date().getFullYear();

export const INSPECTION = {
  slug: "/fahs-alalama",
  name: "الفحص الدوري للعلامة",
  price: 990,
  /** days to deliver the report */
  days: 5,
  /** credit window, in days, for deducting the fee from a signed project */
  creditDays: 30,
};

export const fmt = (n: number) => n.toLocaleString("en-US");
