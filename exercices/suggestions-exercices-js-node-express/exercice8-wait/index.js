function say(something) {
    console.log(something);
}

function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

wait(5 * 1000).then(() => {
    say("5 seconds passed");
});
