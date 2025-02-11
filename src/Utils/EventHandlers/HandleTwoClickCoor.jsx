

export const handleTwoClickCoor = () => {
        // Add event listener for 'mousemove' to track mouse movements
        document.addEventListener("mousemove", (event) => {
            // Get mouse coordinates relative to the viewport
            const mouseX = event.clientX;
            const mouseY = event.clientY;
    
            // Output the coordinates to the console
            console.log(`Mouse position: X: ${mouseX}, Y: ${mouseY}`);
        });
    
};
