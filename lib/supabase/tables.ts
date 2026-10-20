/** Tabulky a funkce Partypacku ve sdílené databázi (schéma public, předpona partypack_). */
export const T = {
  events: "partypack_events",
  inquiries: "partypack_inquiries",
  admins: "partypack_admins",
} as const;

export const RPC = {
  isAdmin: "partypack_is_admin",
  canRegister: "partypack_can_register",
  submitInquiry: "partypack_submit_inquiry",
} as const;
