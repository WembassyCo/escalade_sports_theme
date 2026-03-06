/**
 * Escalade Sports Theme - Main JavaScript
 */

(function (Drupal, once) {
  'use strict';

  /**
   * Initialize theme behaviors.
   */
  Drupal.behaviors.escaladeTheme = {
    attach: function (context, settings) {
      // Initialize sticky header
      once('escalade-sticky-header', '.site-header', context).forEach(function (header) {
        EscaladeTheme.initStickyHeader(header);
      });

      // Initialize mobile menu
      once('escalade-mobile-menu', '.header-navigation', context).forEach(function () {
        EscaladeTheme.initMobileMenu();
      });

      // Initialize smooth scroll for anchor links
      once('escalade-smooth-scroll', 'a[href^="#"]', context).forEach(function (link) {
        EscaladeTheme.initSmoothScroll(link);
      });

      // Initialize responsive tables
      once('escalade-responsive-tables', 'table', context).forEach(function (table) {
        EscaladeTheme.initResponsiveTable(table);
      });
    }
  };

  /**
   * Escalade Theme Utility Object
   */
  const EscaladeTheme = {

    /**
     * Initialize sticky header behavior.
     */
    initStickyHeader: function (header) {
      let lastScrollY = window.scrollY;
      let ticking = false;
      const headerHeight = header.offsetHeight;

      function updateHeader() {
        const scrollY = window.scrollY;

        if (scrollY > headerHeight) {
          header.classList.add('sticky');
        } else {
          header.classList.remove('sticky');
        }

        lastScrollY = scrollY;
        ticking = false;
      }

      window.addEventListener('scroll', function () {
        if (!ticking) {
          requestAnimationFrame(updateHeader);
          ticking = true;
        }
      }, { passive: true });
    },

    /**
     * Initialize mobile menu enhancements.
     */
    initMobileMenu: function () {
      const offcanvas = document.getElementById('mainNavigation');
      if (!offcanvas) return;

      // Close offcanvas on anchor link click
      offcanvas.addEventListener('click', function (e) {
        if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
          const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvas);
          if (offcanvasInstance) {
            offcanvasInstance.hide();
          }
        }
      });
    },

    /**
     * Initialize smooth scrolling for anchor links.
     */
    initSmoothScroll: function (link) {
      link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    },

    /**
     * Make tables responsive by adding wrapper div.
     */
    initResponsiveTable: function (table) {
      if (!table.parentElement.classList.contains('table-responsive')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'table-responsive';
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
      }
    },

    /**
     * Debounce function for performance optimization.
     */
    debounce: function (func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }
  };

  // Expose to global scope for debugging
  window.EscaladeTheme = EscaladeTheme;

})(Drupal, once);
