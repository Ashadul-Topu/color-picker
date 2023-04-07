
// step1: generate a random color by clicking on the random color button.
// step2: show the random color in the color plate and show color code in the Hex and RGB fields. 
// step3: copy color code by clicking on the copy color code button
// step4: select color code copy mode (hex or rgb) by clicking on the radio button
// step5: take input and show color code in the hex input field
// step6:


window.onload = function(){
    main()
}

function main() {
    // variable declaration
    const colorBtn = document.getElementById('color-btn');
    const showColor = document.querySelector('.color-plate');
    const copyColor = document.getElementById('copy-color');
    const inputColor = document.getElementById('input');
    const output = document.getElementById('output');
    const colorRed = document.getElementById('color-slider-red');
    const colorGreen = document.getElementById('color-slider-green');
    const colorBlue = document.getElementById('color-slider-blue');


    // function invoke
    colorBtn.addEventListener('click', function(){
        const color = generateColorDecimal();
        const hexColor = generateColorHex(color)
        const rgbColor = generateColorRGB(color)
        showColor.style.backgroundColor = hexColor // change Background Color
        //  input.value = inputColor.toUpperCase().substring(1)
        //  output.value = rgbColor

         console.log('generate color btb click');
    })

}

    //Generate random color
    function generateColorDecimal(){
        const r = Math.floor(Math.random() * 256)
        const g = Math.floor(Math.random() * 256)
        const b = Math.floor(Math.random() * 256)
    
        return {
            red,
            green,
            blue,
        }
    }
    // Generate Hex color
    function generateColorHex({red, green, blue}){
        
        const getTwoCode = (value) =>{
            const hex = value.toString(16)
            return hex.length == 1? `0${hex}` : hex;
        }
            
            return `#${getTwoCode(red)}${getTwoCode(green)}${getTwoCode(blue)}`
    }

    // Generate RGB color 
    function generateColorRGB({red, green, blue}){
        return `rgb(${red}, ${green}, ${blue})`
    }


    //copy color code
    // HEX color code
    copyColor.addEventListener('click', function(){
        navigator.clipboard.writeText(`#${input.value}`)

        //remove existing toast message
        if(toastMsg !== null){
            toastMsg.remove();
        }

        //prevent copying hex code if it is not valid
        if(isValidHex(input.value)){
            generateToastMsg(`#${input.value} copied`)
        }else{
            alert('Invalid color code');
        }
       
    })



    // step 5: active toast message
    function generateToastMsg(msg){
        toastMsg = document.createElement('p')

        // step 6: create dynamic toast message (color code)
        toastMsg.innerText = msg
        document.body.appendChild(toastMsg)
        // toastMsg.classList.add("toast-message") // anther way to add class below
        toastMsg.className = 'toast-message toast-msg-in'

        // remove the toast message when user clicks inside the toast message
        toastMsg.addEventListener('click', function(){
            toastMsg.classList.remove('toast-msg-in');
            toastMsg.classList.add('toast-msg-out');


            // step 7: clear toast message
            // remove toast message permanently when user clicked  it.
            toastMsg.addEventListener("animationend", function(){
                toastMsg.remove();
                toastMsg = null; // remove previous toast message 
            })
        });

        setTimeout(() => {
            document.body.removeChild(toastMsg)
        }, 4000)
    }

    //step 9: create isHexValid function
    function isValidHex(color){
        if(color.length !== 6 ) return false;
        return /^[0-9A-Fa-f]{6}$/i.test(color) // checking color is valid using Regx 
       
    }

    // Step 10: implement change handler on input field
    output.addEventListener('keyup', function(e){
        const color = e.target.value
        // console.log(e);
        if (color){
            output.value = color.toUpperCase()
            if(isValidHex(color)){
                root.style.backgroundColor = `#${color}`
                output2.value = hexToRgb(color)
                // console.log(e);
            }
        }
    })

    function hexToRgb(hex){
        const r = parseInt(hex.slice(0,2), 16)
        const g = parseInt(hex.slice(2,4), 16)
        const b = parseInt(hex.slice(4), 16)
        // console.log(r, g, b);
        return `rgb(${r}, ${g}, ${b})`
    }
    console.log(hexToRgb("ffffff"));