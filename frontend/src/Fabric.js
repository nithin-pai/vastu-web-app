// 1. Initialize the Canvas
const canvas = new fabric.Canvas('vastuWorkspace');

// 2. Listen for the "Drop" (when user stops dragging the room)
canvas.on('object:modified', function(event) {
    const movedRoom = event.target; // This is the room icon the user just dropped
    
    // Get the exact X and Y coordinates on the canvas
    const roomX = movedRoom.left;
    const roomY = movedRoom.top;
    
    // 3. Determine which of the 9 Vastu Zones it was dropped in
    const currentZone = calculateVastuZone(roomX, roomY, canvas.width, canvas.height);
    
    // 4. Create the JSON payload to check against your rules
    const payload = {
        roomType: movedRoom.name, // e.g., 'kitchen'
        zone: currentZone         // e.g., 'South-East'
    };

    // 5. Run the Vastu check and update the UI
    evaluateVastuScore(payload); 
});

// Helper function to find the zone based on canvas coordinates
function calculateVastuZone(x, y, width, height) {
    // Logic dividing the canvas into a 3x3 grid
    // For example, if X is in the right third, and Y is in the bottom third, 
    // and the plot faces East, calculate the specific zone (e.g., South-East).
    // return "South-East"; 
}

// Function to update the right-hand dashboard
function evaluateVastuScore(data) {
    if (data.roomType === 'kitchen' && data.zone === 'South-East') {
        showSuccessMessage("Perfect! Kitchen in Agni zone.");
        updateScore(+10);
        movedRoom.set('stroke', 'green'); // Highlight room in green
    } else if (data.roomType === 'kitchen' && data.zone === 'North-East') {
        showErrorMessage("Critical Flaw: Kitchen in Water zone!");
        updateScore(-25);
        movedRoom.set('stroke', 'red'); // Highlight room in red
    }
    canvas.renderAll(); // Refresh the screen
}
