const selectableTextArea = document.querySelectorAll(".selectable-text-area");
const twitterShareBtn = document.querySelector("#twitter-share-btn");
const removeHighHightBtn = document.querySelector("#remove-high-light");

selectableTextArea.forEach(elem => {
  elem.addEventListener("mouseup", selectableTextAreaMouseUp);
});

twitterShareBtn.addEventListener("click", twitterShareBtnClick);
removeHighHightBtn.addEventListener("click", removeHighHightBtnClick);

document.addEventListener("mousedown", documentMouseDown);

function selectableTextAreaMouseUp(event) {
  setTimeout(() => { // In order to avoid some weird behavior...
    const selectedText = window.getSelection().toString().trim();
    if(selectedText.length) { 
      const x = event.pageX;
      const y = event.pageY;
      const twitterShareBtnWidth = Number(getComputedStyle(twitterShareBtn).width.slice(0,-2));
      const twitterShareBtnHeight = Number(getComputedStyle(twitterShareBtn).height.slice(0,-2));
      const removeHighHightBtnWidth = Number(getComputedStyle(removeHighHightBtn).width.slice(0,-2));
      const removeHighHightBtnHeight = Number(getComputedStyle(removeHighHightBtn).height.slice(0,-2));

      if(document.activeElement !== twitterShareBtn) {
        twitterShareBtn.style.left = `${x}px`;
        twitterShareBtn.style.top = `${y}px`;
        twitterShareBtn.style.display = "block";
        twitterShareBtn.classList.add("btnEntrance");
      }
      else {
        twitterShareBtn.style.left = `${x}px`;
        twitterShareBtn.style.top = `${y}px`;
      }
      if(document.activeElement !== removeHighHightBtn) {
        removeHighHightBtn.style.left = `${x + removeHighHightBtnWidth}px`;
        removeHighHightBtn.style.top = `${y}px`;
        removeHighHightBtn.style.display = "block";
        removeHighHightBtn.classList.add("btnEntrance");
      }
      else {
        removeHighHightBtn.style.left = `${x + removeHighHightBtnWidth}px`;
        removeHighHightBtn.style.top = `${y}px`;
      }
    }    
  }, 0);
}

function documentMouseDown(event) {
  
  if(event.target.id!=="remove-high-light" && getComputedStyle(removeHighHightBtn).display==="block" && event.target.id!=="twitter-share-btn" && getComputedStyle(twitterShareBtn).display==="block") {
    removeHighHightBtn.style.display = "none";
    removeHighHightBtn.classList.remove("btnEntrance");
    twitterShareBtn.style.display = "none";
    twitterShareBtn.classList.remove("btnEntrance");
    window.getSelection().empty();
  }
  
}



function twitterShareBtnClick(event) {
    var userSelection = window.getSelection().getRangeAt(0);
    var safeRanges = getSafeRanges(userSelection);
    for (var i = 0; i < safeRanges.length; i++) {
        highlightRange(safeRanges[i]);
    }
}

function removeHighHightBtnClick(event) {
    var userSelection = window.getSelection().getRangeAt(0);
    var safeRanges = getSafeRanges(userSelection);
    for (var i = 0; i < safeRanges.length; i++) {
        removehighlightRange(safeRanges[i]);
    }
}


function removehighlightRange(range) {
    var newNode = document.createElement("SPAN");
    newNode.setAttribute(
       "style",
       "background-color: white ; display: inline;"
    );
    range.surroundContents(newNode);
}
function highlightRange(range) {
    var newNode = document.createElement("SPAN");
    newNode.setAttribute(
       "class",
       "highlight"
    );
    range.surroundContents(newNode);
}



function getSafeRanges(dangerous) {
    var a = dangerous.commonAncestorContainer;
    // Starts -- Work inward from the start, selecting the largest safe range
    var s = new Array(0), rs = new Array(0);
    if (dangerous.startContainer != a)
        for(var i = dangerous.startContainer; i != a; i = i.parentNode)
            s.push(i)
    ;
    if (0 < s.length) for(var i = 0; i < s.length; i++) {
        var xs = document.createRange();
        if (i) {
            xs.setStartAfter(s[i-1]);
            xs.setEndAfter(s[i].lastChild);
        }
        else {
            xs.setStart(s[i], dangerous.startOffset);
            xs.setEndAfter(
                (s[i].nodeType == Node.TEXT_NODE)
                ? s[i] : s[i].lastChild
            );
        }
        rs.push(xs);
    }

    // Ends -- basically the same code reversed
    var e = new Array(0), re = new Array(0);
    if (dangerous.endContainer != a)
        for(var i = dangerous.endContainer; i != a; i = i.parentNode)
            e.push(i)
    ;
    if (0 < e.length) for(var i = 0; i < e.length; i++) {
        var xe = document.createRange();
        if (i) {
            xe.setStartBefore(e[i].firstChild);
            xe.setEndBefore(e[i-1]);
        }
        else {
            xe.setStartBefore(
                (e[i].nodeType == Node.TEXT_NODE)
                ? e[i] : e[i].firstChild
            );
            xe.setEnd(e[i], dangerous.endOffset);
        }
        re.unshift(xe);
    }

    // Middle -- the uncaptured middle
    if ((0 < s.length) && (0 < e.length)) {
        var xm = document.createRange();
        xm.setStartAfter(s[s.length - 1]);
        xm.setEndBefore(e[e.length - 1]);
    }
    else {
        return [dangerous];
    }

    // Concat
    rs.push(xm);
    response = rs.concat(re);    

    // Send to Console
    return response;
}

