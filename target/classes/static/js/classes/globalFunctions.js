export function appendChildren(element,children){
    for(let child of children){
        element.appendChild(child);
    }
}
export function setAttributes(element,attributesList){
    for(let attribute in attributesList){
        element.setAttribute(attribute,attributesList[attribute]);
    }
}