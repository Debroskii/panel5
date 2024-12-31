function createTitleBar(title, leading = [], trailing = []) {
    let root = createDiv("").addClass("TitleBar")
    
    let leading_element = createDiv("").addClass("TitleBarActionGroup")
    for(const action of leading) {
        action.addClass("TitleBarAction")
        leading_element.child(action)
    }
    root.child(leading_element)

    let title_element = createP(title).addClass("TitleBarTitle").addClass("NonSelectable")
    root.child(title_element)

    let trailing_element = createDiv("").addClass("TitleBarActionGroup")
    for(const action of trailing) {
        action.addClass("TitleBarAction")
        trailing_element.child(action)
    }
    root.child(trailing_element)

    return root
}

function createIconButton(icon, onclick, width, height = width) {
    let root = createButton("")
    root.mouseClicked(onclick)
    root.style("width", width + "px").style("height", height + "px")
    root.attribute("tabindex", "-1")

    let icon_element = createImg(icon).addClass("ButtonIcon").addClass("NonSelectable")
    print(icon_element)
    icon_element.style("width", (width * 0.75) + "px").style("height", (height * 0.75) + "px")
    root.child(icon_element)

    return root
}

function createTextInput(default_value) {
    return createInput(default_value).attribute("type", "text").addClass("StringInput")
}

function createNumberInput(default_value) {
    return createInput(default_value).attribute("type", "number").addClass("NumberInput")
}

function createBooleanInput(default_value) {
    return createInput(default_value).attribute("type", "checkbox").addClass("BooleanInput").attribute("checked", default_value).attribute("value", default_value)
}

function createColorInput(default_value) {
    return createColorPicker(default_value).addClass("ColorInput")
}

function createDropdownInput(options, default_value) {
    let root = createSelect("").addClass("DropdownInput")
    for(const option of options) {
        root.option(option)
    }
    root.value(default_value)
    return root
}

function createRegistryEntryDisplay(reg_id, entry) {
    let root = createDiv("").addClass("RegistryEntryDisplay")
    let key = createP(entry.label).addClass("RegistryEntryLabel").addClass("NonSelectable")
    let value
    switch(entry.type) {
        case EntryType.STRING:
            value =  createTextInput(entry.value).id(`${reg_id}-${entry.key}`)
            break;
        case EntryType.NUMBER:
            value = createNumberInput(entry.value).id(`${reg_id}-${entry.key}`)
            break;
        case EntryType.BOOLEAN:
            value = createBooleanInput(entry.value).id(`${reg_id}-${entry.key}`)
            break;
        case EntryType.COLOR:
            value = createColorInput(entry.value).id(`${reg_id}-${entry.key}`)
            break;
        case EntryType.DROPDOWN:
            value = createDropdownInput(entry.options, entry.value).id(`${reg_id}-${entry.key}`)
            break;
    }
    root.child(key).child(value)
    return root
}