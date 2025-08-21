import React from "react";
const currentYear = new Date().getFullYear();
function Footer() {
  return (
    <footer>
      <p>Copyright © {currentYear} rudil24. GNU General Public License v3.0</p>
    </footer>
  );
}
export default Footer;