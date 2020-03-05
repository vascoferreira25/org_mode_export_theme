// Get all the elements with the source code
let pre_elements = document.getElementsByTagName("pre");

Array.from(pre_elements).forEach(pre_element => {
    // Create a new element to insert the code as
    // needed by Prism.js
    let code_element = document.createElement("code");
	// pre_element.setAttribute('data-line', '2');
    
    // Get the name of the programming language
    let language = pre_element.className.split('-')[1];
    
    // Copy the source code from `pre` tag
    code_element.innerHTML = pre_element.innerHTML;
    code_element.className = "language-" + language;
    
    // Delete the content of the pre tag and append the code tag
    pre_element.innerHTML = "";
    pre_element.classList.add("line-numbers");
    pre_element.appendChild(code_element);
});

// Get all tables and surround them in a div with a scroll bar if too long
let table_elements = document.getElementsByTagName("table");

Array.from(table_elements).forEach(table => {
    
    // Create a new div element to insert the table
    let div_element = document.createElement("div");
    
    // Create a div element after the table and append the table to it
    temp_elem = table.insertAdjacentElement("afterend", div_element);
    
    // Copy the table into the div
    div_element.appendChild(table);
    div_element.className = "responsive-table";
    
    temp_elem.insertAdjacentElement("beforebegin", div_element);
    
});

// generate toc
function getElementsByTagNames(list,obj) {
	if (!obj) var obj = document;
	var tagNames = list.split(',');
	var resultArray = new Array();
	for (var i=0;i<tagNames.length;i++) {
		var tags = obj.getElementsByTagName(tagNames[i]);
		for (var j=0;j<tags.length;j++) {
			resultArray.push(tags[j]);
		}
	}
	var testNode = resultArray[0];
	if (!testNode) return [];
	if (testNode.sourceIndex) {
		resultArray.sort(function (a,b) {
				return a.sourceIndex - b.sourceIndex;
		});
	}
	else if (testNode.compareDocumentPosition) {
		resultArray.sort(function (a,b) {
				return 3 - (a.compareDocumentPosition(b) & 6);
		});
	}
	return resultArray;
}

function createTOC() {
	var z = document.getElementById("toc");;
	var toBeTOCced = getElementsByTagNames('h2,h3,h4,h5');
	if (toBeTOCced.length < 2) return false;
	
	// Add go to top button
	var top = document.createElement('a');
	top.innerHTML = 'Top';
	top.href = '#top';
	top.className += 'top';
	z.appendChild(top);

	for (var i=0;i<toBeTOCced.length;i++) {
		var tmp = document.createElement('a');
		tmp.innerHTML = toBeTOCced[i].innerHTML;
		tmp.className = 'page';
		z.appendChild(tmp);
		if (toBeTOCced[i].nodeName == 'H1')
			tmp.className += ' indent-h1';
		if (toBeTOCced[i].nodeName == 'H2')
			tmp.className += ' indent-h2';
		if (toBeTOCced[i].nodeName == 'H3')
			tmp.className += ' indent-h3';
		if (toBeTOCced[i].nodeName == 'H4')
			tmp.className += ' indent-h4';
		if (toBeTOCced[i].nodeName == 'H5')
			tmp.className += ' indent-h5';
		if (toBeTOCced[i].nodeName == 'H6')
			tmp.className += ' indent-h6';
		var headerId = toBeTOCced[i].id || 'link' + i;
		tmp.href = '#' + headerId;
		toBeTOCced[i].id = headerId;
		// if (toBeTOCced[i].nodeName == 'H2') {
			// tmp.innerHTML = 'Top';
			// tmp.href = '#top';
			// tmp.className += ' top';
			// toBeTOCced[i].id = 'top';
		// }
	}
}

let toc = createTOC();