const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x000000
});
document.body.appendChild(app.view);

const particles = [];
const particleCount = 100;
const texture = PIXI.Texture.from('https://pixijs.io/examples/examples/assets/particle.png');

for (let i = 0; i < particleCount; i++) {
    const particle = new PIXI.Sprite(texture);
    particle.x = Math.random() * app.screen.width;
    particle.y = Math.random() * app.screen.height;
    particle.alpha = 0.5;
    particle.scale.set(0.5 + Math.random());
    particles.push(particle);
    app.stage.addChild(particle);
}

app.ticker.add(() => {
    particles.forEach(particle => {
        particle.x += 2;
        if (particle.x > app.screen.width) {
            particle.x = -particle.width;
            particle.y = Math.random() * app.screen.height;
        }
    });
});
