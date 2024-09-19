const url = "https://food-pos-data.vercel.app";


const middleFoodOptions = document.querySelector(".middle-food-options");
const middleCards = document.querySelector(".middle-cards");

const renderOptionsData = async (data) => {
    middleFoodOptions.innerHTML = data.map((item) => `
        <a data-path="${item.path}" class="middle-food-options-link transition-all duration-200 font-[B600] text-[14px] leading-[140%] pb-[13px] border-b-[3px] text-white hover:text-[#EA7C69]
         border-transparent hover:border-[#EA7C69]" href="#">${item.name}</a>
    `
    ).join("");
}




const renderContentData = async (data) => {
    middleCards.innerHTML = data.map((item) => `
     <div class="middle-card relative w-[192px] pt-[114px] pb-[24px] px-[40px] bg-[#1F1D2B] rounded-[16px] text-center">
        <img class="absolute top-[-34px] left-[36px] w-[120px] h-[120px] rounded-[50%] object-cover" src="${item.img}" alt="">
        <p class="middle-card-title text-[14px] text-white font-[B500] leading-[130%] mb-[8px]">Spicy seasoned seafood noodles</p>
        <p class="text-white font-[B400] text-[14px] leading-[140%] mb-[4px]">$ 2.29</p>
        <p class="text-[#ABBBC2] font-[B400] text-[14px] leading-[140%]">20 Bowls available</p>
    </div>
    `
    ).join("");
}



const getContentData = async (path) => {
    try {
        const request = await fetch(`${url}/${path}`);
        const data = await request.json();
        renderContentData(data);
    } catch (error) {
        console.log(error);
    }
}


const getOptionsData = async () => {
    try {
        const request = await fetch(`${url}/catalog`);
        const data = await request.json();
        renderOptionsData(data);
        getContentData(data[0].path);
        return data;
    } catch (error) {
        console.log(error);
    }
}

getOptionsData();



middleFoodOptions.addEventListener("click", (e) => {
    const optionPath = e.target.dataset.path;
    if (optionPath) {
        getContentData(optionPath);
        const middleFoodOptionsLink = document.getElementsByClassName("middle-food-options-link");
        for (let i of middleFoodOptionsLink) {
            i.style.color = "";
            i.style.borderColor = "";
        }
        e.target.style.color = "#EA7C69";
        e.target.style.borderColor = "#EA7C69";
    }
});

const defaultFunction = async () => {
    const data = await getOptionsData();
    middleFoodOptions.addEventListener("click", (e) => {
        const middleFoodOptionsLink = document.getElementsByClassName("middle-food-options-link");
        for (let i of middleFoodOptionsLink) {
            if (e.target.dataset.path === undefined) {
                i.style.color = "";
                i.style.borderColor = "";
            }
        }
        if (e.target.dataset.path === undefined) {
            getContentData(data[0].path);
        }
    });
}
defaultFunction();