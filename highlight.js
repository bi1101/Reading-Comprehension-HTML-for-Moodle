(function() {
var t = '';
var CONTAINER_ID = '5kjl3_container_id';
var BUBBLE_COLOR = 'rgba(40, 40, 40, 0.8)';
var HL_COLOR = '#ffcc00';
var HIGHLIGHT_ICON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path xmlns="http://www.w3.org/2000/svg" fill="white" d="M24.001 8.534l-11.103 11.218-5.898 1.248 1.361-5.784 11.104-11.216 4.536 4.534zm-24 10.466l-.001 2h5v-2h-4.999z"/></svg>';
var TWITTER_ICON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path xmlns="http://www.w3.org/2000/svg" fill="white" d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>';
var FACEBOOK_ICON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path xmlns="http://www.w3.org/2000/svg" fill="white" d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>';
var DELETE_ICON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>';
var COPY_ICON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="M10 19h10v1h-10v-1zm14-13v18h-18v-6h-6v-18h18v6h6zm-18 0h10v-4h-14v14h4v-10zm16 2h-1.93c-.669 0-1.293.334-1.664.891l-1.406 2.109h-3.93l-1.406-2.109c-.371-.557-.995-.891-1.664-.891h-2v14h14v-14zm-12 6h10v-1h-10v1zm0 3h10v-1h-10v1z"/></svg>';
var COLOR_BRUSH_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="yellow" d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-6.373 16.199c3.809.315 2.446-3.73 5.97-3.769l1.526 1.274c.381 4.6-5.244 5.626-7.496 2.495zm8.293-3.396l-1.549-1.293c.457-2.18 1.854-4.188 3.267-5.51l3.362 2.804c-1.041 1.636-3.023 3.154-5.08 3.999z"/></svg>'

var config = {};
var defaultConfig = {};

defaultConfig.bubbleColor = BUBBLE_COLOR;
defaultConfig.buttons = [

    {
        svg: HIGHLIGHT_ICON_SVG,
        onclick: function(e, range) {
            //console.log(range);
            var hl_span=document.createElement("span");
            //hl_span.setAttribute("style", "background-color: green; display: inline;");
            hl_span.style.backgroundColor=HL_COLOR;
            range.surroundContents(hl_span);
        hl_span.addEventListener('click', function(){showHighlightedOptions(hl_span);}); //showHighlightOptions);
        document.getSelection().removeAllRanges();
        clear();
        }
    },    {
        svg: COPY_ICON_SVG,
        onclick: function(e, range) {
            copyToClipboard(range);
    }
    }
];
defaultConfig.buttonsEdit = [
    {
        svg: COLOR_BRUSH_SVG,
        onclick: function(e, obj) {
            obj.style.backgroundColor='#ffcc00';
        },
        svgColor: "#ffcc00" //yellow
    },
    {
        svg: COLOR_BRUSH_SVG,
        onclick: function(e, obj) {
            obj.style.backgroundColor='#ff6666';
        },
        svgColor: "#ff6666"  //flamingo
    },
    {
        svg: COLOR_BRUSH_SVG,
        onclick: function(e, obj) {
            obj.style.backgroundColor='#cc0066';
        },
        svgColor: "#cc0066"  //cerise
    },
    {
        svg: COLOR_BRUSH_SVG,
        onclick: function(e, obj) {
            obj.style.backgroundColor='#66cccc';
        },
        svgColor: "#66cccc" //turquoise
    },
    {
        svg: COLOR_BRUSH_SVG,
        onclick: function(e, obj) {
            obj.style.backgroundColor='#9aceff';
        },
        svgColor: "#9aceff" //azure
    },
    {
        svg: COPY_ICON_SVG,
        onclick: function(e, obj) {
        copyToClipboard(obj.innerHTML);
    }
    },
    {
        svg: DELETE_ICON_SVG,
        onclick: function(e, obj) {
        obj.outerHTML=obj.innerHTML;
        clear();
        }
    }
];

var enc = encodeURI;

function copyToClipboard(s) {
    var textArea = document.createElement("textarea");
    textArea.value=s;
    textArea.style.position="fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    clear();
}

function encQ(s) {
    return enc('"' + s + '"');
}

function setStyle(el, obj, val) {
    var styles = (el.getAttribute('style') || '').split(';');
    var orig = {};
    var newStyles = [];
    styles.forEach(function(s) {
        if (s === '') {
            return;
        }
        var parts = s.split(':');
        orig[parts[0].trim()] = parts[1].trim();
    });
    var toSerialize = {};

    if (typeof val !== 'undefined') {
        orig[obj] = val;
        toSerialize = orig;
    } else {
        toSerialize = obj;
    }

    Object.keys(toSerialize).forEach(function(k) {
        if (toSerialize[k] !== null) {
            newStyles.push(k + ': ' + toSerialize[k]);
        }
    });
    el.setAttribute('style', newStyles.join('; '));
}

function generateButton(svgString, onclick, svgColor=null) {
    var parser = new DOMParser();
    var svg = parser.parseFromString(svgString, "image/svg+xml").childNodes[0];
    if (svgColor) { 
    //console.log(svg);
    svg.firstChild.attributes['fill'].value=svgColor;
    }
    var hButton = document.createElement('div');
    hButton.appendChild(svg);
    setStyle(hButton, {
        display: 'inline-block',
        margin: '0',
        cursor: 'pointer',
        padding: '7px'
    });

    hButton.onclick = hButton.ontouchend = onclick;

    return hButton;
}

function insertHighlightOptionNode(selection, ori) {
    if (ori) { 
    var range = selection.getRangeAt(0);
    if (range.collapsed || !range.toString()) {
        return;
    } } else {
    var range=selection;
    }
    
    var container = document.createElement('div');
    container.id = CONTAINER_ID;
    setStyle(container, {
        position: 'absolute',
        color: 'white',
        visibility: 'hidden',
        padding: '0 7px'
    });
    container.onmousedown = container.ontouchstart = function(e) {
        e.preventDefault();
        e.stopPropagation();
    };
    container.onmouseup = container.ontouchend = function(e) {
        e.stopPropagation();
    };

    var bubbleOptions = document.createElement('div');
    setStyle(bubbleOptions, {
        'white-space': 'nowrap',
        'border-radius': '4px',
        display: 'inline-block',
        background: defaultConfig.bubbleColor,
        padding: '0 4px'
    });
    var downCarrot = document.createElement('div');
    setStyle(downCarrot, {
        width: 0,
        height: 0, 
        'border-left': '6px solid transparent',
        'border-right': '6px solid transparent',
        'border-top': '10px solid ' + defaultConfig.bubbleColor,
        margin: 'auto',
    });

    container.appendChild(bubbleOptions);
    container.appendChild(downCarrot);

    if (ori) {
    var btn=config.buttons;
    } else { var btn=config.buttonsEdit}
    btn.forEach(function(buttonConfig) {
        bubbleOptions.appendChild(generateButton(buttonConfig.svg, function(e) {
            buttonConfig.onclick(e, range);
        }, buttonConfig.svgColor)); 
    });

    // Calculate bounds of range
    var cRects = range.getClientRects(); //console.log(cRects);
    var hBounds = [];
    for (var i = 0; i < cRects.length; i++) {
        hBounds.push(cRects[i].left);
        hBounds.push(cRects[i].right);
    }
    var rLeft = Math.min.apply(null, hBounds);
    var rRight = Math.max.apply(null, hBounds);

    var y = cRects[0].top + window.scrollY;
    var x = rLeft + window.scrollX + ((rRight - rLeft) / 2);
    
    document.getElementById("target").appendChild(container);

    var containerHeight = window.getComputedStyle(container).getPropertyValue('height');
    var containerWidth = window.getComputedStyle(container).getPropertyValue('width');
    var cWidth = parseInt(containerWidth.replace('px', ''));
    var windowWidth = window.innerWidth;
    
    var left = x - cWidth / 2;
    if (left < 0) {
        setStyle(container, 'left',  left + 'px');
    } else if (left + cWidth > windowWidth) {
        setStyle(container, 'right',  0 + 'px');
    } else {
        setStyle(container, 'left',  left + 'px');
    }

    var top = y - parseInt(containerHeight.replace('px', ''))
    if (top < 0) {
        top = 0
    }

    setStyle(container, 'z-index', 2147483647);
    setStyle(container, 'top', top + 'px');
    setStyle(container, 'visibility', 'visible');
}

function showHighlightOptions(e) {
    t = document.getSelection();
    var ori=true;
    if (t) {
        insertHighlightOptionNode(t, ori);
    }
}

function showHighlightedOptions(obj) {
    var ori=false;
    if (obj) {
        insertHighlightOptionNode(obj, ori);
    }
}

function clear() {
    var e = document.getElementById(CONTAINER_ID);
    if (e) {
        e.parentElement.removeChild(e);
        //console.log("exit");
    }
}

function init(customConfig) {
    config = defaultConfig;
    Object.keys(customConfig || {}).forEach(function(k) {
        config[k] = customConfig[k]; 
    });
    document.onmouseup = document.ontouchend = showHighlightOptions;
    document.onmousedown = document.ontouchstart = clear;
}

window.TinyQ = {
    init: function(config) {
        init(config)
    }
}

})();
document.addEventListener("DOMContentLoaded", function(event) {
    window.TinyQ.init();
  });
