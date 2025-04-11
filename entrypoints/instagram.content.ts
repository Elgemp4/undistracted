export default defineContentScript({
  matches: ["*://*.instagram.com/*"],
  runAt: "document_start",
  main() {
    // Immediate redirect to following tab if on main page
    if (window.location.pathname === "/" && window.location.search === "") {
      // Faster redirect without waiting for full page load
      window.location.replace("/?variant=following");
      return; // Exit early to avoid unnecessary observer setup
    }

    const removeForYou = () => {
      const $tabs = document.querySelector(
        `div:has(>[style="--igdstabgroup-column-count:2"])`
      );
      console.log($tabs);
      if (!$tabs) return;
      $tabs.remove();
    };

    const removeReelsBtn = () => {
      const $reelsBtn = document.querySelector(`div:has(> a[href="/reels/"])`);

      if ($reelsBtn) {
        $reelsBtn.remove();
      }
    };

    const removeExploreBtn = () => {
      const $exploreBtn = document.querySelector(
        `div:has(> a[href="/explore/"])`
      );
      if ($exploreBtn) {
        $exploreBtn.remove();
      }
    };

    const checkForItemsToRemove = () => {
      removeForYou();
      removeReelsBtn();
      removeExploreBtn();
    };

    // Set up observer to watch for new elements
    const observer = new MutationObserver(checkForItemsToRemove);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  },
});
