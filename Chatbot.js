class DiagnosisBot {
    constructor(name) {
        this.title = name;

        this.greeting = ["hello", "hi"];
        this.greetingReply = [
            "Hello! How are you feeling today?",
            "Hi! How is your health?",
            "Hey there! Anything troubling you recently?"
        ];

        this.mild = [
            "cold", "cough", "sneeze", "runny nose", "headache", "sore throat",
            "fever", "twisted ankle", "sprain", "allergy", "mild", "not bad"
        ];
        this.doctor = [
            "rash", "dizzy", "fatigue", "blurred vision", "discomfort",
            "unusual pain", "stomach issues", "numbness", "swollen", "infection", "pain"
        ];
        this.emergency = [
            "can't breathe", "cant breathe", "severe", "heart attack", "stroke",
            "unconscious", "uncontrollable", "bleeding", "seizure",
            "poison", "dying", "overdose", "suicidal"
        ];

        this.mildResponses = [
            "It sounds like a mild condition. I suggest you to rest at home!",
            "If you aren't feeling great, consider checking your local pharmacy. Otherwise, make sure to drink water and take it easy.",
            "You should be okay with some rest and over-the-counter medication. If it gets worse, consider seeing a doctor.",
            "Sounds like a minor issue. Stay hydrated and get lots of rest.",
            "It doesn't seem serious. Try some home remedies or talk to a pharmacist for advice.",
            "No need to panic — a little rest might be all you need.",
            "Take it easy and give your body time to recover. If symptoms persist, consult a professional."
        ];

        this.seeDoctorResponses = [
            "I suggest you talk to a professional to get a diagnosis.",
            "Your symptoms may need a doctor's attention. Please consider booking an appointment.",
            "I think you should go see a doctor!",
            "Hmm... I'm not sure how serious it is, but it's worth having a doctor take a look.",
            "This may or may not become problematic. Consider getting it checked out by a professional!",
            "I recommend speaking with a doctor, just to be safe.",
            "That sounds like something a healthcare provider should assess directly."
        ];

        this.emergencyResponses = [
            "Your symptoms sound serious. Please call 911 or go to the ER NOW!!",
            "This could be life-threatening. Don't wait — get emergency help NOW!",
            "You should seek medical attention immediately. Call 911 or visit the nearest hospital.",
            "This is VERY BAD. Please get help right away.",
            "Go to the emergency room or contact emergency services IMMEDIATELY.",
            "You could be in a dangerous situation — don't hesitate to get immediate medical help.",
            "Please treat this as an emergency. You may die."
        ];

        this.expressions = [
            "Oh.", "Hmm... I think this is outside of my range of knowledge", "sorry I don't quite understand",
            "ehe", "I'm confused. I suggest you go talk to a professional.", "hmm, want to tell me more?",
            "Sorry, I'm not sure how to help :( Do you want to tell me more?"
        ];

        this.resetFlags();
    }

    name() {
        return this.title;
    }

    resetFlags() {
        this.isMild = false;
        this.isDoctor = false;
        this.isEmergency = false;
        this.replyGreeting = false;
    }

    giveTo(input) {
        const lower = input.toLowerCase();
        this.resetFlags();

        for (const phrase of this.greeting) {
            if (lower.startsWith(phrase)) {
                this.replyGreeting = true;
                break;
            }
        }

        for (const phrase of this.mild) {
            if (lower.includes(phrase)) {
                this.isMild = true;
            }
        }

        for (const phrase of this.doctor) {
            if (lower.includes(phrase)) {
                this.isDoctor = true;
            }
        }

        for (const phrase of this.emergency) {
            if (lower.includes(phrase)) {
                this.isEmergency = true;
            }
        }

        console.log(this.isEmergency, lower)
    }

    getFrom() {
        const rand = arr => arr[Math.floor(Math.random() * arr.length)];

        if (this.replyGreeting) {
            return rand(this.greetingReply);
        }

        if (this.isEmergency) {
            return rand(this.emergencyResponses);
        }

        if (this.isDoctor) {
            return rand(this.seeDoctorResponses);
        }

        if (this.isMild) {
            return rand(this.mildResponses);
        }

        return rand(this.expressions);
    }
}

let chatHistory = []

function RedoChat(chatHistory){
    const textarea = document.getElementById("res")
    textarea.value = ""
    chatHistory.forEach((c, i) => {
        if(i % 2 == 0){
            textarea.value += `You: ${c}\n\n`
        } else {
            textarea.value += `Dr. Bobby: ${c}\n\n`
        }
    })

    textarea.scrollTop = textarea.scrollHeight
}

const bot = new DiagnosisBot("New Bot")

document.getElementById("form").addEventListener("submit", e => {
    e.preventDefault()

    const inputElement = document.getElementById("inp")

    const question = inputElement.value
    inputElement.value = ""

    bot.giveTo(question)
    chatHistory.push(question)
    chatHistory.push(bot.getFrom())

    RedoChat(chatHistory)
})
