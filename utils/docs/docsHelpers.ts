import type { Ref } from "vue";

// Navigation helper functions
export const createNavigationHelpers = (
  sidebarOpen: Ref<boolean>,
  pageNavOpen: Ref<boolean>,
) => ({
  toggleSidebar: () => {
    sidebarOpen.value = !sidebarOpen.value;
  },

  closeSidebar: () => {
    sidebarOpen.value = false;
  },

  togglePageNav: () => {
    pageNavOpen.value = !pageNavOpen.value;
  },

  closePageNav: () => {
    pageNavOpen.value = false;
  },
});

// Scroll utility functions
export const scrollHelpers = {
  scrollToTop: () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  },

  handleMobileScroll: (showScrollToTop: Ref<boolean>) => () => {
    const isDesktop = window.innerWidth >= 1024;
    if (isDesktop) return;

    // Show button when scrolled down more than 300px
    showScrollToTop.value = window.scrollY > 300;
  },
};

// Desktop scroll handling functions
export const desktopScrollHandlers = {
  // Returns a { promise, cancel } pair so callers can abort the polling loop
  // before it fires and re-locks overflow on a page that doesn't own the docs
  // scroll container.  Without cancellation, a deferred setTimeout callback
  // could run after navigation and hide the new page's scrollbar.
  ensureContentReady: (): { promise: Promise<void>; cancel: () => void } => {
    let cancelled = false;
    let timerId: ReturnType<typeof setTimeout> | null = null;
    let rejectFn: ((reason?: unknown) => void) | null = null;

    const promise = new Promise<void>((resolve, reject) => {
      rejectFn = reject;

      const checkContent = () => {
        if (cancelled) return;

        const contentArea = document.querySelector(".content");
        if (
          !contentArea ||
          contentArea.scrollHeight <= contentArea.clientHeight
        ) {
          timerId = setTimeout(checkContent, 100);
          return;
        }

        // Only prevent page scrolling once we confirm content area is ready
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
        resolve();
      };
      checkContent();
    });

    const cancel = () => {
      if (cancelled) return;
      cancelled = true;
      if (timerId !== null) {
        clearTimeout(timerId);
        timerId = null;
      }
      // Reject the promise so any awaiting callers unblock cleanly
      rejectFn?.(new DOMException("Cancelled", "AbortError"));
    };

    return { promise, cancel };
  },

  handleWheel: (e: WheelEvent) => {
    e.preventDefault();
    const contentArea = document.querySelector(".content");
    if (contentArea) {
      contentArea.scrollTop += e.deltaY;
    }
  },

  handleKeydown: (e: KeyboardEvent) => {
    const contentArea = document.querySelector(".content");
    if (!contentArea) return;

    const keyActions: Record<string, () => void> = {
      ArrowDown: () => {
        e.preventDefault();
        contentArea.scrollTop += 40;
      },
      ArrowUp: () => {
        e.preventDefault();
        contentArea.scrollTop -= 40;
      },
      PageDown: () => {
        e.preventDefault();
        contentArea.scrollTop += contentArea.clientHeight * 0.8;
      },
      PageUp: () => {
        e.preventDefault();
        contentArea.scrollTop -= contentArea.clientHeight * 0.8;
      },
      Home: () => {
        if (e.ctrlKey) {
          e.preventDefault();
          contentArea.scrollTop = 0;
        }
      },
      End: () => {
        if (e.ctrlKey) {
          e.preventDefault();
          contentArea.scrollTop = contentArea.scrollHeight;
        }
      },
    };

    const action = keyActions[e.key];
    if (action) action();
  },

  handleAnchorClick: (e: Event) => {
    const target = e.target as HTMLElement;
    if (
      !target ||
      target.tagName !== "A" ||
      !(target as HTMLAnchorElement).getAttribute("href")?.startsWith("#")
    ) {
      return;
    }

    e.preventDefault();
    const targetId = (target as HTMLAnchorElement)
      .getAttribute("href")
      ?.substring(1);
    const targetElement = targetId ? document.getElementById(targetId) : null;
    const contentArea = document.querySelector(".content");

    if (targetElement && contentArea) {
      const contentRect = contentArea.getBoundingClientRect();
      const targetRect = targetElement.getBoundingClientRect();
      const scrollOffset =
        targetRect.top - contentRect.top + contentArea.scrollTop - 20;

      contentArea.scrollTo({
        top: scrollOffset,
        behavior: "smooth",
      });
    }
  },
};

// Path utility functions
export const pathHelpers = {
  isCurrentPath: (path: string, currentRoute: string) => {
    // For the welcome page, consider both /docs and /docs/welcome as current
    if (
      path === "/docs/welcome" &&
      (currentRoute === "/docs" || currentRoute === "/docs/")
    ) {
      return true;
    }
    return currentRoute === path;
  },
};

// Desktop scroll setup function.
//
// Returns synchronously so the caller can register `cancel` in `onUnmounted`
// BEFORE awaiting `done`.  This closes a race where navigation triggers
// unmount while `ensureContentReady` is still polling — without an early
// cancel the setTimeout callback would fire after navigation and re-lock
// the new page's body overflow.
//
// Usage in a component:
//
//   const { cancel, done } = setupDesktopScrolling();
//   onUnmounted(cancel);   // always registered, handles early unmount
//   await done;            // if already cancelled, resolves as a no-op
//
export const setupDesktopScrolling = (): {
  cancel: () => void;
  done: Promise<void>;
} => {
  const isDesktop = () => window.innerWidth >= 1024;

  if (!isDesktop()) {
    // Mobile: nothing to set up, return no-op handles
    return { cancel: () => {}, done: Promise.resolve() };
  }

  const { promise, cancel } = desktopScrollHandlers.ensureContentReady();
  let listenersAdded = false;

  const fullCleanup = () => {
    // Cancel any pending poll (no-op if already resolved)
    cancel();
    // Restore scrollability regardless of whether setup completed
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
    if (listenersAdded) {
      window.removeEventListener("wheel", desktopScrollHandlers.handleWheel);
      window.removeEventListener(
        "keydown",
        desktopScrollHandlers.handleKeydown,
      );
      document.removeEventListener(
        "click",
        desktopScrollHandlers.handleAnchorClick,
      );
      listenersAdded = false;
    }
  };

  const done = promise.then(() => {
    // Guard: if cancel() was already called, don't add listeners
    if (document.body.style.overflow !== "hidden") return;

    window.addEventListener("wheel", desktopScrollHandlers.handleWheel, {
      passive: false,
    });
    window.addEventListener("keydown", desktopScrollHandlers.handleKeydown);
    document.addEventListener("click", desktopScrollHandlers.handleAnchorClick);
    listenersAdded = true;
  });

  return { cancel: fullCleanup, done };
};
