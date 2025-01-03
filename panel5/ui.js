/**
 * A wrapper class for the panel based UI system that handles the creation, removal, and updating of panels.
 */
class UI {
    static panels = []
    static DOMRoot
    static panelNoZone = []
    static panel5Config
    static contextMenu

    /**
     * Initializes the UI system by creating the root DOM element and adding the top bar.
     */
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

        for(let i = 0; i < ceil(windowHeight / 20); i++) {
            this.panelNoZone.push([])
            for(let t = 0; t < ceil(windowWidth / 20); t++) {
                this.panelNoZone[i].push(false)
            }
        }
    }   

    /**
     * Adds a panel to the UI
     * @param {*} panel The panel to add
     */
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

    /**
     * Finds an optimal position for a panel
     * @param {*} panel The panel to find a position for
     * @returns The optimal position for the panel
     */
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

    /**
     * Removes a panel from the UI
     * @param {*} panel The panel to remove
     */
    static removePanel(panel) {
        UI.panels.splice(UI.panels.indexOf(panel), 1)
    }

    /**
     * Updates all panels in the UI
     */
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

    /**
     * Handles the mouse press event
     */
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
            UI.contextMenu.close()
            UI.contextMenu.open([new ContextMenuAction("Add Blank Panel", () => {
                UI.addPanel(new Panel(ceil(random(0, 100000)), createVector(0, 0), createVector(180, 300), "Blank Panel"))
            }, "Shift + P")])
        }
    }

    /**
     * Handles the mouse release event
     */
    static handleMouseRelease() {
        if(mouseButton === LEFT) {
            for(const panel of UI.panels) {
                panel.released()
            }
        }
    }

    /**
     * Automatically aligns all panels in the UI using the findOptimalPosition method
     */
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

    /**
     * Removes all panels from the UI
     */
    static removeAllPanels() {
        for(let panel = 1; panel < UI.panels.length; panel++) {
            UI.panels[panel].close()
        }
    }
}