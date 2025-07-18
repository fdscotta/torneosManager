export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = "es-ES"
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const formatDateToYYYYMMDD = (
  dateStr: string,
  locale: string = "en-US"
) => {
  const date = new Date(dateStr);

  const isoDateString = date.toISOString();
  const yyyyMMdd = isoDateString.slice(0, 10);
  return yyyyMMdd;
};

export const formatDateToYYYYMMDDHHMM = (
  dateStr: string,
  locale: string = "en-US"
) => {
  if (dateStr == null) return "";
  const date = new Date(dateStr);

  const isoDateString = date.toISOString();
  const yyyyMMddHHMM = isoDateString.slice(0, 16);
  return yyyyMMddHHMM;
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export const roleImageMap: Record<string, string> = {
  cristal:
    "https://res.cloudinary.com/dioc4jjum/image/upload/v1717473190/yehj4xb2bgpetjfjlcvm.png",
  jaula:
    "https://res.cloudinary.com/dioc4jjum/image/upload/v1711036549/cntcxjoliltx3ldnehg8.png",
  pampa:
    "https://res.cloudinary.com/dioc4jjum/image/upload/v1752796369/pampapadel_bufdhc.png",
};
