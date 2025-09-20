$(document).ready(function () {
  // add toggle functionality to abstract, award and bibtex buttons
  $("a.abstract").click(function () {
    $(this).parent().parent().find(".abstract.hidden").toggleClass("open");
    $(this).parent().parent().find(".award.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden.open").toggleClass("open");
  });
  $("a.award").click(function () {
    $(this).parent().parent().find(".abstract.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".award.hidden").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden.open").toggleClass("open");
  });
  $("a.bibtex").click(function () {
    $(this).parent().parent().find(".abstract.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".award.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden").toggleClass("open");
  });
  $("a").removeClass("waves-effect waves-light");

  // bootstrap-toc
  if ($("#toc-sidebar").length) {
    // remove related publications years from the TOC
    $(".publications h2").each(function () {
      $(this).attr("data-toc-skip", "");
    });
    var navSelector = "#toc-sidebar";
    var $myNav = $(navSelector);
    Toc.init($myNav);
    $("body").scrollspy({
      target: navSelector,
    });
  }

  // add css to jupyter notebooks
  const cssLink = document.createElement("link");
  cssLink.href = "../css/jupyter.css";
  cssLink.rel = "stylesheet";
  cssLink.type = "text/css";

  let jupyterTheme = determineComputedTheme();

  $(".jupyter-notebook-iframe-container iframe").each(function () {
    $(this).contents().find("head").append(cssLink);

    if (jupyterTheme == "dark") {
      $(this).bind("load", function () {
        $(this).contents().find("body").attr({
          "data-jp-theme-light": "false",
          "data-jp-theme-name": "JupyterLab Dark",
        });
      });
    }
  });

  document.querySelectorAll("[data-profile-toggle]").forEach(function (toggleEl) {
    var imageWrappers = toggleEl.querySelectorAll("[data-profile-image]");
    if (imageWrappers.length <= 1) {
      return;
    }

    var activeIndex = 0;

    imageWrappers.forEach(function (wrapper, index) {
      if (wrapper.classList.contains("profile-toggle__image--active")) {
        activeIndex = index;
      }
    });

    var statusEl = toggleEl.querySelector("[data-profile-toggle-status]");

    var setActiveImage = function (newIndex) {
      var current = imageWrappers[activeIndex];
      var next = imageWrappers[newIndex];

      if (current) {
        current.classList.remove("profile-toggle__image--active");
        current.setAttribute("aria-pressed", "false");
      }

      if (next) {
        next.classList.add("profile-toggle__image--active");
        next.setAttribute("aria-pressed", "true");
      }

      activeIndex = newIndex;

      if (statusEl) {
        statusEl.textContent = "Showing photo " + (newIndex + 1) + " of " + imageWrappers.length;
      }
    };

    var showNextImage = function () {
      var nextIndex = (activeIndex + 1) % imageWrappers.length;
      setActiveImage(nextIndex);
    };

    imageWrappers.forEach(function (wrapper) {
      wrapper.addEventListener("click", function (event) {
        event.preventDefault();
        showNextImage();
      });

      wrapper.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
          event.preventDefault();
          showNextImage();
        }
      });
    });

    setActiveImage(activeIndex);
  });

  // trigger popovers
  $('[data-toggle="popover"]').popover({
    trigger: "hover",
  });
});
