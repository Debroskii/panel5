class UI {
    static panels = []
    static DOMRoot
    static panelNoZone = []
    static panel5Config
    static contextMenu

    static initialize() {
        UI.panel5Config = new Registry("panel5_config")
        UI.panel5Config.registerBoolean("show_fps", false, "Show FPS")
        UI.panel5Config.registerNumber("grid_unit_size", 20, "Grid Unit Size")
        GlobalRegistry.addRegistry(UI.panel5Config)

        UI.DOMRoot = createDiv("").id("UIRoot")
        UI.DOMRoot.style("width", windowWidth + "px").style("height", windowHeight + "px")

        UI.contextMenu = new ContextMenu()

        this.panels.push(new StaticTopBar())

        for(const panel of UI.panels) {
            UI.DOMRoot.child(panel.element)
        }

        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
          }, false);

        for(let i = 0; i < ceil(windowHeight / UI.panel5Config.get("grid_unit_size").value); i++) {
            this.panelNoZone.push([])
            for(let t = 0; t < ceil(windowWidth / UI.panel5Config.get("grid_unit_size").value); t++) {
                this.panelNoZone[i].push(false)
            }
        }
    }   

    static addPanel(panel) {
        const panelWidth = panel.dimensions.x;
        const panelHeight = panel.dimensions.y;
        const position = this.findOptimalPosition(panel);
        if (position) {
            const { row, col } = position;
            for (let i = row; i < row + panelHeight / UI.panel5Config.get("grid_unit_size").value; i++) {
                for (let j = col; j < col + panelWidth / UI.panel5Config.get("grid_unit_size").value; j++) {
                    this.panelNoZone[i][j] = true;
                }
            }
            panel.setPosition(col * UI.panel5Config.get("grid_unit_size").value, row * UI.panel5Config.get("grid_unit_size").value);
            this.panels.push(panel);
            UI.DOMRoot.child(panel.element);
        } else {
            console.error("No suitable position found for the panel.");
        }
    }

    static findOptimalPosition(panel) {
        const rows = this.panelNoZone.length;
        const cols = this.panelNoZone[0].length;
        const panelRows = Math.ceil(panel.dimensions.y / UI.panel5Config.get("grid_unit_size").value);
        const panelCols = Math.ceil(panel.dimensions.x / UI.panel5Config.get("grid_unit_size").value);

        panel.removeFromNoZone()

        for (let i = 2; i <= rows - panelRows; i++) { // Start at row 2
            for (let j = 1; j <= cols - panelCols; j++) { // Start at column 2
                let fits = true;
                for (let x = -1; x < panelRows; x++) {
                    for (let y = -1; y < panelCols; y++) {
                        if (this.panelNoZone[i + x][j + y]) {
                            fits = false;
                            break;
                        }
                    }
                    if (!fits) break;
                }
                if (fits) {
                    return { row: i, col: j };
                }
            }
        }
        return null;
    }

    static removePanel(panel) {
        UI.panels.splice(UI.panels.indexOf(panel), 1)
    }

    static updatePanels() {
        for(let row = 0; row < UI.panelNoZone.length; row++) {
            for(let col = 0; col < UI.panelNoZone[row].length; col++) {
                UI.panelNoZone[row][col] = false
            }
        }

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
            if(this.contextMenu.is_open) UI.contextMenu.close()

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
        } else if (mouseButton === RIGHT) {
            // console.log(UI.contextMenu)
            UI.contextMenu.open()
        }
    }

    static handleMouseRelease() {
        if(mouseButton === LEFT) {
            for(const panel of UI.panels) {
                panel.released()
            }
        }
    }

    static autoAlignAllPanels() {
        for(let panel of UI.panels) {
            let position = UI.findOptimalPosition(panel);
            if (position) {
                const { row, col } = position;
                for (let i = row; i < row + panel.dimensions.y / UI.panel5Config.get("grid_unit_size").value; i++) {
                    for (let j = col; j < col + panel.dimensions.x / UI.panel5Config.get("grid_unit_size").value; j++) {
                        UI.panelNoZone[i][j] = true;
                    }
                }
                panel.setPosition(col * UI.panel5Config.get("grid_unit_size").value, row * UI.panel5Config.get("grid_unit_size").value);
            }
        }
    }
}