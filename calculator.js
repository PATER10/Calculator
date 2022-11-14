let resultEnd = false;
let operatorUsed = false;
let dotUsed = false;
let memoryDisplay = false;

//get element
document.addEventListener("click", function (a) {
	// show number
	if (
		a.target.classList.contains("number") ||
		a.target.classList.contains("number_zero")
	) {
		if (resultEnd === true) {
			document.getElementById("calculations").innerText =
				document.getElementById("result").innerText;
			if (!a.target.classList.contains("operator")) {
				document.getElementById("calculations").innerText = "";
			}
			document.getElementById("result").innerText = "";
		}
		document.getElementById("calculations").innerText += a.target.value;
		resultEnd = false;
		operatorUsed = false;
	}

	//show dot
	if (a.target.classList.contains("dot")) {
		if (resultEnd === true) {
			document.getElementById("calculations").innerText =
				document.getElementById("result").innerText;
			document.getElementById("result").innerText = "";
			resultEnd = false;
		}
		if (document.getElementById("calculations").innerText === "") {
			dotUsed = true;
			return (document.getElementById("calculations").innerText = "0.");
		}
		if (dotUsed === false) {
			document.getElementById("calculations").innerText += a.target.value;
			dotUsed = true;
		}
	}

	//show operator
	if (a.target.classList.contains("operator")) {
		if (document.getElementById("calculations").innerText === "-") {
			return 0;
		}
		if (
			document.getElementById("calculations").innerText === "" &&
			a.target.value != "-" &&
			document.getElementById("result").innerText === ""
		) {
			return 0;
		}
		if (operatorUsed === false) {
			document.getElementById("calculations").innerText += a.target.value;
			operatorUsed = true;
		}
		if (operatorUsed === true) {
			let currentText = document.getElementById("calculations").innerText;
			let substring = currentText.replace(/.$/, a.target.value);
			document.getElementById("calculations").innerText = substring;
		}
		if (resultEnd === true) {
			document.getElementById("calculations").innerText =
				document.getElementById("result").innerText;
			document.getElementById("result").innerText = "";
			document.getElementById("calculations").innerText += a.target.value;
			resultEnd = false;
		}
		dotUsed = false;
	}

	// show equal
	if (a.target.classList.contains("equals")) {
		if (
			document.getElementById("calculations").innerText === "" &&
			document.getElementById("result").innerText === ""
		) {
			return (document.getElementById("result").innerText = "0");
		}
		if (document.getElementById("result").innerText === "0") {
			return (document.getElementById("result").innerText = "0");
		}
		let result = eval(document.getElementById("calculations").innerText);
		document.getElementById("result").innerText = result;
		if (document.getElementById("result").innerText === "Infinity") {
			document.getElementById("result").innerText = "Error";
		}
		document.getElementById("calculations").innerText;
		resultEnd = true;
	}

	//square root of numbers
	if (a.target.classList.contains("sqr")) {
		if (
			parseInt(eval(document.getElementById("calculations").innerText)) <
			parseInt(0)
		) {
			return (document.getElementById("result").innerText = "Error");
		}
		if (
			document.getElementById("calculations").innerText === "" &&
			document.getElementById("result").innerText === ""
		) {
			return (document.getElementById("result").innerText = "0");
		}
		if (document.getElementById("result").innerText === "") {
			var result = Math.sqrt(
				eval(document.getElementById("calculations").innerText)
			);
		} else {
			var result = Math.sqrt(document.getElementById("result").innerText);
		}
		document.getElementById("result").innerText = result;
		resultEnd = true;
	}

	//clear display
	if (a.target.classList.contains("clearbtn")) {
		document.getElementById("calculations").innerText = "";
		document.getElementById("result").innerText = "";
		dotUsed = false;
		operatorUsed = false;
	}

	//backspace
	if (a.target.classList.contains("backspace")) {
		let text = document.getElementById("calculations").innerText;
		let substring = text.replace(/.$/, "");
		document.getElementById("calculations").innerText = substring;
	}

	//memory

	//clear memory
	if (a.target.classList.contains("clearMemory")) {
		memoryDisplay = false;
	}

	//add memory
	if (a.target.classList.contains("addMemory")) {
		memoryDisplay = true;
		if (memoryDisplay === true) {
			if (document.getElementById("display").innerText === "") {
				memoryDisplay = false;
			}
			if (document.getElementById("result").innerText === "") {
				if (document.getElementById("memoryDisplay2").innerText === "") {
					let d2 = 0;
					document.getElementById("memoryDisplay2").innerText = eval(
						d2 +
							parseFloat(
								eval(document.getElementById("calculations").innerText)
							)
					);
				} else {
					document.getElementById("memoryDisplay2").innerText = eval(
						parseFloat(document.getElementById("memoryDisplay2").innerText) +
							parseFloat(
								eval(document.getElementById("calculations").innerText)
							)
					);
				}
			} else {
				if (document.getElementById("memoryDisplay2").innerText === "") {
					let d2 = 0;
					document.getElementById("memoryDisplay2").innerText = eval(
						d2 + parseFloat(document.getElementById("result").innerText)
					);
				} else {
					document.getElementById("memoryDisplay2").innerText = eval(
						parseFloat(document.getElementById("memoryDisplay2").innerText) +
							parseFloat(document.getElementById("result").innerText)
					);
				}
			}
		}
	}

	//minus memory
	if (a.target.classList.contains("minusMemory")) {
		if (document.getElementById("display").innerText === "") {
			return;
		}
		if (document.getElementById("memoryDisplay2").innerText === "") {
		} else {
			if (document.getElementById("result").innerText === "") {
				document.getElementById("memoryDisplay2").innerText = eval(
					parseFloat(document.getElementById("memoryDisplay2").innerText) -
						parseFloat(document.getElementById("calculations").innerText)
				);
			} else if ((memoryDisplay = true)) {
				document.getElementById("memoryDisplay2").innerText = eval(
					parseFloat(document.getElementById("memoryDisplay2").innerText) -
						parseFloat(document.getElementById("result").innerText)
				);
			}
		}
	}
	if (memoryDisplay === true) {
		document.getElementById("memoryDisplay1").innerText = "Memory =  ";
		if (document.getElementById("memoryDisplay2").innerText === "NaN") {
			document.getElementById("memoryDisplay1").innerText = "";
			document.getElementById("memoryDisplay2").innerText = "";
			memoryDisplay = false;
		}
	} else {
		document.getElementById("memoryDisplay1").innerText = "";
		document.getElementById("memoryDisplay2").innerText = "";
	}

	//show memory
	if (a.target.classList.contains("showMemory")) {
		resultEnd = true;
		document.getElementById("result").innerText +=
			document.getElementById("memoryDisplay2").innerText;
	}
});
