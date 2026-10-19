
// ScrollUp.js
import React, { useEffect } from "react";

export const ScrollUp = ()=> {
  useEffect(() => window.document.scrollingElement?.scrollTo(0, 0), []);

  return null;
}

// export default ScrollUp;


// When this component is added to a web page, it tells the browser to scroll to the top of the page.
//  It's like clicking the "up" arrow to quickly go to the beginning of a long webpage.... 