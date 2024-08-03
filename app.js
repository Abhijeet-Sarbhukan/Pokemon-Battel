const url = "https://pokeapi.co/api/v2/pokemon/";

let image = document.getElementById("image");
const btn = document.getElementById("genrate");
let pokeName = document.getElementById("name");
let imageCpu = document.getElementById("image-cpu");
let pokeNameCpu = document.getElementById("name-cpu");
let fightOption = document.getElementById("fight");

let pokemonData = async () => {
    let pokemon = pokeId();
    let newurl = `${url}${pokemon}`;
    let cpunum = cpuId();
    let cpuUrl = `${url}${cpunum}`;

    await fetch(cpuUrl).then((response) => response.json()).then((data) => {
        cpu(data);
    });
    await fetch(newurl).then((response) => response.json())
        .then((data) => {
            genrate(data);
        });
    await fight(v1, v2);
};

let pokeId = () => {
    let num = Math.floor(Math.random() * 150);
    return num;
};

let cpuId = () => {
    let numcpu = Math.floor(Math.random() * 150);
    return numcpu;
};

let v1;
let v2;

let genrate = async (data) => {
    console.log(data);
    image.src = await data.sprites.other.dream_world.front_default;
    pokeName.innerText = await data.name;
    let attributes = document.getElementById("attributes");
    const speed = await data.stats[5].base_stat;
    const Attack = await data.stats[1].base_stat;
    const Deffence = await data.stats[2].base_stat;
    const types = await data.types;
    const hp = await data.stats[0].base_stat;
    await appendchild(types);
    let health = document.getElementById("health-bar-container");
    health.innerHTML = `<div class="health-bar" style="width: ${hp}%;"><span class="health-text">${hp}/100</span></div>`;
    attributes.innerHTML =
        `   <span>speed</span><span>${speed}</span>
            <span>Attack</span><span>${Attack}</span>
            <span>Deffence</span><span>${Deffence}</span>`;
    if (fightOption.value === "speed") {
        v1 = speed;
    }
    if (fightOption.value === "Attack") {
        v1 = Attack;
    }
    if (fightOption.value === "Deffence") {
        v1 = Deffence;
    }
    if (fightOption.value === "hp") {
        v1 = hp;
    }
};

let cpu = async (data) => {
    console.log(data);
    imageCpu.src = await data.sprites.other.dream_world.front_default;
    pokeNameCpu.innerText = await data.name;
    let attributescpu = document.getElementById("attributes-cpu");
    const speed = await data.stats[5].base_stat;
    const Attack = await data.stats[1].base_stat;
    const Deffence = await data.stats[2].base_stat;
    const types = await data.types;
    const hp = await data.stats[0].base_stat;
    await appendchildCpu(types);
    let health = document.getElementById("health-bar-container-cpu");
    health.innerHTML = `<div class="health-bar" style="width: ${hp}%;"><span class="health-text">${hp}/100</span></div>`;
    attributescpu.innerHTML =
        `   <span>speed</span><span>${speed}</span>
            <span>Attack</span><span>${Attack}</span>
            <span>Deffence</span><span>${Deffence}</span>`;

    if (fightOption.value === "speed") {
        v2 = speed;
    }
    if (fightOption.value === "Attack") {
        v2 = Attack;
    }
    if (fightOption.value === "Deffence") {
        v2 = Deffence;
    }
    if (fightOption.value === "hp") {
        v2 = hp;
    }
};

const appendchild = (types) => {
    document.querySelector(".type").innerHTML = "";
    types.forEach(type => {
        let span = document.createElement("SPAN");
        span.textContent = type.type.name;
        console.log("user: ", span);
        document.querySelector(".type").appendChild(span);
    });
};

const appendchildCpu = (typescpu) => {
    document.querySelector(".type-cpu").innerHTML = "";
    typescpu.forEach(type => {
        let spancpu = document.createElement("SPAN");
        spancpu.textContent = type.type.name;
        console.log(spancpu);
        document.querySelector(".type-cpu").appendChild(spancpu);
    });
};

let fight = (user, cpu) => {
    setTimeout(() => {
        if (user > cpu) {
            alert("You Won The Pokemon Battle");
        } else {
            alert("You Lost The Pokemon Battle");
        }
    }, 1000); // 2-second delay
};

btn.addEventListener("click", pokemonData);
