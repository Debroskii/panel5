class UI {
    static panels = []
    static DOMRoot

    static initialize() {
        UI.DOMRoot = createDiv("").id("UIRoot")
        UI.DOMRoot.style("width", windowWidth + "px").style("height", windowHeight + "px")

        this.panels.push(new StaticTopBar())

        for(const panel of UI.panels) {
            UI.DOMRoot.child(panel.element)
        }
    }   

    static addPanel(panel) {
        UI.panels.push(panel)
        UI.DOMRoot.child(panel.element)
    }

    static removePanel(panel) {
        UI.panels.splice(UI.panels.indexOf(panel), 1)
    }

    static updatePanels() {
        let highestIndexPanel = null;
        let highestIndex = -1;

        for (const panel of UI.panels) {
            panel.update()
            if (panel.draggable()) {
                const index = Array.from(document.getElementById('UIRoot').children).indexOf(panel.element.elt);
                if (index > highestIndex) {
                    highestIndex = index;
                    highestIndexPanel = panel;
                }
            }
        }

        if (highestIndexPanel) {
            highestIndexPanel.updateStyle()
        }
    }

    static handleMousePress() {
        if (mouseButton === LEFT) {
            let highestIndexPanel = null;
            let highestIndex = -1;

            for (const panel of UI.panels) {
                if (panel.draggable()) {
                    const index = Array.from(document.getElementById('UIRoot').children).indexOf(panel.element.elt || panel.element);
                    if (index > highestIndex) {
                        highestIndex = index;
                        highestIndexPanel = panel;
                    }
                }
            }

            if (highestIndexPanel && !highestIndexPanel.overButtons()) {
                highestIndexPanel.pressed();
                document.getElementById('UIRoot').appendChild(highestIndexPanel.element.elt || highestIndexPanel.element);
            }
        }
    }

    static handleMouseRelease() {
        if(mouseButton === LEFT) {
            for(const panel of UI.panels) {
                panel.released()
            }
        }
    }
}