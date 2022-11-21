class Colour {
	constructor(hex, element) {
		this.hex = hex;
		this.element = element;
		this.locked = false;
	}

	setHex(hex) {
		this.hex = hex;
		this.element.style.backgroundColor = hex;
		this.element.querySelector(".color-input").value = hex;
	}

	setLocked(locked) {
		this.locked = locked;

		if (locked) {
			this.element
				.querySelector(".lock-toggle")
				.classList.add("is-locked");

			this.element
				.querySelector("img")
				.src = "./iconos/lock-closed.svg";
		} else {
			this.element
				.querySelector(".lock-toggle")
				.classList.remove("is-locked");

			this.element
				.querySelector("img")
				.src = "./iconos/lock-open.svg";
		}
	}

	toggleLocked() {
		this.setLocked(!this.locked);
	}

	generateHex() {
		if (this.locked) {
			return
		}
		
		const chars = "0123456789ABCDEF";
		let color = "#";
		for (let i = 0; i < 6; i++) {
			color += chars[Math.floor(Math.random() * 16)];
		}
		
		this.setHex(color);
	}

	copyToClipboard() {
		const input = this.element.querySelector(".color-input");
		input.select();
		document.execCommand("copy");
		input.blur();

		this.element.classList.add("copied");
		setTimeout(() => {
			this.element.classList.remove("copied");
		}, 1000);
	}
}

function copyToClipboard(){

	alert("Congratulations! You have your code copied.")
}

const colour_elements = document.querySelectorAll('.colors .color');

const colours = [];

for (let i = 0; i < colour_elements.length; i++) {
	const colour_element = colour_elements[i];

	const input = colour_element.querySelector(".color-input");
	const lock_toggle = colour_element.querySelector(".lock-toggle");
	const copy_btn = colour_element.querySelector(".copy-hex");

	const hex = input.value;

	const colour = new Colour(hex, colour_element);

	input.addEventListener('input', (e) => colour.setHex(e.target.value));
	lock_toggle.addEventListener('click', () => colour.toggleLocked());
	copy_btn.addEventListener('click', () => colour.copyToClipboard());

	colour.generateHex();
	colours.push(colour);
}

document.querySelector(".generator-button").addEventListener("click", () => {
	for (let i = 0; i < colours.length; i++) {
		colours[i].generateHex();
	}
});

document.addEventListener('keypress', (e) => {
	if (e.code.toLowerCase() === "space") {
		document.querySelector(".generator-button").click();
	}
})


var color1 = document.querySelector(".color1");
var color2 = document.querySelector(".color2");
var gradient = document.getElementById("gradient-clone");

function setGradient() {
 gradient.style.background = 
 "linear-gradient(90deg, " 
 + color1.value 
 + ", " 
 + color2.value 
 + ")";
 css.textContent = gradient.style.background + ";";
}


color1.addEventListener("input", setGradient);
color2.addEventListener("input", setGradient);




// GRADIENT COLOR RANDOMIZER //

function RandomColor (color1, color2) {

    var _regs = {
        "hex3"  : /^#([a-f\d])([a-f\d])([a-f\d])$/i,
        "hex6"  : /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
        "rgb"   : /^rgb\s*\(\s*([\d\.]+%?)\s*\,\s*([\d\.]+%?)\s*\,\s*([\d\.]+%?)\s*\)$/
    };

    var _obj1 = getValues(color1);
    var _obj2 = getValues(color2);

    //---Get the colors
    function getValues (color) {

        var values = false;

        for (var prop in _regs) {

            if (_regs[prop].test(color)) {

                values = {};

                values.r = color.replace(_regs[prop], "$1");
                values.g = color.replace(_regs[prop], "$2");
                values.b = color.replace(_regs[prop], "$3");

                if (prop === "rgb") {
 
                    values.r = Number(values.r);
                    values.g = Number(values.g);
                    values.b = Number(values.b);

                } else {

                    values.r = parseInt(values.r, 16);
                    values.g = parseInt(values.g, 16);
                    values.b = parseInt(values.b, 16);

                }

                break;

            }

        }

        return values;

    }

    //---str_pad
    function str_pad (str, pad_length, pad_string, pad_type) {

        var len = pad_length - str.length;
        if (len < 0) { return str };
        var pad = new Array(len + 1).join(pad_string);
        if (pad_type === "STR_PAD_LEFT") { return pad + str };
        return str + pad;

    }

    //---Get a value
    function getRandom (c1, c2, pcent) {

        var color = c1 + Math.floor((c2 - c1) * pcent);

        if (color < 0) color = 0;

	    return str_pad(color.toString(16), 2, "0", "STR_PAD_LEFT");

    }

    //---Get a random color
    this.getColor = function () {

        if (_obj1 && _obj2) {

            var random = Math.random();

            var r = getRandom(_obj1.r, _obj2.r, random);
            var g = getRandom(_obj1.g, _obj2.g, random);
            var b = getRandom(_obj1.b, _obj2.b, random);

            return "#" + r + g + b;

        }

        return false;

    };

}

var doc = document;
var link = doc.querySelector("#link");
var thumb = doc.querySelector(".thumb");
var generator = new RandomColor("#000", "rgb(0, 207, 239)");

link.addEventListener("click", function (evt) {

    evt.preventDefault();

    var color = generator.getColor();

    if (color) {
        thumb.style.background = color;
        thumb.innerHTML = color;
    }
});




