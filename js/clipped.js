class ClipPath
{
    type;

    constructor(size) {
        this.defaultSize = size;
    }

    toPropertyName() {
        return this.type.replace(/-./g, x => x[1].toUpperCase());
    }
}

class ClipPathTopLeft extends ClipPath
{
    type = "top-left";

    getXY(size) {
        size ??= this.defaultSize;
        return `0 ${size}%, ${size}% 0`;
    }
}

class ClipPathTopRight extends ClipPath
{
    type = "top-right";

    getXY(size) {
        size ??= this.defaultSize;
        return `${100 - size}% 0, 100% ${size}%`;
    }
}

class ClipPathBottomRight extends ClipPath
{
    type = "bottom-right";

    getXY(size) {
        size ??= this.defaultSize;
        return `100% ${100 - size}%, ${100 - size}% 100%`;
    }
}

class ClipPathBottomLeft extends ClipPath
{
    type = "bottom-left";

    getXY(size) {
        size ??= this.defaultSize;
        return `${size}% 100%, 0 ${100 - size}%`;
    }
}


(function () {
    const DEFAULT_SIZE = 10;
    const clipPathCorners = [
        new ClipPathTopLeft(DEFAULT_SIZE),
        new ClipPathTopRight(DEFAULT_SIZE),
        new ClipPathBottomRight(DEFAULT_SIZE),
        new ClipPathBottomLeft(DEFAULT_SIZE)
    ];

    function clipPath({ topLeft, topRight, bottomRight, bottomLeft }) {
        return `polygon(${topLeft}, ${topRight}, ${bottomRight}, ${bottomLeft})`;
    }

    function getClipPathSetting(e) {
        const clipPathSetting = {};
        for (const className of e.classList) {
            if (!className.includes("clipped-")) {
                continue;
            }
            const clipString = className.replace("clipped-", "");
            const [clipType, clipSize] = clipString.split(":");
            const clipPathCorner = clipPathCorners.find(c => c.type === clipType);
            if (!clipPathCorner) {
                continue;
            }
            clipPathSetting[clipPathCorner.toPropertyName()] = clipPathCorner.getXY(clipSize);
        }
        return clipPathSetting;
    }


    function clipPathElement(e) {
        const clipPathSetting = getClipPathSetting(e);
        console.log(clipPath(clipPathSetting));
        e.style.clipPath = clipPath(clipPathSetting);
    }

    function clipElements() {
        const clipped = document.querySelectorAll(".clipped");
        for (const e of clipped) {
            clipPathElement(e);
        }
    }

    clipElements();
})();
