// resources/js/hooks/useDocumentTitle.js
import { useEffect } from "react";

export default function useDocumentTitle(title) {
  useEffect(() => {
    if (title) {
      document.title = `${title} | DevTools`;
    }
  }, [title]);
}
