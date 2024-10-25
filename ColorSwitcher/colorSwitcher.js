const buttons =document.querySelectorAll(".button");
const body = document.querySelector("body");
buttons.forEach(function(button){
    button.addEventListener('click', function (e) {
        console.log(e);
        console.log(e.target);
        switch (e.target.id) {
            case "pink":
                body.style.backgroundColor="pink";
                break;
            case "aliceblue":
                body.style.backgroundColor= "rgb(147, 183, 214)";
                break;
            case "orange":
                body.style.backgroundColor="rgb(250, 200, 108)";
                break;
            case "violet":
                body.style.backgroundColor="rgb(201, 128, 201)";
                break;
            case "red":
                body.style.backgroundColor="rgb(239, 32, 32)";
                break;
            case "blue":
                body.style.backgroundColor="rgb(44, 44, 218)";
                break;
            case "orangered":
                body.style.backgroundColor="rgb(128, 47, 17)";
                break;
            case "purple":
                body.style.backgroundColor="rgb(106, 9, 106)";
                break;
            default:
                break;
        }
        
        
    })
})
