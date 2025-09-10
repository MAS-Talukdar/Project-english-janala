const loadLessons=()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLessons(json.data))
};

// const manageSpinner = (status)=>{
//     if (status == true){
//         document.getElementById("spinner").classList.remove("hidden");
//         document.getElementById("word-container").classList.add("hidden");
//     }
//     else{
//         document.getElementById("word-container").classList.remove("hidden");
//         document.getElementById("spinner").classList.add("hidden");
//     }
// }

const removeActive=()=>{
    const lessonBtns = document.querySelectorAll(".lesson-btn")
    lessonBtns.forEach(btn=> btn.classList.remove("active"));
}
const loadLevelWord=(id)=>{
    // manageSpinner(true);
    const url =`https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then((res)=>res.json())
    .then(data=>{
        removeActive();
        const clickBtn = document.getElementById(`lesson-btn-${id}`)
        clickBtn.classList.add("active");
        displayLevelWord(data.data)
    })
}
const loadWordDetail= async(id)=>{
    const url=`https://openapi.programming-hero.com/api/word/5`
    const res = await fetch(url)
    const details = await res.json();
    displayWordsDetails(details.data);

}
const displayWordsDetails =(word)=>{
    const detailsBox = document.getElementById("details-container")
    // detailsBox.innerHTML = "Hi ! I am JS";
    document.getElementById("my_modal_5").showModal();
}
const displayLevelWord=(words)=>{
    const wordContainer = document.getElementById("word-container")
    wordContainer.innerHTML = "";

    if(words.length == 0){
        wordContainer.innerHTML =
        `<div class="text-center col-span-full rounded-xl">
        <img class="mx-auto" src="./assets/alert-error.png"/>
        <p class="text-xl font-medium text-gray-400 py-10 space-y-10">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
        </div>`
        return;
    }
    words.forEach(word=>{
        console.log(word)
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
        <h2 class="font-bold text-2xl">${word.word ? word.word: "শব্দ পাওয়া যায়নি"}</h2>
        <p class="font-semibold">Meaning / Pronunciation</p>
        <div class="font-semibold text-2xl bangla">${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"}</div>
        <div class="flex justify-between items-center">
          <button onclick = "loadWordDetail(${word.id})" class="btn bg-[#1a90ff20] hover:bg-[#1a90ff80]"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn bg-[#1a90ff20] hover:bg-[#1a90ff80]"><i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>
        `
        wordContainer.append(card);
    });
}
const displayLessons=(lessons)=>{
    // 1. get the container & empty
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = "";
    // 2. get into every lessons
    for(let lesson of lessons){
    //     3. create elements
        const btnDiv = document.createElement("div")
        btnDiv.innerHTML=
        `<button id="lesson-btn-${lesson.level_no}" onclick= "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
            <i class="fa-sharp fa-solid fa-book-open"></i>Lesson -${lesson.level_no}</button>`;
    //     4. append into container
    levelContainer.append(btnDiv)
    }
    // manageSpinner(false);
}
loadLessons()