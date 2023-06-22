let currentSelection;
let selection;
let active = false;
let highlightColor = 'yellow';
let highlightSections = [];
const navBar = document.getElementById('navBar');
const btnToggle = document.getElementById('btnToggle');
const btnSelect = document.getElementById('btnSelect');
const btnYellow = document.getElementById('btnYellow');
const btnGreen = document.getElementById('btnGreen');
const btnPink = document.getElementById('btnPink');
const btnBlue = document.getElementById('btnBlue');
const highlightList = document.getElementById('highlightList');
const markInstance = new Mark(document.querySelector('.text-container'));
const colorPopup = document.getElementById('colorPopup');

const textSelect = () => {
    selection = document.getSelection();
    const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
    const text = selection.toString();

    if (range && text.length > 3) {
        // check the range startContainer. nodeType 3 is the actual Text inside an Element, so select the parentNode in that situation
        const startElmement = (range.startContainer.nodeType === 3 ? range.startContainer.parentNode : range.startContainer);

        // Check up the DOM tree for the text-container, where all the highlightable text is contained.
        const startComponent = startElmement.closest('.text-container');
        if (startComponent) {
            currentSelection = text;
        }
        else {
            // selection is outside the text-container
            currentSelection = null;
        }
    }
    else {
        // selection is too short
        currentSelection = null;
    }
    // if we have a valid selection, enable the select button, otherwise disable it
    btnSelect.disabled = currentSelection ? false : true;
    btnSelect.innerText = currentSelection ? 'Highlight Selected Text' : 'Select Text to Highlight';
};

document.addEventListener('mouseup', () => {
    const selection = document.getSelection();
    const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
    const text = selection.toString();
    const colorPopup = document.getElementById('colorPopup');

    if (range && text.length > 3) {
        // check the range startContainer. nodeType 3 is the actual Text inside an Element, so select the parentNode in that situation
        const startElement = (range.startContainer.nodeType === 3 ? range.startContainer.parentNode : range.startContainer);

        // Check up the DOM tree for the text-container, where all the highlightable text is contained.
        const startComponent = startElement.closest('.text-container');
        if (startComponent) {
            currentSelection = text;

            // Show the color popup and position it at the end of the selection
            const rect = range.getBoundingClientRect();
            colorPopup.style.left = rect.right + 'px';
            colorPopup.style.top = rect.bottom + 'px';
            colorPopup.style.display = 'block';
        }
        else {
            // selection is outside the text-container
            currentSelection = null;
            colorPopup.style.display = 'none';
        }
    }
    else {
        // selection is too short
        currentSelection = null;
        colorPopup.style.display = 'none';
    }
});


const applyHighlighting = () => {
    highlightSections.forEach(section => {
        markInstance.mark(section.text, {
            caseSensitive: true,
            acrossElements: true,
            separateWordSearch: false,
            each: (elm) => {
                elm.classList.add(section.color);
                elm.classList.add('animated');
                setTimeout(() => {
                    elm.classList.add('animate');
                }, 250);
            }
        });
    });
};

const removeHighlight = (index) => {
    // update the array
    highlightSections.splice(index, 1);
    // update the list
    const listItem = highlightList.children[index]; // +1 so we ignore the heading
    if (listItem) {
        listItem.classList.remove('in');
        // wait for the animation to finish
        setTimeout(() => {
            // check if any highlights remain
            if (highlightSections.length) {
                // remove all highlighting, then reapply highlights that remain (but without the animation)
                markInstance.unmark({
                    done: () => {
                        highlightSections.forEach(section => {
                            markInstance.mark(section.text, {
                                caseSensitive: true,
                                acrossElements: true,
                                separateWordSearch: false,
                                each: (elm) => {
                                    elm.classList.add(section.color);
                                }
                            });
                        });
                    }
                });
            }
            else {
                // nothing left, clear all highlights. ad hide the list
                markInstance.unmark();
            }
            buildHighlightList(true);
        }, 250);
    }
};

const changeColor = (color) => {
    return new Promise((resolve, reject) => {
        // animate the toolbar
        navBar.classList.remove('animate');
        setTimeout(() => {
            navBar.classList.remove(highlightColor);
            navBar.classList.add(color);
            // update the color choice
            highlightColor = color;
            resolve();
        }, 0);
    })
        .then(() => {
            // Execute the btnSelect.onclick function immediately after changing the color
            btnSelect.onclick();
        })
        .then(() => {
            setTimeout(() => {
                navBar.classList.add('animate');
            }, 250);
      // Hide the color popup
    const colorPopup = document.getElementById('colorPopup');
    colorPopup.style.display = 'none';
        });
    
};


const buildHighlightList = (rebuild) => {
    highlightList.innerHTML = highlightSections.length ? '' : '<span class="text-muted font-italic">None...</span>';
    highlightSections.forEach((section, s) => {
        const item = document.createElement('div');
        item.classList.add('highlight-list-item');
        item.innerHTML = `
      <a role="button" onClick="removeHighlight(${s})">
        <i class="fa fa-times"></i>
      </a>
      <mark class="${section.color}">${section.text}</mark>
    </div>
    `;
        highlightList.appendChild(item);
        if (!rebuild && s === highlightSections.length - 1) {
            setTimeout(() => {
                item.classList.add('in');
            }, 250);
        }
        else {
            item.classList.add('in');
        }

    })
};

document.addEventListener('selectionchange', textSelect);


btnSelect.onclick = () => {
    highlightSections.push({
        text: currentSelection,
        color: highlightColor
    });
    console.log('Selected Text Snippets:', highlightSections);
    selection.removeAllRanges();
    applyHighlighting();
    buildHighlightList();
};
