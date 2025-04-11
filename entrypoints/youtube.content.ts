export default defineContentScript({
  matches: ["*://*.youtube.com/*"],
  runAt: "document_start",
  main() {
    const removeShortButton = () => {
      const $shortBtn = document.querySelector(
        `ytd-mini-guide-entry-renderer  a[title="Shorts"]`
      );
      if ($shortBtn) {
        $shortBtn.remove();
      }
    };

    const removeShortShelves = () => {
      const $shortShelves = document.getElementsByClassName(
        "ytd-rich-section-renderer"
      );

      const $shortShelves2 = document.querySelectorAll(
        `ytd-reel-shelf-renderer`
      );

      // Convert to array to avoid live collection issues during removal
      Array.from($shortShelves).forEach(($shelf) => {
        $shelf.remove();
      });

      Array.from($shortShelves2).forEach(($shelf) => {
        $shelf.remove();
      });
    };

    const removeYoutubeThumbnails = () => {
      const $thumbnails = document.querySelectorAll(
        `ytd-thumbnail:has(#thumbnail)`
      );

      const $playlistsThumbnails = document.querySelectorAll(
        `yt-collection-thumbnail-view-model`
      );
      $thumbnails.forEach(($thumbnail) => {
        $thumbnail.remove();
      });
      $playlistsThumbnails.forEach(($thumbnail) => {
        $thumbnail.remove();
      });
    };

    const removeAdSlots = () => {
      const $adSlots = document.querySelectorAll(
        `ytd-rich-item-renderer:has(ytd-ad-slot-renderer)`
      );
      $adSlots.forEach(($slot) => {
        $slot.remove();
      });
    };

    const checkForItemsToRemove = () => {
      removeAdSlots();
      removeShortButton();
      removeShortShelves();
      removeYoutubeThumbnails();
    };

    // Set up observer to watch for new elements
    const observer = new MutationObserver(checkForItemsToRemove);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  },
});
