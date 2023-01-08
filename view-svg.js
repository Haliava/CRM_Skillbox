const BASE_PARAMETERS_SVG = {
    "height": "16", "width": "16", "viewBox": "0 0 16 16", "fill": "none", "xmlns": "http://www.w3.org/2000/svg"
};

function createArrowSVG() {
    return createSVG("http://www.w3.org/2000/svg",
        BASE_PARAMETERS_SVG,
        "M1.49503 3.69003C1.25003 3.93503 1.25003 4.33003 1.49503 4.57503L5.65003 8.73003C5.84503 8.92503 6.16003 8.92503 6.35503 8.73003L10.51 4.57503C10.755 4.33003 10.755 3.93503 10.51 3.69003C10.265 3.44503 9.87003 3.44503 9.62503 3.69003L6.00003 7.31003L2.37503 3.68503C2.13503 3.44503 1.73503 3.44503 1.49503 3.69003Z",
        "#9873FF");
}

function createContactIconSVG(contactType) {
    let pathValue;
    let pathColor = "#9873FF";
    let hasCircle = false;

    switch (contactType) {
        case "Vk":
            pathValue = "M8 0C3.58187 0 0 3.58171 0 8C0 12.4183 3.58187 16 8 16C12.4181 16 16 12.4183 16 8C16 3.58171 12.4181 0 8 0ZM12.058 8.86523C12.4309 9.22942 12.8254 9.57217 13.1601 9.97402C13.3084 10.1518 13.4482 10.3356 13.5546 10.5423C13.7065 10.8371 13.5693 11.1604 13.3055 11.1779L11.6665 11.1776C11.2432 11.2126 10.9064 11.0419 10.6224 10.7525C10.3957 10.5219 10.1853 10.2755 9.96698 10.037C9.87777 9.93915 9.78382 9.847 9.67186 9.77449C9.44843 9.62914 9.2543 9.67366 9.1263 9.90707C8.99585 10.1446 8.96606 10.4078 8.95362 10.6721C8.93577 11.0586 8.81923 11.1596 8.43147 11.1777C7.60291 11.2165 6.81674 11.0908 6.08606 10.6731C5.44147 10.3047 4.94257 9.78463 4.50783 9.19587C3.66126 8.04812 3.01291 6.78842 2.43036 5.49254C2.29925 5.2007 2.39517 5.04454 2.71714 5.03849C3.25205 5.02817 3.78697 5.02948 4.32188 5.03799C4.53958 5.04143 4.68362 5.166 4.76726 5.37142C5.05633 6.08262 5.4107 6.75928 5.85477 7.38684C5.97311 7.55396 6.09391 7.72059 6.26594 7.83861C6.45582 7.9689 6.60051 7.92585 6.69005 7.71388C6.74734 7.57917 6.77205 7.43513 6.78449 7.29076C6.82705 6.79628 6.83212 6.30195 6.75847 5.80943C6.71263 5.50122 6.53929 5.30218 6.23206 5.24391C6.07558 5.21428 6.0985 5.15634 6.17461 5.06697C6.3067 4.91245 6.43045 4.81686 6.67777 4.81686L8.52951 4.81653C8.82136 4.87382 8.88683 5.00477 8.92645 5.29874L8.92808 7.35656C8.92464 7.47032 8.98521 7.80751 9.18948 7.88198C9.35317 7.936 9.4612 7.80473 9.55908 7.70112C10.0032 7.22987 10.3195 6.67368 10.6029 6.09801C10.7279 5.84413 10.8358 5.58142 10.9406 5.31822C11.0185 5.1236 11.1396 5.02785 11.3593 5.03112L13.1424 5.03325C13.195 5.03325 13.2483 5.03374 13.3004 5.04274C13.6009 5.09414 13.6832 5.22345 13.5903 5.5166C13.4439 5.97721 13.1596 6.36088 12.8817 6.74553C12.5838 7.15736 12.2661 7.55478 11.9711 7.96841C11.7001 8.34652 11.7215 8.53688 12.058 8.86523Z";
            break;
        case "Facebook":
            pathValue = "M7.99999 0C3.6 0 0 3.60643 0 8.04819C0 12.0643 2.928 15.3976 6.75199 16V10.3775H4.71999V8.04819H6.75199V6.27309C6.75199 4.25703 7.94399 3.14859 9.77599 3.14859C10.648 3.14859 11.56 3.30121 11.56 3.30121V5.28514H10.552C9.55999 5.28514 9.24799 5.90362 9.24799 6.53815V8.04819H11.472L11.112 10.3775H9.24799V16C11.1331 15.7011 12.8497 14.7354 14.0879 13.2772C15.3261 11.819 16.0043 9.96437 16 8.04819C16 3.60643 12.4 0 7.99999 0Z";
            break;
        case "Доп. Телефон":
        case "Телефон":
            pathValue = "M11.56 9.50222C11.0133 9.50222 10.4844 9.41333 9.99111 9.25333C9.83556 9.2 9.66222 9.24 9.54222 9.36L8.84444 10.2356C7.58667 9.63556 6.40889 8.50222 5.78222 7.2L6.64889 6.46222C6.76889 6.33778 6.80444 6.16444 6.75556 6.00889C6.59111 5.51556 6.50667 4.98667 6.50667 4.44C6.50667 4.2 6.30667 4 6.06667 4H4.52889C4.28889 4 4 4.10667 4 4.44C4 8.56889 7.43556 12 11.56 12C11.8756 12 12 11.72 12 11.4756V9.94222C12 9.70222 11.8 9.50222 11.56 9.50222Z";
            pathColor = "white";
            hasCircle = true;
            break;
        case "Email":
            pathValue = "M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4 5.75C4 5.3375 4.36 5 4.8 5H11.2C11.64 5 12 5.3375 12 5.75V10.25C12 10.6625 11.64 11 11.2 11H4.8C4.36 11 4 10.6625 4 10.25V5.75ZM8.424 8.1275L11.04 6.59375C11.14 6.53375 11.2 6.4325 11.2 6.32375C11.2 6.0725 10.908 5.9225 10.68 6.05375L8 7.625L5.32 6.05375C5.092 5.9225 4.8 6.0725 4.8 6.32375C4.8 6.4325 4.86 6.53375 4.96 6.59375L7.576 8.1275C7.836 8.28125 8.164 8.28125 8.424 8.1275Z";
            break;
        default:
            pathValue = "M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM3 8C3 5.24 5.24 3 8 3C10.76 3 13 5.24 13 8C13 10.76 10.76 13 8 13C5.24 13 3 10.76 3 8ZM9.5 6C9.5 5.17 8.83 4.5 8 4.5C7.17 4.5 6.5 5.17 6.5 6C6.5 6.83 7.17 7.5 8 7.5C8.83 7.5 9.5 6.83 9.5 6ZM5 9.99C5.645 10.96 6.75 11.6 8 11.6C9.25 11.6 10.355 10.96 11 9.99C10.985 8.995 8.995 8.45 8 8.45C7 8.45 5.015 8.995 5 9.99Z";
            break;
    }

    let svg;
    if (hasCircle) {
        svg = createSVG(
            "http://www.w3.org/2000/svg",
            BASE_PARAMETERS_SVG,
            pathValue,
            pathColor,
            null,
            true
        );
    } else {
        svg = createSVG(
            "http://www.w3.org/2000/svg",
            BASE_PARAMETERS_SVG,
            pathValue,
            pathColor
        );
    }

    return svg;
}

