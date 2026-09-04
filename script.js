/* =========================================
   AUDIO DEMO PLAYER
========================================= */

const playButtons = document.querySelectorAll(".play-button");

let currentAudio = null;
let currentButton = null;

playButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const audioFile = button.dataset.audio;

        /* If this is already playing */
        if (currentAudio && currentButton === button) {

            if (!currentAudio.paused) {

                currentAudio.pause();

                button.textContent = "▶";

            } else {

                currentAudio.play();

                button.textContent = "Ⅱ";

            }

            return;
        }


        /* Stop previous audio */

        if (currentAudio) {

            currentAudio.pause();

            currentAudio.currentTime = 0;

            currentButton.textContent = "▶";

        }


        /* Create new audio */

        const audio = new Audio(audioFile);

        currentAudio = audio;

        currentButton = button;


        button.textContent = "Ⅱ";


        audio.play();


        audio.addEventListener("timeupdate", () => {

            const player = button.closest(".audio-player");

            const progress =
                player.querySelector(".audio-progress");

            const time =
                player.querySelector(".audio-time");


            if (audio.duration) {

                const percentage =
                    (audio.currentTime / audio.duration) * 100;

                progress.style.width =
                    `${percentage}%`;

            }


            const minutes =
                Math.floor(audio.currentTime / 60);

            const seconds =
                Math.floor(audio.currentTime % 60)
                    .toString()
                    .padStart(2, "0");


            time.textContent =
                `${minutes}:${seconds}`;

        });


        audio.addEventListener("ended", () => {

            button.textContent = "▶";

            currentAudio = null;

            currentButton = null;

        });

    });

});

/* =========================================
   FEATURED PROJECT CAROUSEL
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const projects = [

        {
            title: "Traveloka<br>TVC",

            category: "COMMERCIAL · VOICEOVER",

            description:
                "Vietnamese commercial narration for a Traveloka television campaign.",

            client: "Dat Phi Media",

            role: "Voice Talent",

            type: "TVC / Commercial",

            media: "video",

            source: "assets/video/traveloka.mp4"
        },

        {
            title: "Can This Love<br>Be Translated",

            category: "DUBBING · NETFLIX",

            description:
                "Vietnamese dubbing production for an international Netflix series.",

            client: "Dat Phi Media",

            role: "Co-Voice Director",

            type: "Dubbing",

            media: "none"
        },

        {
            title: "Our Sticky<br>Love",

            category: "DUBBING · NETFLIX",

            description:
                "Vietnamese dubbing production directed from casting through recording.",

            client: "Dat Phi Media",

            role: "Voice Director",

            type: "Dubbing",

            media: "none"
        },

        {
            title: "Disney —<br>Cars 3",

            category: "DUBBING · FEATURE FILM",

            description:
                "Vietnamese character performance as Jackson Storm.",

            client: "Dat Phi Media",

            role: "Voice Actor · Jackson Storm",

            type: "Dubbing",

            media: "none"
        },

        {
            title: "Hitpig",

            category: "DUBBING · ANIMATION",

            description:
                "Vietnamese character voice performance for an animated feature.",

            client: "Dat Phi Media",

            role: "Voice Actor",

            type: "Dubbing",

            media: "none"
        }

    ];


    let currentProject = 0;


    const caseTitle =
        document.getElementById("caseTitle");

    const caseCategory =
        document.getElementById("caseCategory");

    const caseDescription =
        document.getElementById("caseDescription");

    const caseClient =
        document.getElementById("caseClient");

    const caseRole =
        document.getElementById("caseRole");

    const caseType =
        document.getElementById("caseType");

    const caseCounter =
        document.getElementById("caseCounter");

    const caseMedia =
        document.getElementById("caseMedia");

    const casePrev =
        document.getElementById("casePrev");

    const caseNext =
        document.getElementById("caseNext");


    // Kiểm tra xem các element có tồn tại không
    if (
        !caseTitle ||
        !caseCategory ||
        !caseDescription ||
        !caseClient ||
        !caseRole ||
        !caseType ||
        !caseCounter ||
        !caseMedia ||
        !casePrev ||
        !caseNext
    ) {

        console.error(
            "Featured Project carousel: Missing HTML element."
        );

        return;
    }


    function renderProject() {

        const project =
            projects[currentProject];


        caseTitle.innerHTML =
            project.title;

        caseCategory.textContent =
            project.category;

        caseDescription.textContent =
            project.description;

        caseClient.textContent =
            project.client;

        caseRole.textContent =
            project.role;

        caseType.textContent =
            project.type;


        caseCounter.textContent =
            `${String(currentProject + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`;


        if (project.media === "video") {

            caseMedia.innerHTML = `
                <video
                    class="case-video"
                    controls
                    preload="metadata"
                    playsinline
                >
                    <source
                        src="${project.source}"
                        type="video/mp4"
                    >
                </video>
            `;

        } else {

            caseMedia.innerHTML = `
                <div class="project-no-media">

                    <span>
                        SELECTED WORK
                    </span>

                    <strong>
                        ${project.role}
                    </strong>

                    <p>
                        Project details available on request.
                    </p>

                </div>
            `;
        }

    }


    function nextProject() {

        currentProject =
            (currentProject + 1) % projects.length;

        renderProject();

    }


    function previousProject() {

        currentProject =
            (currentProject - 1 + projects.length)
            % projects.length;

        renderProject();

    }


    caseNext.addEventListener(
        "click",
        nextProject
    );


    casePrev.addEventListener(
        "click",
        previousProject
    );


    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "ArrowRight") {
                nextProject();
            }

            if (event.key === "ArrowLeft") {
                previousProject();
            }

        }
    );


    renderProject();

});

