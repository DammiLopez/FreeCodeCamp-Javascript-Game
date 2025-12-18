export const drawStatusText = (context, input, player) => {
    context.fillStyle = 'white';
    context.font = '20px Helvetica';
    context.fillText(`Last key: ${input.lastKey || 'None'}`, 10, 20);
    context.fillText(`State: ${player.currentState.state}`, 10, 40);
};