function createCrossSVG(color = "#F06A4D") {
    let svg = createSVG(
        "http://www.w3.org/2000/svg",
        BASE_PARAMETERS_SVG,
        "M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z",
        color,
        "url(#clip0_121_2305)",
    );

    let defs = document.createElement("defs");

    let clipPath = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
    clipPath.id = "clip0_121_2305";

    let rect = createRectForEditingEntrySVGs();

    clipPath.append(rect);
    defs.append(clipPath);

    svg.append(defs);

    return svg;
}

function createPencilSVG() {
    let svg = createSVG(
        "http://www.w3.org/2000/svg",
        BASE_PARAMETERS_SVG,
        "M2 11.5V14H4.5L11.8733 6.62662L9.37333 4.12662L2 11.5ZM13.8067 4.69329C14.0667 4.43329 14.0667 4.01329 13.8067 3.75329L12.2467 2.19329C11.9867 1.93329 11.5667 1.93329 11.3067 2.19329L10.0867 3.41329L12.5867 5.91329L13.8067 4.69329Z",
        "#9873FF",
        "url(#clip0_121_2280)"
    );

    let defs = document.createElement("defs");

    let clipPath = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
    clipPath.id = "clip0_121_2280";

    let rect = createRectForEditingEntrySVGs();

    clipPath.append(rect);
    defs.append(clipPath);

    svg.append(defs);

    return svg;
}

