import "/styles/main.css";
import { initNavbar } from "./components/navbar";
import { renderFooter } from "./components/footer";
import { isLoggedIn } from "./api/auth";

initNavbar(isLoggedIn());
document.getElementById("footer").innerHTML = renderFooter(isLoggedIn());
