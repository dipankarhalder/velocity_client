import { TopHeader } from "@/components/elements/common/topHeader";
import { MainHeader } from "@/components/elements/common/mainHeader";
import { Navigation } from "@/components/elements/common/navigation";
import { LoginPopup } from "@/components/elements/common/loginPopup";

export default function MainLayout({ children }) {
  return (
    <section className="app_main_wrapper">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <TopHeader />
      <MainHeader />
      <div className="app_navigation">
        <div className="app_container">
          <Navigation />
        </div>
      </div>
      <main
        id="main-content"
        className="app_main_cover"
      >
        <div className="app_container">{children}</div>
      </main>
      <footer></footer>
      <LoginPopup />
    </section>
  );
}
