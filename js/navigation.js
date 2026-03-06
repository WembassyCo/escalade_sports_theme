/**
 * Escalade Sports Theme - Navigation JavaScript
 */

(function (Drupal, once) {
  'use strict';

  /**
   * Navigation behaviors.
   */
  Drupal.behaviors.escaladeNavigation = {
    attach: function (context, settings) {
      // Initialize dropdown keyboard navigation
      once('nav-keyboard', '.dropdown-menu', context).forEach(function (menu) {
        EscaladeNavigation.initKeyboardNav(menu);
      });

      // Initialize touch-friendly dropdowns
      once('nav-touch', '.dropdown', context).forEach(function (dropdown) {
        EscaladeNavigation.initTouchDropdown(dropdown);
      });

      // Initialize active link highlighting
      once('nav-active', '.navbar-nav', context).forEach(function (nav) {
        EscaladeNavigation.highlightActiveLink(nav);
      });

      // Initialize submenu toggle for mobile
      once('nav-submenu-mobile', '.menu--main', context).forEach(function (menu) {
        EscaladeNavigation.initMobileSubmenu(menu);
      });
    }
  };

  /**
   * Navigation Utility Object
   */
  const EscaladeNavigation = {

    /**
     * Initialize keyboard navigation for dropdowns.
     */
    initKeyboardNav: function (menu) {
      const menuItems = menu.querySelectorAll('.dropdown-item, a');

      menuItems.forEach(function (item, index) {
        item.addEventListener('keydown', function (e) {
          switch (e.key) {
            case 'ArrowDown':
              e.preventDefault();
              if (index < menuItems.length - 1) {
                menuItems[index + 1].focus();
              }
              break;
            case 'ArrowUp':
              e.preventDefault();
              if (index > 0) {
                menuItems[index - 1].focus();
              }
              break;
            case 'Home':
              e.preventDefault();
              menuItems[0].focus();
              break;
            case 'End':
              e.preventDefault();
              menuItems[menuItems.length - 1].focus();
              break;
          }
        });
      });
    },

    /**
     * Initialize touch-friendly dropdowns.
     */
    initTouchDropdown: function (dropdown) {
      const toggle = dropdown.querySelector('.dropdown-toggle');
      if (!toggle) return;

      // Enable click handling for touch devices
      if ('ontouchstart' in window || navigator.maxTouchPoints) {
        toggle.addEventListener('touchstart', function (e) {
          const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

          // Close other open dropdowns
          document.querySelectorAll('.dropdown-toggle[aria-expanded="true"]').forEach(function (otherToggle) {
            if (otherToggle !== toggle) {
              const otherDropdown = bootstrap.Dropdown.getInstance(otherToggle);
              if (otherDropdown) {
                otherDropdown.hide();
              }
            }
          });
        });
      }
    },

    /**
     * Highlight active link in navigation.
     */
    highlightActiveLink: function (nav) {
      const currentPath = window.location.pathname;
      const links = nav.querySelectorAll('a');

      links.forEach(function (link) {
        const linkPath = link.getAttribute('href');
        if (linkPath && (linkPath === currentPath || currentPath.startsWith(linkPath) && linkPath !== '/')) {
          link.classList.add('active');
          link.closest('.nav-item')?.classList.add('is-active');

          // Also mark parent menu items
          let parent = link.closest('.dropdown');
          while (parent) {
            const parentToggle = parent.querySelector('.dropdown-toggle');
            if (parentToggle) {
              parentToggle.classList.add('active');
            }
            parent = parent.parentElement?.closest('.dropdown');
          }
        }
      });
    },

    /**
     * Initialize mobile submenu toggle.
     */
    initMobileSubmenu: function (menu) {
      const itemsWithChildren = menu.querySelectorAll('.menu-item--expanded');

      itemsWithChildren.forEach(function (item) {
        const link = item.querySelector(':scope > a');
        if (!link) return;

        // Skip if already has submenu toggle
        if (link.querySelector('.submenu-toggle')) return;

        // Create toggle button for mobile
        const toggle = document.createElement('button');
        toggle.className = 'submenu-toggle';
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Toggle submenu');
        toggle.innerHTML = '+';

        // Insert after link
        link.parentNode.insertBefore(toggle, link.nextSibling);

        toggle.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();

          const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
          toggle.setAttribute('aria-expanded', !isExpanded);
          item.classList.toggle('is-open', !isExpanded);
          toggle.textContent = isExpanded ? '+' : '−';
        });
      });
    },

    /**
     * Handle focus out of dropdown.
     */
    handleFocusOut: function (dropdown, event) {
      const relatedTarget = event.relatedTarget;
      const dropdownToggle = dropdown.querySelector('.dropdown-toggle');

      if (!dropdown.contains(relatedTarget)) {
        const instance = bootstrap.Dropdown.getInstance(dropdownToggle);
        if (instance) {
          instance.hide();
        }
      }
    }
  };

  // Expose to global scope
  window.EscaladeNavigation = EscaladeNavigation;

})(Drupal, once);
