let gNavigation = {
    onHashChange: function Navigation_onHashChange()
    {
        let hash = location.hash.replace(/^#!\//, "");
        let page, subpage;
        if (hash.includes("/"))
        {
            page = hash.split("/")[0];
            subpage = hash.split("/")[1];
        }
        else
        {
            page = hash;
        }

        this.navigate(page, subpage);
    },

    navigate: function Navigation_navigate(page, subpage)
    {
        let pageContainer = document.querySelector(`#content > [page="${page}"]`);
        if (pageContainer)
        {
            document.querySelector("#content > [selected]")?.removeAttribute("selected");
            pageContainer.setAttribute("selected", "true");
            if (pageContainer.getAttribute("page-title"))
            {
                document.title = `${pageContainer.getAttribute("page-title")} - aubymori's website`;
            }
            else
            {
                document.title = "aubymori's website";
            }

            if (subpage)
            {
                let subpageContainer = pageContainer.querySelector(`deck > [subpage="${subpage}"]`);
                if (subpageContainer)
                {
                    pageContainer.querySelector("deck > [selected]")?.removeAttribute("selected");
                    subpageContainer.setAttribute("selected", "true");
                }
            }
        }

        let newNav = document.querySelector(`#nav > a[href="#!/${page}"]`);
        if (newNav)
        {
            document.querySelector("#nav > [selected]")?.removeAttribute("selected");
            newNav.setAttribute("selected", "true");
        }

        if (subpage)
        {
            let newSubnav = document.querySelector(`a[href="#!/${page}/${subpage}"]`);
            if (newSubnav)
            {
                newSubnav.parentElement.querySelector("[selected]")?.removeAttribute("selected");
                newSubnav.setAttribute("selected", "true");
            }
        }
    },

    init: function Navigation_init()
    {
        window.addEventListener("hashchange", this.onHashChange.bind(this));
        this.onHashChange();
    }
};

gNavigation.init();