function createRectForEditingEntrySVGs() {
    let rect = document.createElement("rect");
    rect.setAttribute("width", "16");
    rect.setAttribute("height", "16");
    rect.setAttribute("fill", "white");

    return rect;
}

function createSVG(uri, svgParams, pathValue, pathColor, gUrl = null, hasCircle = false) {
    let svg = document.createElementNS(uri, "svg");
    for (const [k, v] of Object.entries(svgParams)) {
        svg.setAttribute(k, v);
    }

    let path = document.createElementNS(uri, "path");
    path.setAttribute("d", pathValue);
    path.setAttribute("fill", pathColor);

    let g = document.createElementNS(uri, "g");
    g.setAttribute("opacity", "0.7");
    if (gUrl) g.setAttribute("clip-path", gUrl);

    if (hasCircle) {
        let circle = document.createElementNS(uri, "circle");
        circle.setAttribute("cx", "8");
        circle.setAttribute("cy", "8");
        circle.setAttribute("r", "8");
        circle.setAttribute("fill", "#9873FF");

        g.append(circle);
    }

    g.append(path);
    svg.append(g);

    return svg;
}

function createCreatePopupRectWithText(contact) {
    let [uri, svgParams, pathValue, pathColor] = [
        "http://www.w3.org/2000/svg",
        {
            "height": "38",
            "width": "133",
            "viewBox": "0 0 133 38",
            "fill": "none",
            "xmlns": "http://www.w3.org/2000/svg"
        },
        "M0 0H133V31H69.7817L65.9012 37.276L61.9418 31H0V0Z",
        "#333333"
    ];

    let svg = document.createElementNS(uri, "svg");
    for (const [k, v] of Object.entries(svgParams)) {
        svg.setAttribute(k, v);
    }

    let g = document.createElementNS(uri, "g");
    g.setAttribute("opacity", "1");

    let path = document.createElementNS(uri, "path");
    path.setAttribute("d", pathValue);
    path.setAttribute("fill", pathColor);

    let textElem = document.createElementNS(uri, "text");
    textElem.setAttribute("y", "45%");
    textElem.setAttribute("x", "50%");
    textElem.setAttribute("font-weight", "700");
    textElem.setAttribute("font-family", "open sans");
    textElem.setAttribute("font-size", "12");
    textElem.setAttribute("text-anchor", "middle");
    textElem.setAttribute("dominant-baseline", "middle");
    textElem.setAttribute("line-height", "16");

    textElem.setAttribute("fill", "white");
    textElem.textContent = `${contact.type}: ${contact.value}`;

    let textBoxWidth = Math.max(textElem.textContent.length * 8, 133);
    svg.setAttribute("width", `${textBoxWidth}`);
    svg.setAttribute("viewBox", `0 0 ${textBoxWidth} 38`);
    svg.style.background = "#333333";

    g.append(path);
    g.append(textElem);
    svg.append(g);

    return svg;
}

export {createArrowSVG, createSVG, createPencilSVG, createCrossSVG, createContactIconSVG, createRectForEditingEntrySVGs, createCreatePopupRectWithText, BASE_PARAMETERS_SVG}