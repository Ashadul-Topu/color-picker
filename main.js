
// step1: generate a random color by clicking on the random color button.
// step2: show the random color in the color plate and show color code in the Hex and RGB fields. 
// step3: copy color code by clicking on the copy color code button
// step4: select color code copy mode (hex or rgb) by clicking on the radio button
// step5: take input and show color code in the hex input field
// step6:

// let toastMsg = null;
window.onload = function(){
    main()
}



function main() {
    // variable declaration
    const colorBtn = document.getElementById('color-btn');
    const showColor = document.querySelector('.color-plate');
    const copyColor = document.getElementById('copy-color');
    const inputColor = document.getElementById('input');
    const outputColor = document.getElementById('output');
    const colorRed = document.getElementById('color-slider-red');
    const colorGreen = document.getElementById('color-slider-green');
    const colorBlue = document.getElementById('color-slider-blue');


    // function invoke
    colorBtn.addEventListener('click', function(){
        // console.log('generate color btn click');
        const color = generateColorDecimal();
        const hexColor = generateColorHex(color)
        const rgbColor = generateColorRGB(color)
        showColor.style.backgroundColor = hexColor // change Background Color
        inputColor.value = hexColor.toUpperCase().substring(1)
        outputColor.value = rgbColor

         
    })
    //Generate random color
    function generateColorDecimal(){
        const red = Math.floor(Math.random() * 256)
        const green = Math.floor(Math.random() * 256)
        const blue = Math.floor(Math.random() * 256)
    
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

    // implement change handler for hex code input field
    inputColor.addEventListener('keyup', function(e){
        const color = e.target.value
        console.log(e);
        if (color){
            inputColor.value = color.toUpperCase()
            if(isValidHex(color)){
                showColor.style.backgroundColor = `#${color}`
                outputColor.value = hexToRgb(color)
            }
        }
    })
       // create isHexValid function
       function isValidHex(color){
        if(color.length !== 6 ) return false;
        return /^[0-9A-Fa-f]{6}$/i.test(color) // checking color is valid using Regx 
        
    }
    
    // create hex to rgb function
    function hexToRgb(hex){
        const red = parseInt(hex.slice(0,2), 16)
        const green = parseInt(hex.slice(2,4), 16)
        const blue = parseInt(hex.slice(4), 16)
        // console.log(r, g, b);
        return `rgb(${red}, ${green}, ${blue})`
    }


    // copy toast message

    copyColor.addEventListener('click', function(){
        navigator.clipboard.writeText(`#${inputColor.value}`)
        console.log('toastMsg');

        // //remove existing toast message
        // if(toastMsg !== null){
        //     toastMsg.remove();
        // }
        // if(isValidHex(inputColor.value)){
        //     generateToastMsg(`#${inputColor.value} copied`)
        // }else{
        //     console.log('Invalid color code');
        //     alert('Invalid color code');
        // }
    })

    // //active toast message
    // function generateToastMsg(msg){
    //     toastMsg = document.createElement('p')

    //     //create dynamic toast message (color code)
    //     toastMsg.innerText = msg
    //     document.body.appendChild(toastMsg)
    //     toastMsg.className = 'toast-message toast-msg-in'

    //     // remove the toast message when user clicks inside the toast message
    //     toastMsg.addEventListener('click', function(){
    //         toastMsg.classList.remove('toast-msg-in');
    //         toastMsg.classList.add('toast-msg-out');

    //         // remove toast message permanently when user clicked  it.
    //         toastMsg.addEventListener("animationend", function(){
    //         toastMsg.remove();
    //         toastMsg = null; // remove previous toast message 
    //         })
    //     });
    //     // clear toast message after a timeout
    //     setTimeout(() => {
    //         document.body.removeChild(toastMsg)
    //     }, 4000)
    // }
}
